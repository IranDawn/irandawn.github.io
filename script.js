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
  
  // Remove active class from all nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });
  
  // Show active section
  const activeSection = document.getElementById(hash);
  if (activeSection) {
    activeSection.classList.add('active');
    
    // Add active class to corresponding nav link
    const activeNavLink = document.querySelector(`.nav-links a[data-nav="${hash}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }
    
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
      <div class="content-description">${i

cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iran Dawn</title>
  <meta name="description" content="Open archive documenting events in Iran">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="nav">
    <div class="nav-container">
      <a href="#home" class="nav-brand">Iran Dawn</a>
      <div class="nav-links">
        <a href="#home" data-nav="home">Home</a>
        <a href="#database" data-nav="database">Database</a>
        <a href="#events" data-nav="events">Events</a>
        <a href="#stats" data-nav="stats">Stats</a>
        <a href="#submit" data-nav="submit">Submit</a>
      </div>
    </div>
  </nav>

  <main class="container">
    <!-- Home Section -->
    <section id="home" class="section active">
      <h1>Iran Dawn</h1>
      <p class="lead">
        Open archive documenting events in Iran through community-submitted content.
        All data is publicly accessible, verifiable, and preserved on GitHub.
      </p>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value" id="total-items">-</div>
          <div class="stat-label">Total Items</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="total-events">-</div>
          <div class="stat-label">Events</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="total-submissions">-</div>
          <div class="stat-label">Submissions</div>
        </div>
      </div>

      <div class="action-buttons">
        <a href="#database" class="btn btn-primary">Browse Database</a>
        <a href="#submit" class="btn btn-secondary">Submit Content</a>
      </div>
    </section>

    <!-- Database Section -->
    <section id="database" class="section">
      <h1>Database</h1>
      <p>Browse archived content. All items are stored as structured JSON files.</p>
      
      <div class="search-box">
        <input type="text" id="search-input" placeholder="Search by description, event, or ID...">
      </div>

      <div class="filter-bar">
        <select id="type-filter">
          <option value="">All Types</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
        <select id="event-filter">
          <option value="">All Events</option>
        </select>
      </div>

      <div id="content-list" class="content-list">
        <p class="loading">Loading database...</p>
      </div>
    </section>

    <!-- Events Section -->
    <section id="events" class="section">
      <h1>Events</h1>
      <p>Timeline of documented events.</p>
      
      <div id="events-list" class="events-list">
        <p class="loading">Loading events...</p>
      </div>
    </section>

    <!-- Stats Section -->
    <section id="stats" class="section">
      <h1>Statistics</h1>
      
      <div class="stats-section">
        <h2>Content Distribution</h2>
        <div id="content-stats" class="stats-table">
          <p class="loading">Loading statistics...</p>
        </div>
      </div>

      <div class="stats-section">
        <h2>Submission Activity</h2>
        <div id="submission-stats" class="stats-table">
          <p class="loading">Loading activity log...</p>
        </div>
      </div>

      <div class="stats-section">
        <h2>Recent Activity</h2>
        <div id="recent-activity" class="activity-log">
          <p class="loading">Loading recent activity...</p>
        </div>
      </div>
    </section>

    <!-- Submit Section -->
    <section id="submit" class="section">
      <h1>Submit Content</h1>
      <p>Help document events by submitting photos, videos, or reports.</p>

      <div class="submit-guide">
        <h2>How to Submit</h2>
        <ol class="submit-steps">
          <li>Go to the <a href="https://github.com/irandawn/submit/issues/new/choose" target="_blank">submission portal</a></li>
          <li>Choose a template (Media Report, Event Report, etc.)</li>
          <li>Fill out the form with accurate information</li>
          <li>Submit - our bot will validate your submission automatically</li>
          <li>If valid, a PR will be created and reviewed by maintainers</li>
        </ol>

        <h2>Guidelines</h2>
        <ul class="guidelines">
          <li>Only submit content you have rights to share</li>
          <li>Remove any personal identifiable information (PII)</li>
          <li>Provide accurate dates, times, and locations when possible</li>
          <li>All submissions are licensed under CC-BY-4.0</li>
        </ul>

        <h2>What Happens Next</h2>
        <p>
          Your submission will be automatically validated for required fields and PII.
          If it passes, a pull request is opened in the database repository.
          Maintainers review submissions for authenticity and accuracy before merging.
          All activity is logged in our public audit log.
        </p>

        <a href="https://github.com/irandawn/submit/issues/new/choose" 
           class="btn btn-primary" 
           target="_blank">
          Submit Content Now
        </a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>
        Iran Dawn is an open-source project.
        <a href="https://github.com/irandawn" target="_blank">View on GitHub</a>
      </p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
