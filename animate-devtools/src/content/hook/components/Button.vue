<template>
	<button 
		@click="click" 
		:class="[
			'bg-white border border-gray-300 shadow-sm rounded p-2 flex justify-center items-center',
			'hover:text-purple-500 hover:bg-purple-200 focus:outline-none focus:ring-2'
		]"
	>
		<slot></slot>
	</button>
</template>

<script>
export default {
	methods: {
		click () {
			this.$emit('click')
		}
	}
}
</script>