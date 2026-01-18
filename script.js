// Configuration
const GITHUB_ORG = 'irandawn';
const GITHUB_RAW = `https://raw.githubusercontent.com/${GITHUB_ORG}`;

// State
let manifest = null;
let events = null;
let logs = null;

// Router
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  
  // Hide all sections
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show active section
  const activeSection = document.getElementById(hash);
  if (activeSection) {
    activeSection.classList.add('active');
    
    // Load data for section
    if (hash === 'database' && !manifest) loadDatabase();
    if (hash === 'events' && !events) loadEvents();
    if (hash === 'stats') loadStats();
    if (hash === 'home') loadHomeStats();
  }
}

// API: Fetch from GitHub
async function fetchGitHub(repo, path) {
  const url = `${GITHUB_RAW}/${repo}/main/${path}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    return null;
  }
}

// Load home stats
async function loadHomeStats() {
  const data = await fetchGitHub('database', 'content/manifest.json');
  if (data) {
    document.getElementById('total-items').textContent = data.total_items || 0;
    document.getElementById('total-events').textContent = Object.keys(data.by_event || {}).length;
  }
  
  // Load submission count from log
  const logData = await fetchGitHub('log', `submissions/${getCurrentMonth()}.jsonl`);
  if (logData) {
    const lines = logData.split('\n').filter(line => line.trim());
    document.getElementById('total-submissions').textContent = lines.length;
  }
}

// Load database
async function loadDatabase() {
  const data = await fetchGitHub('database', 'content/manifest.json');
  if (!data) {
    document.getElementById('content-list').innerHTML = '<p>Failed to load database.</p>';
    return;
  }
  
  manifest = data;
  
  // Populate event filter
  const eventFilter = document.getElementById('event-filter');
  Object.keys(data.by_event || {}).forEach(event => {
    const option = document.createElement('option');
    option.value = event;
    option.textContent = event;
    eventFilter.appendChild(option);
  });
  
  renderContentList(data.items || []);
  
  // Add search/filter listeners
  document.getElementById('search-input').addEventListener('input', filterContent);
  document.getElementById('type-filter').addEventListener('change', filterContent);
  document.getElementById('event-filter').addEventListener('change', filterContent);
}

function renderContentList(items) {
  const container = document.getElementById('content-list');
  
  if (items.length === 0) {
    container.innerHTML = '<p>No content found.</p>';
    return;
  }
  
  container.innerHTML = items.slice(0, 50).map(item => `
    <div class="content-item">
      <div class="content-header">
        <span class="content-id">${item.id}</span>
        <span class="content-type">${item.type}</span>
      </div>
      <div class="content-description">${item.title || 'No description'}</div>
      <div class="content-meta">
        ${item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown date'}
      </div>
    </div>
  `).join('');
}

function filterContent() {
  if (!manifest) return;
  
  const search = document.getElementById('search-input').value.toLowerCase();
  const typeFilter = document.getElementById('type-filter').value;
  const eventFilter = document.getElementById('event-filter').value;
  
  let filtered = manifest.items || [];
  
  if (typeFilter) {
    filtered = filtered.filter(item => item.type === typeFilter);
  }
  
  if (eventFilter) {
    filtered = filtered.filter(item => item.event === eventFilter);
  }
  
  if (search) {
    filtered = filtered.filter(item => 
      (item.title || '').toLowerCase().includes(search) ||
      (item.id || '').toLowerCase().includes(search)
    );
  }
  
  renderContentList(filtered);
}

// Load events
async function loadEvents() {
  const data = await fetchGitHub('database', 'metadata/events.json');
  if (!data) {
    document.getElementById('events-list').innerHTML = '<p>Failed to load events.</p>';
    return;
  }
  
  events = data;
  
  const container = document.getElementById('events-list');
  container.innerHTML = Object.entries(data).map(([id, event]) => `
    <div class="event-item">
      <div class="event-title">${event.name || id}</div>
      <div class="event-date">
        ${event.start_date || 'Unknown'} ${event.end_date ? `— ${event.end_date}` : '(ongoing)'}
      </div>
      <div class="event-description">${event.description || 'No description available.'}</div>
    </div>
  `).join('');
}

// Load stats
async function loadStats() {
  const manifestData = await fetchGitHub('database', 'content/manifest.json');
  
  if (manifestData) {
    const contentStats = document.getElementById('content-stats');
    contentStats.innerHTML = Object.entries(manifestData.by_type || {}).map(([type, data]) => `
      <div class="stats-row">
        <span>${type}</span>
        <span>${data.count || 0}</span>
      </div>
    `).join('');
  }
  
  // Load recent activity from log
  const logData = await fetchGitHub('log', `submissions/${getCurrentMonth()}.jsonl`);
  if (logData) {
    const lines = logData.split('\n').filter(line => line.trim()).slice(-20).reverse();
    const activity = document.getElementById('recent-activity');
    
    activity.innerHTML = lines.map(line => {
      try {
        const event = JSON.parse(line);
        return `
          <div class="activity-item">
            <div>${event.event.replace(/_/g, ' ')}</div>
            <div class="activity-time">${new Date(event.timestamp).toLocaleString()}</div>
          </div>
        `;
      } catch {
        return '';
      }
    }).join('');
    
    const submissionStats = document.getElementById('submission-stats');
    const eventCounts = {};
    lines.forEach(line => {
      try {
        const event = JSON.parse(line);
        eventCounts[event.event] = (eventCounts[event.event] || 0) + 1;
      } catch {}
    });
    
    submissionStats.innerHTML = Object.entries(eventCounts).map(([event, count]) => `
      <div class="stats-row">
        <span>${event.replace(/_/g, ' ')}</span>
        <span>${count}</span>
      </div>
    `).join('');
  }
}

// Utilities
function getCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', initRouter);
