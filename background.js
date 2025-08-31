
const BASE_RULE_IDS = {
  ALLOW_COM: 1,
  ALLOW_ORG: 2,
  BLOCK_OTHERS: 3,
};

const DYNAMIC_RULE_START_ID = 1000; 

function escapeForRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function domainToUrlRegex(domain) {
  
  const d = escapeForRegex(domain.trim());
  return `^https?:\\/\\/([^\/]+\\.)*${d}([\/:]|$)`;
}

async function setBaseRules() {
  const baseRules = [
    {
      id: BASE_RULE_IDS.ALLOW_COM,
      priority: 100,
      action: { type: "allow" },
      condition: {
        regexFilter: '^https?:\\/\\/([^\/]+\\.)*[^\/:]+\\.com([\/:]|$)',
        resourceTypes: ["main_frame"],
      },
    },
    {
      id: BASE_RULE_IDS.ALLOW_ORG,
      priority: 100,
      action: { type: "allow" },
      condition: {
        regexFilter: '^https?:\\/\\/([^\/]+\\.)*[^\/:]+\\.org([\/:]|$)',
        resourceTypes: ["main_frame"],
      }},
      {
      id: BASE_RULE_IDS.ALLOW_ORG,
      priority: 110,
      action: { type: "allow" },
      condition: {
        regexFilter: '^https?:\\/\\/([^\/]+\\.)*[^\/:]+\\.in([\/:]|$)',
        resourceTypes: ["main_frame"],
      },
    },
    {
      id: BASE_RULE_IDS.BLOCK_OTHERS,
      priority: 1,
      action: { type: "redirect", redirect: { extensionPath: "/blocked.html" } },
      condition: {
        regexFilter: '^https?:\\/\\/', 
        resourceTypes: ["main_frame"],
      },
    },
  ];

  const existing = await chrome.declarativeNetRequest.getDynamicRules();
  const baseIds = Object.values(BASE_RULE_IDS);
  const toRemove = existing.filter(r => baseIds.includes(r.id)).map(r => r.id);

  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: baseRules,
    removeRuleIds: toRemove,
  });
}

async function rebuildWhitelistRules() {
  const { whitelist = [] } = await chrome.storage.sync.get({ whitelist: [] });

  const existing = await chrome.declarativeNetRequest.getDynamicRules();
  const toRemove = existing
    .filter(r => r.id >= DYNAMIC_RULE_START_ID)
    .map(r => r.id);

  const addRules = whitelist.map((domain, idx) => ({
    id: DYNAMIC_RULE_START_ID + idx,
    priority: 200, // higher than base allow to ensure allow wins
    action: { type: "allow" },
    condition: {
      regexFilter: domainToUrlRegex(domain),
      resourceTypes: ["main_frame"],
    },
  }));

  await chrome.declarativeNetRequest.updateDynamicRules({ addRules, removeRuleIds: toRemove });
}

async function initRules() {
  await setBaseRules();
  await rebuildWhitelistRules();
}

chrome.runtime.onInstalled.addListener(() => {
  initRules();
});

chrome.runtime.onStartup?.addListener(() => {
  initRules();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'sync' && changes.whitelist) {
    rebuildWhitelistRules();
  }
});
