<script setup lang="ts">
	const emit = defineEmits(['iconSet']);

	const iconsList = ['🚀', '🔨', '👾', '🚨', '🖋️', '🐵', '💯', '🥸', '⛄️'];
	let selectedIcon: Ref<string> = ref('🚀');

	const selector = ref();
	let isSelectorOpen = ref(false);

	const toggleSelector = () => {
		isSelectorOpen.value = true;
	};

	onClickOutside(selector, () => (isSelectorOpen.value = false));

	const changeSelectedIcon = (icon: string) => {
		selectedIcon.value = icon;
		isSelectorOpen.value = false;

		emit('iconSet', selectedIcon.value);
	};

	onMounted(() => {
		emit('iconSet', selectedIcon.value);
	});
</script>

<template>
	<div class="icon__container">
		<div class="icon__button__wrapper" @click="toggleSelector">
			<Icon class="icon__button" :name="selectedIcon" size="24" />
		</div>

		<ul ref="selector" class="icon__selector" v-if="isSelectorOpen">
			<li
				v-for="icon in iconsList"
				class="icon__selector__item"
				@click="changeSelectedIcon(icon)"
			>
				<Icon :name="icon" size="24" />
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
	.icon {
		&__container {
			position: relative;
			user-select: none;
		}

		&__button__wrapper {
			display: flex;
			justify-content: center;
			align-items: center;

			aspect-ratio: 1;
			width: 5.6rem;
			border-radius: 5px;

			background: $bg-2;

			&:hover {
				cursor: pointer;
			}
		}

		&__selector {
			z-index: 100;
			position: absolute;
			top: -15px;
			right: -15px;

			display: grid;
			gap: 10px;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 1fr 1fr 1fr;

			padding: 15px;
			border-radius: 15px;

			background: $bg-2;

			&__item {
				display: flex;
				justify-content: center;
				align-items: center;

				aspect-ratio: 1;
				width: 5.6rem;
				border-radius: 5px;

				background: $bg;

				&:hover {
					cursor: pointer;
				}
			}
		}
	}
</style>
