const GITHUB_ORG = 'irandawn';
const DATABASE_REPO = 'database';
const DEFAULT_BRANCH = 'main';
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_ORG}`;
const BROWSE_BASE = `https://github.com/${GITHUB_ORG}`;
const INDEX_PATH = 'INDEX.json';
const MAX_ITEMS = 50;

const state = {
  index: null,
  cache: new Map(),
  dataCache: new Map(),
  contentItems: [],
  databaseLoaded: false,
  databaseListeners: false,
  eventsLoaded: false,
  statsLoaded: false,
  homeLoaded: false
};

function byId(id) {
  return document.getElementById(id);
}

function escapeHtml(value) {
  if (!value) {
    return '';
  }
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDate(value) {
  if (!value || value === 0) {
    return '';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return date.toLocaleDateString();
}

function formatStatus(value) {
  const status = String(value ?? '');
  if (status === '1') {
    return 'Active';
  }
  if (status === '0') {
    return 'Reserved';
  }
  return status ? `Status ${status}` : 'Unknown';
}

function createOption(value, label) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = label;
  return option;
}

function updateSubmitLinks() {
  const submitUrl = `${BROWSE_BASE}/${DATABASE_REPO}/issues/new/choose`;
  document
    .querySelectorAll('a[href*="/submit/issues/new/choose"]')
    .forEach(link => {
      link.setAttribute('href', submitUrl);
    });
}

function getRawUrl(repo, path) {
  return `${RAW_BASE}/${repo}/${DEFAULT_BRANCH}/${path}`;
}

async function fetchJson(repo, path) {
  const url = getRawUrl(repo, path);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return null;
  }
}

async function fetchJsonCached(repo, path) {
  const key = `${repo}:${path}`;
  if (state.cache.has(key)) {
    return state.cache.get(key);
  }
  const data = await fetchJson(repo, path);
  if (data) {
    state.cache.set(key, data);
  }
  return data;
}

async function ensureIndex() {
  if (state.index) {
    return state.index;
  }
  const index = await fetchJson(DATABASE_REPO, INDEX_PATH);
  state.index = index;
  return index;
}

function getIndexOutput(name, fallback) {
  if (!state.index || !Array.isArray(state.index.indexes)) {
    return fallback || '';
  }
  const def = state.index.indexes.find(item => item.name === name);
  return def ? def.output : fallback || '';
}

async function fetchIndexFile(name, fallback) {
  const output = getIndexOutput(name, fallback);
  if (!output) {
    return null;
  }
  return fetchJsonCached(DATABASE_REPO, output);
}

function getSchemaForId(id) {
  if (!state.index || !Array.isArray(state.index.id_schemas)) {
    return null;
  }
  return state.index.id_schemas.find(schema => schema.length === id.length) || null;
}

function idToPath(id, schema) {
  if (!schema) {
    return '';
  }
  const size = Number(schema.layer_size) || 2;
  const parts = [];
  for (let i = 0; i < id.length; i += size) {
    parts.push(id.slice(i, i + size));
  }
  return `${schema.data_root}/${parts.join('/')}/${id}.json`;
}

async function fetchDataRecord(id) {
  if (state.dataCache.has(id)) {
    return state.dataCache.get(id);
  }
  const schema = getSchemaForId(id);
  const path = idToPath(id, schema);
  if (!path) {
    return null;
  }
  const record = await fetchJsonCached(DATABASE_REPO, path);
  if (record) {
    state.dataCache.set(id, record);
  }
  return record;
}

function buildStatusMap(byStatus) {
  const map = new Map();
  if (!byStatus || !byStatus.items) {
    return map;
  }
  for (const [status, ids] of Object.entries(byStatus.items)) {
    for (const id of ids) {
      map.set(id, status);
    }
  }
  return map;
}

function buildContentItems(byType, statusMap) {
  const items = [];
  const seen = new Set();
  if (!byType || !byType.items) {
    return items;
  }
  for (const [type, ids] of Object.entries(byType.items)) {
    for (const id of ids) {
      if (seen.has(id)) {
        continue;
      }
      seen.add(id);
      items.push({
        id,
        type,
        status: statusMap.get(id) || ''
      });
    }
  }
  return items;
}

function getDescriptionFromRecord(record) {
  if (!record || !record.payload) {
    return '';
  }
  const fields = record.payload.fields || {};
  if (fields.description) {
    return fields.description;
  }
  if (fields.summary) {
    return fields.summary;
  }
  if (fields.title) {
    return fields.title;
  }
  if (fields.event) {
    return fields.event;
  }
  if (record.payload.job && record.payload.job.output) {
    return record.payload.job.output;
  }
  return '';
}

function buildSearchText(item, record) {
  const parts = [item.id, item.type, item.status];
  if (record) {
    const payload = record.payload || {};
    const fields = payload.fields || {};
    Object.values(fields).forEach(value => {
      if (typeof value === 'string') {
        parts.push(value);
      }
    });
    if (payload.job && typeof payload.job.output === 'string') {
      parts.push(payload.job.output);
    }
  }
  return parts.join(' ').toLowerCase();
}

async function enrichItem(item) {
  const record = await fetchDataRecord(item.id);
  if (record) {
    item.status = String(record.status ?? item.status);
    item.searchText = buildSearchText(item, record);
  } else {
    item.searchText = buildSearchText(item, null);
  }
  return { item, record };
}

function buildRecordLinks(record, id) {
  const schema = getSchemaForId(id);
  const path = idToPath(id, schema);
  const links = [];

  if (record && record.payload && record.payload.meta && record.payload.meta.issue_url) {
    links.push({
      label: 'Issue',
      url: record.payload.meta.issue_url
    });
  }

  if (path) {
    links.push({
      label: 'Record',
      url: `${BROWSE_BASE}/${DATABASE_REPO}/blob/${DEFAULT_BRANCH}/${path}`
    });
  }

  return links;
}

async function renderContentList(items) {
  const container = byId('content-list');
  if (!container) {
    return;
  }
  if (!items.length) {
    container.innerHTML = '<p>No content found.</p>';
    return;
  }

  const slice = items.slice(0, MAX_ITEMS);
  const enriched = await Promise.all(slice.map(enrichItem));
  const rows = enriched.map(({ item, record }) => {
    const description = escapeHtml(getDescriptionFromRecord(record) || 'No summary available.');
    const created = record ? formatDate(record.created_at) : '';
    const modified = record ? formatDate(record.modified_at) : '';
    const status = formatStatus(item.status);
    const links = buildRecordLinks(record, item.id);
    const linksHtml = links
      .map(link => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`)
      .join(' | ');

    const metaParts = [];
    if (status) {
      metaParts.push(`Status: ${status}`);
    }
    if (modified) {
      metaParts.push(`Updated: ${modified}`);
    } else if (created) {
      metaParts.push(`Created: ${created}`);
    }
    if (linksHtml) {
      metaParts.push(linksHtml);
    }

    return `
      <div class="content-item">
        <div class="content-header">
          <span class="content-id">${escapeHtml(item.id)}</span>
          <span class="content-type">${escapeHtml(item.type)}</span>
        </div>
        <div class="content-description">${description}</div>
        <div class="content-meta">${metaParts.join(' | ')}</div>
      </div>
    `;
  });

  let footer = '';
  if (items.length > MAX_ITEMS) {
    footer = `<p class="loading">Showing ${MAX_ITEMS} of ${items.length} items.</p>`;
  }

  container.innerHTML = rows.join('') + footer;
}

function populateTypeFilter(types) {
  const select = byId('type-filter');
  if (!select) {
    return;
  }
  select.innerHTML = '';
  select.appendChild(createOption('', 'All Types'));
  (types || []).forEach(type => {
    select.appendChild(createOption(type, type));
  });
}

function populateStatusFilter(statuses) {
  const select = byId('event-filter');
  if (!select) {
    return;
  }
  select.innerHTML = '';
  select.appendChild(createOption('', 'All Statuses'));
  (statuses || []).forEach(status => {
    select.appendChild(createOption(status, formatStatus(status)));
  });
}

function filterContent() {
  const searchInput = byId('search-input');
  const typeFilter = byId('type-filter');
  const statusFilter = byId('event-filter');

  if (!searchInput || !typeFilter || !statusFilter) {
    return;
  }

  const search = searchInput.value.trim().toLowerCase();
  const typeValue = typeFilter.value;
  const statusValue = statusFilter.value;

  let filtered = state.contentItems;

  if (typeValue) {
    filtered = filtered.filter(item => item.type === typeValue);
  }
  if (statusValue) {
    filtered = filtered.filter(item => String(item.status) === statusValue);
  }
  if (search) {
    filtered = filtered.filter(item => {
      const text = item.searchText || `${item.id} ${item.type} ${item.status}`.toLowerCase();
      return text.includes(search);
    });
  }

  void renderContentList(filtered);
}

async function loadHomeStats() {
  if (state.homeLoaded) {
    return;
  }
  const index = await ensureIndex();
  if (!index) {
    return;
  }

  const byStatusCounts = index.counts && index.counts.by_status ? index.counts.by_status : {};
  const byTypeCounts = index.counts && index.counts.by_type ? index.counts.by_type : {};

  const totalItems = Number(byStatusCounts['1']) || 0;
  const totalSubmissions = Object.values(byStatusCounts).reduce((sum, value) => {
    return sum + Number(value || 0);
  }, 0);
  const totalEvents = Number(byTypeCounts.event) || 0;

  if (byId('total-items')) {
    byId('total-items').textContent = String(totalItems);
  }
  if (byId('total-events')) {
    byId('total-events').textContent = String(totalEvents);
  }
  if (byId('total-submissions')) {
    byId('total-submissions').textContent = String(totalSubmissions);
  }

  state.homeLoaded = true;
}

async function loadDatabase() {
  if (state.databaseLoaded) {
    filterContent();
    return;
  }

  const container = byId('content-list');
  if (container) {
    container.innerHTML = '<p class="loading">Loading database...</p>';
  }

  const index = await ensureIndex();
  const byType = await fetchIndexFile('by-type', 'index/by-type.json');
  const byStatus = await fetchIndexFile('by-status', 'index/by-status.json');

  if (!index || !byType) {
    if (container) {
      container.innerHTML = '<p>Failed to load database.</p>';
    }
    return;
  }

  const types = Array.isArray(index.available_types)
    ? index.available_types
    : Object.keys(byType.items || {});
  populateTypeFilter(types);

  const statusKeys = byStatus && byStatus.items ? Object.keys(byStatus.items) : [];
  populateStatusFilter(statusKeys);

  const statusMap = buildStatusMap(byStatus);
  state.contentItems = buildContentItems(byType, statusMap);
  state.databaseLoaded = true;

  if (!state.databaseListeners) {
    const searchInput = byId('search-input');
    const typeFilter = byId('type-filter');
    const statusFilter = byId('event-filter');

    if (searchInput) {
      searchInput.addEventListener('input', filterContent);
    }
    if (typeFilter) {
      typeFilter.addEventListener('change', filterContent);
    }
    if (statusFilter) {
      statusFilter.addEventListener('change', filterContent);
    }
    state.databaseListeners = true;
  }

  filterContent();
}

async function loadEvents() {
  if (state.eventsLoaded) {
    return;
  }

  const container = byId('events-list');
  if (container) {
    container.innerHTML = '<p class="loading">Loading events...</p>';
  }

  const byType = await fetchIndexFile('by-type', 'index/by-type.json');
  const byStatus = await fetchIndexFile('by-status', 'index/by-status.json');
  const eventIds = byType && byType.items ? byType.items.event || [] : [];

  if (!eventIds.length) {
    if (container) {
      container.innerHTML = '<p>No events have been published yet.</p>';
    }
    state.eventsLoaded = true;
    return;
  }

  const statusMap = buildStatusMap(byStatus);
  const items = eventIds.map(id => ({
    id,
    type: 'event',
    status: statusMap.get(id) || ''
  }));

  const enriched = await Promise.all(items.slice(0, MAX_ITEMS).map(enrichItem));
  const rows = enriched.map(({ item, record }) => {
    const fields = record && record.payload ? record.payload.fields || {} : {};
    const title = escapeHtml(fields.event || fields.title || `Event ${item.id}`);
    const date = escapeHtml(fields.date || fields.event_date || fields.when || '');
    const description = escapeHtml(getDescriptionFromRecord(record) || 'No description available.');

    return `
      <div class="event-item">
        <div class="event-title">${title}</div>
        ${date ? `<div class="event-date">${date}</div>` : ''}
        <div class="event-description">${description}</div>
      </div>
    `;
  });

  if (container) {
    container.innerHTML = rows.join('');
  }
  state.eventsLoaded = true;
}

function renderStatsTable(containerId, rows) {
  const container = byId(containerId);
  if (!container) {
    return;
  }
  if (!rows.length) {
    container.innerHTML = '<p class="loading">No data available.</p>';
    return;
  }
  container.innerHTML = rows
    .map(row => `<div class="stats-row"><span>${row.label}</span><span>${row.value}</span></div>`)
    .join('');
}

async function loadStats() {
  if (state.statsLoaded) {
    return;
  }

  const byType = await fetchIndexFile('by-type', 'index/by-type.json');
  const logsRecent = await fetchIndexFile('logs-latest-100', 'logs-latest-100.json');
  const logsWide = await fetchIndexFile('logs-latest-1000', 'logs-latest-1000.json');

  if (byType && byType.items) {
    const rows = Object.entries(byType.items)
      .map(([type, ids]) => ({ label: type, value: ids.length }))
      .sort((a, b) => b.value - a.value);
    renderStatsTable('content-stats', rows);
  } else {
    renderStatsTable('content-stats', []);
  }

  if (Array.isArray(logsWide)) {
    const counts = {};
    logsWide.forEach(entry => {
      const key = entry.event || 'unknown';
      counts[key] = (counts[key] || 0) + 1;
    });
    const rows = Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
    renderStatsTable('submission-stats', rows);
  } else {
    renderStatsTable('submission-stats', []);
  }

  if (Array.isArray(logsRecent)) {
    const container = byId('recent-activity');
    if (container) {
      const rows = logsRecent.slice(0, 20).map(entry => {
        const pieces = [];
        if (entry.event) {
          pieces.push(entry.event);
        }
        if (entry.content_id) {
          pieces.push(`ID ${entry.content_id}`);
        }
        if (entry.source_issue) {
          pieces.push(`Issue #${entry.source_issue}`);
        }
        if (entry.pr_number) {
          pieces.push(`PR #${entry.pr_number}`);
        }
        const message = escapeHtml(pieces.join(' | ') || 'Activity');
        const time = entry.timestamp ? escapeHtml(formatDate(entry.timestamp)) : '';
        return `
          <div class="activity-item">
            <div>${message}</div>
            ${time ? `<div class="activity-time">${time}</div>` : ''}
          </div>
        `;
      });
      container.innerHTML = rows.join('');
    }
  } else if (byId('recent-activity')) {
    byId('recent-activity').innerHTML = '<p class="loading">No recent activity.</p>';
  }

  state.statsLoaded = true;
}

function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  void handleRouteAsync();
}

async function handleRouteAsync() {
  const hash = window.location.hash.slice(1) || 'home';

  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  const activeSection = byId(hash);
  if (activeSection) {
    activeSection.classList.add('active');
    const activeNavLink = document.querySelector(`.nav-links a[data-nav="${hash}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }
  }

  if (hash === 'database') {
    await loadDatabase();
  }
  if (hash === 'events') {
    await loadEvents();
  }
  if (hash === 'stats') {
    await loadStats();
  }
  if (hash === 'home') {
    await loadHomeStats();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateSubmitLinks();
  initRouter();
});
