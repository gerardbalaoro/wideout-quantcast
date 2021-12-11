chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.get(['sitesList'], ({ sitesList }) => {
		if (Array.isArray(sitesList)) return;
		chrome.storage.sync.set({ sitesList: [] }, () => {});
	});
});
