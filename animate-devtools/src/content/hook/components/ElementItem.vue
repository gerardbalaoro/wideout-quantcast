<template>
	<li>
		<div>{{ name }}</div>
		<element-tree v-if="item.children" :items="item.children"></element-tree>
	</li>
</template>

<script>
export default {
	components: {
		'element-tree': () => import('./ElementTree.vue')
	},
	props: {
		item: { required: true }
	},
	computed: {
		name() {
			return this.item.name ?? this.item.constructor.toString().match(/new (?:lib)\.(\w+)/)?.[1] ?? this.item.toString();
		},
	}
}
</script>