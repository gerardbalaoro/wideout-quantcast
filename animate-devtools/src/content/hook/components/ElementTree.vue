<template>
	<ul class="font-mono text-xs">
		<element-item
			v-for="child in items"
			:key="child.id"
			:item="child"
		/>
	</ul>
</template>

<script>
import ElementItem from './ElementItem.vue';

export default {
	components: {
		'element-item': ElementItem
	},
	props: {
		items: { type: Array, required: true },
	}
};
</script>
