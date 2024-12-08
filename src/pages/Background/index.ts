// Because I can't import these from the Content module
const UNINSTALL_URL = 'http://localhost:3000/uninstall';
const INSTALL_URL = 'http://localhost:3000/home';

chrome.runtime.onInstalled.addListener(function (object) {
  if (object.reason === 'install') {
    const now = new Date().getTime();
    chrome.tabs.create({ url: `${INSTALL_URL}` });
    chrome.storage.sync.set({ install_time: now });
    chrome.runtime.setUninstallURL(`${UNINSTALL_URL}`);
  }
});

chrome.storage.onChanged.addListener(function (changes) {
  if ('client_id' in changes) {
    chrome.storage.sync.get(['client_id', 'install_time'], (result) => {
      if (!result['install_time']) result['install_time'] = '1693540800000';
      const params = new URLSearchParams({
        a: result['client_id'],
        b: result['install_time'],
        c: '133',
      });
      chrome.runtime.setUninstallURL(`${UNINSTALL_URL}`);
    });
  }
});
