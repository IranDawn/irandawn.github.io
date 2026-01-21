(function(global) {
  'use strict';

  /*
   * IranDawn JS SDK
   *
   * Goals:
   * - Treat the index file (INDEX.json or any compatible file) as the contract.
   * - Avoid hardcoded paths and types; derive everything from the index.
   * - Provide small, composable helpers that any client can use.
   *
   * Usage:
   *   const client = IranDawn.createClient({ org, repo, branch, indexPath });
   *   await client.getIndex();
   *   const byType = await client.fetchIndex('by-type');
   *   const view = client.buildView({ kind: 'index', group_by: 'type' });
   *   const records = await view.listRecords('event', { limit: 20 });
   */

  const DEFAULTS = {
    org: 'irandawn',
    repo: 'database',
    branch: 'main',
    indexPath: 'INDEX.json'
  };

  function createClient(options = {}) {
    const config = { ...DEFAULTS, ...options };
    const rawBase = `https://raw.githubusercontent.com/${config.org}`;
    const browseBase = `https://github.com/${config.org}`;
    const state = {
      cache: new Map(),
      index: null
    };

    function getRawUrl(path, repo = config.repo) {
      return `${rawBase}/${repo}/${config.branch}/${path}`;
    }

    function getBrowseUrl(path, repo = config.repo) {
      return `${browseBase}/${repo}/blob/${config.branch}/${path}`;
    }

    function getRepoUrl(repo = config.repo) {
      return `${browseBase}/${repo}`;
    }

    function getOrgUrl() {
      return browseBase;
    }

    function getSubmitUrl() {
      return `${browseBase}/${config.repo}/issues/new/choose`;
    }

    async function fetchJson(path, repo = config.repo) {
      const url = getRawUrl(path, repo);
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

    async function fetchJsonCached(path, repo = config.repo) {
      const key = `${repo}:${path}`;
      if (state.cache.has(key)) {
        return state.cache.get(key);
      }
      const data = await fetchJson(path, repo);
      if (data) {
        state.cache.set(key, data);
      }
      return data;
    }

    async function getIndex(force = false) {
      if (state.index && !force) {
        return state.index;
      }
      state.index = await fetchJsonCached(config.indexPath, config.repo);
      return state.index;
    }

    async function refreshIndex() {
      return getIndex(true);
    }

    function setIndex(next) {
      state.index = next;
      return state.index;
    }

    function listIndexDefs() {
      if (!state.index || !Array.isArray(state.index.indexes)) {
        return [];
      }
      return state.index.indexes;
    }

    function matchesIndexCriteria(def, criteria) {
      const keys = ['name', 'kind', 'group_by', 'output', 'source'];
      for (const key of keys) {
        if (criteria[key] === undefined) {
          continue;
        }
        if (def[key] !== criteria[key]) {
          return false;
        }
      }
      return true;
    }

    function findIndex(criteria) {
      const defs = listIndexDefs();
      if (!criteria) {
        return null;
      }
      if (typeof criteria === 'string') {
        return defs.find(def => def.name === criteria) || null;
      }
      if (typeof criteria === 'object') {
        return defs.find(def => matchesIndexCriteria(def, criteria)) || null;
      }
      return null;
    }

    function resolveIndexDef(defOrName) {
      if (!defOrName) {
        return null;
      }
      if (typeof defOrName === 'string') {
        return findIndex(defOrName);
      }
      if (typeof defOrName === 'object') {
        if (defOrName.name) {
          const named = findIndex(defOrName.name);
          if (named) {
            return named;
          }
        }
        if (defOrName.output) {
          return defOrName;
        }
        const match = findIndex(defOrName);
        return match || defOrName;
      }
      return null;
    }

    function getIndexOutput(defOrName, fallback = '') {
      const def = resolveIndexDef(defOrName);
      if (!def) {
        return fallback;
      }
      return def.output || fallback;
    }

    async function fetchIndex(defOrName, fallback = '') {
      const output = getIndexOutput(defOrName, fallback);
      if (!output) {
        return null;
      }
      return fetchJsonCached(output, config.repo);
    }

    function hasIndex(name) {
      if (!state.index || !Array.isArray(state.index.indexes)) {
        return false;
      }
      return state.index.indexes.some(def => def.name === name);
    }

    function hasType(type) {
      if (!state.index || !Array.isArray(state.index.available_types)) {
        return false;
      }
      return state.index.available_types.includes(type);
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

    function getRecordPath(id) {
      const schema = getSchemaForId(id);
      return idToPath(id, schema);
    }

    function getRecordUrl(id) {
      const path = getRecordPath(id);
      if (!path) {
        return '';
      }
      return getBrowseUrl(path, config.repo);
    }

    async function fetchRecord(id) {
      if (!state.index) {
        await getIndex();
      }
      const path = getRecordPath(id);
      if (!path) {
        return null;
      }
      return fetchJsonCached(path, config.repo);
    }

    async function fetchRecords(ids, options = {}) {
      const limit = Math.max(0, options.limit || ids.length || 0);
      const concurrency = Math.max(1, options.concurrency || 6);
      const list = (ids || []).slice(0, limit);
      const results = new Array(list.length);
      let cursor = 0;

      async function worker() {
        while (cursor < list.length) {
          const index = cursor;
          cursor += 1;
          const id = list[index];
          results[index] = await fetchRecord(id);
        }
      }

      const workers = [];
      const count = Math.min(concurrency, list.length);
      for (let i = 0; i < count; i += 1) {
        workers.push(worker());
      }
      await Promise.all(workers);

      return results.filter(Boolean);
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

    /*
     * Dynamic views
     *
     * A view wraps an index definition and exposes helpers for grouped indexes
     * and log feeds without naming assumptions. Views are generated from
     * index definitions so clients can adapt to any compatible index file.
     */
    function buildView(defOrCriteria) {
      async function resolveDef() {
        if (!state.index) {
          await getIndex();
        }
        return resolveIndexDef(defOrCriteria);
      }

      return {
        async getDef() {
          return resolveDef();
        },
        async fetch() {
          const def = await resolveDef();
          return fetchIndex(def);
        },
        async listGroups() {
          const data = await this.fetch();
          if (!data || !data.items || typeof data.items !== 'object') {
            return [];
          }
          return Object.keys(data.items);
        },
        async listIds(groupKey) {
          const data = await this.fetch();
          if (!data) {
            return [];
          }
          if (data.items && typeof data.items === 'object') {
            if (groupKey === undefined || groupKey === null) {
              return Object.values(data.items).flat().filter(Boolean);
            }
            const key = String(groupKey);
            return Array.isArray(data.items[key]) ? data.items[key] : [];
          }
          if (Array.isArray(data)) {
            return data.map(entry => entry && entry.content_id).filter(Boolean);
          }
          return [];
        },
        async listEntries(options = {}) {
          const data = await this.fetch();
          if (!Array.isArray(data)) {
            return [];
          }
          const limit = Math.max(0, options.limit || data.length || 0);
          return data.slice(0, limit);
        },
        async listRecords(groupKey, options = {}) {
          const ids = await this.listIds(groupKey);
          return fetchRecords(ids, options);
        }
      };
    }

    function listViews() {
      return listIndexDefs().map(def => buildView(def));
    }

    return {
      config: { ...config },
      getRawUrl,
      getBrowseUrl,
      getRepoUrl,
      getOrgUrl,
      getSubmitUrl,
      fetchJson,
      fetchJsonCached,
      getIndex,
      refreshIndex,
      setIndex,
      listIndexDefs,
      findIndex,
      getIndexOutput,
      fetchIndex,
      hasIndex,
      hasType,
      getSchemaForId,
      getRecordPath,
      getRecordUrl,
      fetchRecord,
      fetchRecords,
      buildStatusMap,
      buildContentItems,
      buildView,
      listViews
    };
  }

  global.IranDawn = {
    createClient
  };
})(window);
