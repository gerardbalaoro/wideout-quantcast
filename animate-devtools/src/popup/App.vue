<template>
	<div class="h-52 w-60 font-sans flex flex-col justify-center items-center m-5">
		<span
			class="material-icons-rounded text-6xl mb-5 mx-auto text-gray-600"
			:class="{ 'text-purple-600': enabled }"
		>
			bolt
		</span>
		<p class="text-center text-base font-bold">
			Adobe Animate Developer<br />
			Tools is {{ enabled ? 'Enabled' : 'Disabled' }}
		</p>
		<button @click="toggle" :class="['bg-purple-500 mt-5 px-3 py-2 rounded', 'text-sm text-white font-medium uppercase']">
			{{ enabled ? 'Disable' : 'Enable' }} on this page
		</button>
	</div>
</template>

<style lang="postcss" scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>

<script>
import '@fontsource/material-icons-rounded';

export default {
	name: 'App',
	data() {
		return {
			enabled: false,
			tab: null,
			url: null
		};
	},
	methods: {
		toggle() {
			chrome.storage.sync.get(['sitesList'], ({ sitesList }) => {
				const host = this.url.hostname;
				if (!sitesList.includes(host)) {
					sitesList.push(host);
				} else {
					sitesList = sitesList.filter(s => s !== host)
				}
				chrome.storage.sync.set({ sitesList }, () => {
					chrome.tabs.reload(this.tab);
					this.enabled = !this.enabled;
				});
			});
		}
	},
	created() {
		chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
			this.tab = tab[0].id;
			this.url = new URL(tab[0].url);
			chrome.storage.sync.get(['sitesList'], ({ sitesList }) => {
				this.enabled = sitesList.includes(this.url.hostname);
			});
		});
	},
};
</script>
