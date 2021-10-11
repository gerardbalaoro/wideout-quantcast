<template>
	<div class="relative mx-auto font-sans" v-cloak>
		<div class="flex flex-wrap items-center justify-center max-w-md p-5 mx-auto">
			<div class="flex">
				<c-button @click="seek(currentFrame - 1)" title="Previous Frame" class="m-1 text-gray-500">
					<span class="material-icons-rounded">skip_previous</span>
				</c-button>
				<c-button @click="play" v-if="paused" title="Play" class="m-1 text-gray-500">
					<span class="material-icons-rounded">play_circle</span>
				</c-button>
				<c-button @click="stop" v-else title="Stop" class="m-1 text-gray-500">
					<span class="material-icons-rounded">stop_circle</span>
				</c-button>
				<c-button @click="seek(currentFrame + 1)" title="Next Frame" class="m-1 text-gray-500">
					<span class="material-icons-rounded">skip_next</span>
				</c-button>
			</div>
			<c-button-group class="m-1">
				<template v-slot:input>
					<input
						type="number"
						min="0"
						class="block w-20 text-black border-gray-300 rounded-none rounded-l-md focus:outline-none focus:ring-1"
						v-model="selectedFrame"
						@keypress.enter="seek(selectedFrame)"
						value=""
					/>
				</template>
				<template v-slot:button>
					<c-button
						@click="seek(selectedFrame)"
						title="Go To Frame"
						class="py-2 pl-3 pr-3 text-gray-500 rounded-l-none rounded-r-md"
					>
						<span class="material-icons-rounded">fast_forward</span>
					</c-button>
				</template>
			</c-button-group>
			<div class="flex">
				<c-button @click="snapshot" title="Take Snapshot" class="m-1 text-gray-500">
					<span class="material-icons-rounded">photo_camera</span>
				</c-button>
				<c-button @click="reload" title="Reload" class="m-1 text-gray-500">
					<span class="material-icons-rounded">replay</span>
				</c-button>
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>

<script>
import '@fontsource/material-icons-rounded';
import ButtonGroup from './ButtonGroup.vue';
import Button from './Button.vue';

const saveAs = (uri, name) => {
	const a = document.createElement('a');
	a.style.display = 'none';
	a.download = name;
	a.href = uri;

	document.body.appendChild(a);
	a.click();
	a.remove();
};

export default {
	name: 'App',
	components: {
		'c-button': Button,
		'c-button-group': ButtonGroup,
	},
	props: {
		animateWindow: { required: true },
	},
	data() {
		return {
			paused: true,
			selectedFrame: 0,
			currentFrame: 0,
		};
	},
	methods: {
		snapshot() {
			const canvas = this.animateWindow.document.querySelector('canvas');
			const scale = window.devicePixelRatio;
			const height = canvas.height / scale;
			const width = canvas.width / scale;
			saveAs(canvas.toDataURL('image/jpg'), `${width}x${height}.jpg`);
		},
		seek(frame) {
			this.stop();
			this.animateWindow.stage?.children[0]?.gotoAndPlay(frame);
		},
		reload() {
			this.animateWindow.location.reload();
		},
		play() {
			if (!this.animateWindow.stage) return;
			this.animateWindow.stage.tickEnabled = true;
		},
		stop() {
			if (!this.animateWindow.stage) return;
			this.animateWindow.stage.tickEnabled = false;
		},
	},
	mounted() {
		// window.top.$an0 = this;
		const updateStageProperties = () => {
			if (this.animateWindow.stage !== undefined) {
				this.paused = this.animateWindow.stage.tickEnabled !== true;
				this.currentFrame = this.animateWindow.stage.children[0].currentFrame;
			}
			requestAnimationFrame(updateStageProperties);
		};

		requestAnimationFrame(updateStageProperties);
		this.animateWindow.addEventListener('beforeunload', () => {
			this.$destroy();
		});
	},
};
</script>
