<script setup lang="ts">
	const props = defineProps<{
		direction: 'vertical' | 'horizontal';
	}>();
</script>

<template>
	<div class="divider" :class="props.direction"></div>
</template>

<style lang="scss" scoped>
	.divider {
		background: $strokes;
	}

	.horizontal {
		width: 100%;
		height: 1px;
	}

	.vertical {
		width: 1px;
		height: 100%;
	}
</style>
