import Vue from 'vue';
import { Detector, AnimateWindow } from './detector';
import App from './components/App.vue';
import WebFont from 'webfontloader';

declare global {
    interface Window {
        $animate: any;
    }
}

class Controller {
	app: Vue|null;
	id: string|null;

	constructor(public window: AnimateWindow, public target: HTMLElement) {
		this.id = '' + window.crypto.getRandomValues(new Uint32Array(10))[0];
		this.target.setAttribute('animate-id', this.id);
	}

	get container(): HTMLElement|null {
		return document.querySelector(`[animate-controller="${this.id}"]`);
	}

	get isAttached(): boolean {
		return this.container != null;
	}

	attach() {
		const controller = document.createElement('div');
		controller.setAttribute('animate-controller', this.id);
		controller.innerHTML = "<div></div>";
		this.target.insertAdjacentElement('afterend', controller);
		this.app = new Vue({
			render: (h) => {
				return h(App, {
					props: { animateWindow: this.window },
				});
			},
		});

		this.app.$mount(controller.querySelector('div'));
	}

	detach() {
		if (this.isAttached) {
			this.app.$destroy();
			this.container.remove();
		}
	}
}

const main = () => {
	if (typeof window.$animate !== 'undefined') return;
	console.debug('👾 Animate Hook Activated');

	const state = window.$animate = {
		instances: [] as Controller[],
	};

	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			for (const node of Array.from(mutation.removedNodes) as HTMLIFrameElement[]) {
				if (typeof node.hasAttribute === 'function' && node.hasAttribute('animate-id')) {
					const id = node.getAttribute('animate-id');
					state.instances = state.instances.filter((instance) => {
						if (instance.id !== id) return true;
						instance.detach();
						console.debug(`👾 Controller Detached (${instance.id})`);
						return false;
					});
				}
			}
		}
	});

	observer.observe(document, { subtree: true, childList: true });

	Detector(window, ({ window: animateWindow, target }) => {
		let instance: Controller = state.instances.find((i) => target.getAttribute('animate-id') === i.id);
		if (instance !== undefined) {
			instance.detach();
			console.debug(`👾 Controller Detached (${instance.id})`);
		}
		
		instance = new Controller(animateWindow, target);
		console.debug(`👾 Animate Detected (${instance.id}) on`, instance.target);
		instance.window.createjs.Ticker.addEventListener('tick', () => {
			if (!instance.isAttached && instance.window.stage !== undefined) {
				instance.attach();
				console.debug(`👾 Controller Attached (${instance.id}) on`, instance.container);
			}
		});

		state.instances.push(instance)
	});
};

WebFont.load({ custom: { families: ['Material Icons Rounded'] } });
window.addEventListener('load', main);
main();
