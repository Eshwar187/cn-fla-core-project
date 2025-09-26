console.log('🛡️ Cyber Guardian Options - Starting...');

// Storage wrapper with fallback
const storage = {
  async get(keys) {
    try {
      if (window.chrome && chrome.storage && chrome.storage.sync) {
        return new Promise(resolve => chrome.storage.sync.get(keys, resolve));
      }
    } catch (err) {
      console.warn('Chrome storage failed, using localStorage');
    }
    // localStorage fallback
    const result = {};
    if (typeof keys === 'object') {
      Object.keys(keys).forEach(k => {
        const stored = localStorage.getItem(k);
        result[k] = stored ? JSON.parse(stored) : keys[k];
      });
    }
    return result;
  },
  async set(obj) {
    try {
      if (window.chrome && chrome.storage && chrome.storage.sync) {
        return new Promise(resolve => chrome.storage.sync.set(obj, resolve));
      }
    } catch (err) {
      console.warn('Chrome storage failed, using localStorage');
    }
    // localStorage fallback
    Object.keys(obj).forEach(k => {
      localStorage.setItem(k, JSON.stringify(obj[k]));
    });
  }
};

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.style.background = type === 'success' ? '#28a745' : '#dc3545';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function normDomain(d) {
  return d.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function isValidDomain(domain) {
  const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(domain) && domain.length <= 253;
}

async function loadWhitelist() {
  try {
    const data = await storage.get({ whitelist: [] });
    const whitelist = data.whitelist || [];
    renderWhitelist(whitelist);
    updateStats(whitelist.length);
    console.log('Loaded whitelist:', whitelist);
  } catch (err) {
    console.error('Failed to load whitelist:', err);
    showToast('Failed to load data', 'error');
  }
}

function updateStats(count) {
  document.getElementById('totalDomains').textContent = count;
}

function renderWhitelist(items) {
  const listEl = document.getElementById('whitelist');
  const emptyState = document.getElementById('emptyState');
  if (items.length === 0) {
    listEl.innerHTML = '';
    listEl.appendChild(emptyState);
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    listEl.innerHTML = '';
    items.forEach(domain => {
      const item = document.createElement('div');
      item.className = 'domain-item';
      const domainSpan = document.createElement('span');
      domainSpan.className = 'domain-name';
      domainSpan.textContent = domain;
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = '🗑️ Remove';
      removeBtn.className = 'btn btn-danger';
      removeBtn.onclick = () => removeDomain(domain);
      item.appendChild(domainSpan);
      item.appendChild(removeBtn);
      listEl.appendChild(item);
    });
  }
}

async function addDomain() {
  console.log('Add domain clicked');
  const inputEl = document.getElementById('domain');
  const addBtn = document.getElementById('add');
  const addText = document.getElementById('addText');
  const addLoader = document.getElementById('addLoader');
  const raw = inputEl.value;
  const domain = normDomain(raw);
  if (!domain) {
    showToast('Please enter a domain name', 'error');
    return;
  }
  if (!isValidDomain(domain)) {
    showToast('Please enter a valid domain name', 'error');
    return;
  }
  // Show loading
  addText.style.display = 'none';
  addLoader.style.display = 'inline-block';
  addBtn.disabled = true;
  try {
    const data = await storage.get({ whitelist: [] });
    const whitelist = data.whitelist || [];
    if (whitelist.includes(domain)) {
      showToast('Domain already exists', 'error');
      inputEl.value = '';
      return;
    }
    const newWhitelist = [...whitelist, domain];
    await storage.set({ whitelist: newWhitelist });
    inputEl.value = '';
    showToast(`Added "${domain}" to whitelist`);
    renderWhitelist(newWhitelist);
    updateStats(newWhitelist.length);
    console.log('Added domain:', domain);
  } catch (err) {
    console.error('Failed to add domain:', err);
    showToast('Failed to add domain', 'error');
  } finally {
    addText.style.display = 'inline';
    addLoader.style.display = 'none';
    addBtn.disabled = false;
  }
}

async function removeDomain(domain) {
  console.log('Remove domain clicked:', domain);
  if (!confirm(`Remove "${domain}" from whitelist?`)) {
    return;
  }
  try {
    const data = await storage.get({ whitelist: [] });
    const whitelist = data.whitelist || [];
    const newWhitelist = whitelist.filter(d => d !== domain);
    await storage.set({ whitelist: newWhitelist });
    showToast(`Removed "${domain}"`);
    renderWhitelist(newWhitelist);
    updateStats(newWhitelist.length);
    console.log('Removed domain:', domain, 'New count:', newWhitelist.length);
    // Force update the stats display
    setTimeout(() => updateStats(newWhitelist.length), 100);
  } catch (err) {
    console.error('Failed to remove domain:', err);
    showToast('Failed to remove domain', 'error');
  }
}

function init() {
  console.log('Initializing Cyber Guardian Options...');
  // Add button
  const addBtn = document.getElementById('add');
  if (addBtn) {
    addBtn.onclick = addDomain;
    console.log('Add button handler attached');
  }
  // Enter key on input
  const inputEl = document.getElementById('domain');
  if (inputEl) {
    inputEl.onkeydown = (e) => {
      if (e.key === 'Enter') {
        addDomain();
      }
    };
    inputEl.focus();
    console.log('Input handlers attached');
  }
  // Back button
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.onclick = function() {
      console.log('Back button clicked');
      try {
        window.close();
      } catch (e) {
        showToast('Please close tab manually', 'error');
      }
    };
    console.log('Back button handler attached');
  }
  // Load initial data
  loadWhitelist();
  console.log('🛡️ Cyber Guardian Options - Ready!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
