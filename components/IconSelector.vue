<script setup lang="ts">
	const emit = defineEmits(['iconSet']);

	const iconsList = ['🚀', '🔨', '👾', '🚨', '🖋️', '🐵', '💯', '🥸', '⛄️'];

	const props = defineProps({
		icon: {
			default: '🚀',
			required: false,
		},
	});

	let selectedIcon = toRef(props.icon);

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

	const resetSelector = () => {
		selectedIcon.value = '🚀';
		emit('iconSet', selectedIcon.value);
	};

	onMounted(() => {
		emit('iconSet', selectedIcon.value);
	});

	defineExpose({ resetSelector });
</script>

<template>
	<div class="icon__container">
		<div class="icon__button__wrapper" @click="toggleSelector">
			<Icon class="icon__button" :name="selectedIcon" size="24" />
		</div>

		<ul ref="selector" class="icon__selector" v-if="isSelectorOpen">
			<li
				v-for="icon in iconsList"
				:key="icon"
				class="icon__selector__item"
				@click="changeSelectedIcon(icon)"
			>
				<Icon class="icon__button" :name="icon" size="24" />
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

		&__button {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		&__button__wrapper {
			display: flex;
			justify-content: center;
			align-items: center;

			aspect-ratio: 1;
			width: 5.6rem;
			border-radius: 5px;

			background: $bg-2;

			transition: all 0.2s ease-in;

			&:hover {
				cursor: pointer;

				transition: all 0.2s ease-out;
				scale: 1.05;
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

					transition: all 0.2s ease-out;
					scale: 1.05;
				}
			}
		}
	}
</style>
