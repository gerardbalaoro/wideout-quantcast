const injectScript = (file: string, node: string) => {
	var th = document.getElementsByTagName(node)[0];
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', file);
	th.appendChild(s);
};

const installHook = () => {
	chrome.storage.sync.get(['sitesList'], ({ sitesList }) => {
		if ((sitesList as string[]).includes(window.location.hostname)) {
			injectScript(chrome.extension.getURL('/content/hook/animate-hook.js'), 'body');
			window.addEventListener('message', (e) => {
				if (e.data && e.data.animateDetected) {
					chrome.runtime.sendMessage(e.data);
				}
			});
		}
	});
};

chrome.storage.onChanged.addListener((changes) => {
	if (changes.siteList) installHook();
});

installHook();
