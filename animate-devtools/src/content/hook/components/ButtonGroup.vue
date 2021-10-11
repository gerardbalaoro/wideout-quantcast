<template>
	<div class="flex rounded-md shadow-sm">
			<div class="flex flex-grow focus-within:z-10 items-stretch relative">
				<slot name="input"></slot>
			</div>
			<div class="-ml-px relative">
				<slot name="button"></slot>
			</div>
		</div>
</template>