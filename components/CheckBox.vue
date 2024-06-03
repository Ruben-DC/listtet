<script setup lang="ts">
	let isChecked = ref(false);
</script>

<template>
	<label class="checkbox" :class="{ checked: isChecked }" @click="!isChecked">
		<Icon name="lucide:check" v-if="isChecked" class="checkbox__icon" />

		<input type="checkbox" v-model="isChecked" />
	</label>
</template>

<style lang="scss" scoped>
	input {
		display: none;
	}

	.checkbox {
		display: flex;
		justify-content: center;
		align-items: center;

		aspect-ratio: 1;
		width: 2.4rem;

		background: rgb(38, 41, 51);
		background: -moz-linear-gradient(
			180deg,
			rgba(38, 41, 51, 1) 45%,
			rgba(34, 34, 34, 1) 100%
		);
		background: -webkit-linear-gradient(
			180deg,
			rgba(38, 41, 51, 1) 45%,
			rgba(34, 34, 34, 1) 100%
		);
		background: linear-gradient(
			180deg,
			rgba(38, 41, 51, 1) 45%,
			rgba(34, 34, 34, 1) 100%
		);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#262933",endColorstr="#222222",GradientType=1);

		border: solid 1px $bg-2;
		border-radius: 5px;

		&:hover {
			cursor: pointer;
		}

		&__icon {
			color: $accent;
		}
	}

	.checked {
		border: solid 1px $accent;
	}
</style>
