chrome.runtime.onMessage.addListener((req, sender) => {
	if (sender.tab && req.animateDetected) {
		chrome.browserAction.setIcon({
			tabId: sender.tab.id,
			path: {
				16: 'assets/icons/icon-16.png',
				48: 'assets/icons/icon-48.png',
				128: 'assets/icons/icon-128.png',
			},
		});
	}
});

chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.get(['sitesList'], ({ sitesList }) => {
		if (Array.isArray(sitesList)) return;
		chrome.storage.sync.set({ sitesList: [] }, () => {});
	});
});
