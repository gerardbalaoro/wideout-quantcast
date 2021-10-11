<template>
	<div
		ref="track"
		@resize="alert('sdsd')"
		class="relative flex items-center w-full bg-purple-300 rounded-full my-3"
		:style="{ height: trackSize + 'px' }"
	>
		<div
			ref="thumb"
			@mousedown.prevent="onmousedown"
			:style="{ height: thumbSize + 'px', width: thumbSize + 'px', marginLeft: (trackLength * value / 100) + 'px' }"
			class="cursor-pointer absolute bg-purple-500 rounded-full"
		/>
	</div>
</template>

<script>
export default {
	props: {
		value: { type: Number, default: 0 },
		trackSize: { type: Number, default: 6 },
		thumbSize: { type: Number, default: 12 }
	},
	data() {
		return {
			trackLength: 0
		};
	},
	mounted() {
		const watch = () => {
			this.trackLength = this.$refs.track.clientWidth - this.thumbSize;
			requestAnimationFrame(watch)
		};
		
		requestAnimationFrame(watch)
	},
	methods: {
		onmousedown(e) {
			document.addEventListener('mousemove', this.onmousemove);
			document.addEventListener('mouseup', this.onmouseup);
		},
		onmouseup(e) {
			document.removeEventListener('mousemove', this.onmousemove);
			document.removeEventListener('mouseup', this.onmouseup);
		},
		onmousemove(e) {
			const offset = Math.max(0, Math.min(this.trackLength, e.clientX - this.$refs.track.getBoundingClientRect().x));
			this.$emit('change', offset / this.trackLength * 100);
		}
	}
};
</script>
