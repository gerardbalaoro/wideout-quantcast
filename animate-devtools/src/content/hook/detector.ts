export interface AnimateWindow extends Window {
	createjs?: {
		Ticker: typeof createjs.Ticker & createjs.Ticker;
	};
	stage?: createjs.Stage;
	AdobeAn?: any;
}

type DetectorEvent = { window: AnimateWindow; target: HTMLElement; type: string };
type DetectorListener = (e: DetectorEvent) => void;

export const Detector = (window: AnimateWindow, callback: DetectorListener) => {
	const hasAnimate = (window: AnimateWindow) => {
		try {
			return window.AdobeAn !== undefined;
		} catch (error) {
			return false;
		}
	}

	const iframeHasAnimate = (iframe: HTMLIFrameElement, callback: DetectorListener) => {
		if (iframe.contentDocument?.readyState === 'complete') {
			if (hasAnimate(iframe.contentWindow)) {
				callback({ window: iframe.contentWindow, target: iframe, type: 'load' });
			}
		}

		iframe.addEventListener('load', () => {
			if (hasAnimate(iframe.contentWindow)) {
				callback({ window: iframe.contentWindow, target: iframe, type: 'load' });
			}
		});
	};

	const watchMutations = (window: AnimateWindow, callback: DetectorListener) => {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				for (const node of Array.from(mutation.addedNodes) as HTMLIFrameElement[]) {
					if (node.tagName !== 'IFRAME') continue;
					iframeHasAnimate(node, ({ window }) => {
						callback({ window: window, target: node, type: 'load' });
					});
				}
			}
		});

		observer.observe(window.document, { subtree: true, childList: true });
	};

		if (hasAnimate(window)) {
			callback({ window, target: window.document.querySelector('#animation_container'), type: 'load ' });
		} else if (window === window.top) {
			const iframe = window.document.querySelectorAll('iframe');
			iframe.forEach((iframe) => iframeHasAnimate(iframe, callback));
			watchMutations(window, callback);
		}
};
