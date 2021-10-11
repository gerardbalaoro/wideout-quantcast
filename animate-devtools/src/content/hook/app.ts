import Vue from 'vue';
import Detector from './detector';
import App from './components/App.vue';
import WebFont from 'webfontloader';

const state = ((window as any).$animate = {
	instances: [] as any[],
});

const main = () => {
	console.debug('👾 Animate Hook Activated');
	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (const node of Array.from(mutation.removedNodes) as HTMLIFrameElement[]) {
				if (typeof node.hasAttribute === 'function' && node.hasAttribute('animate-instance')) {
					const id = node.getAttribute('animate-instance');
					state.instances = state.instances.filter((i) => {
						if (i.id != id) return true;
						i.target?.remove();
						return false;
					});
				}
			}
		}
	});

	observer.observe(document, { subtree: true, childList: true });

	Detector(window, ({ window: animateWindow, target }) => {
		// Skip if controller already exists for target
		if (state.instances.find((i) => i.target == target) !== undefined) return;
		console.debug('👾 Animate Detected on ' + animateWindow.location.href);

		const id = '' + window.crypto.getRandomValues(new Uint32Array(10))[0];
		const ticker = animateWindow.createjs.Ticker;

		const createAppOnStageLoad = () => {
			if (animateWindow.stage !== undefined) {
				ticker.removeEventListener('tick', createAppOnStageLoad);

				const app = new Vue({
					render: (h) =>
						h(App, {
							props: { animateWindow },
						}),
				});

				target.insertAdjacentHTML('afterend', `<div animate-controller="${id}"><div></div></div>`);
				target.setAttribute('animate-instance', id);
				app.$mount(`[animate-controller="${id}"] > div`);
				state.instances.push({ id, app, target });
			}
		};

		ticker.addEventListener('tick', createAppOnStageLoad);
		window.postMessage({ animateDetected: true });
	});
};

WebFont.load({ custom: { families: ['Material Icons Rounded'] } });

if (window.document.readyState === 'complete') {
	main();
} else {
	window.addEventListener('load', main);
}
