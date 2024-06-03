<script setup lang="ts">
	let title = ref('');
	let icon = ref('');
	let note = ref('');
	let checked = ref(false);
	let itemList: Ref<string[]> = ref([]);

	const setIcon = (selectedIcon: string) => {
		icon.value = selectedIcon;
		console.log(icon.value);
	};

	const addList = () => {
		console.log(title.value, icon.value, note.value, itemList.value);

		title.value = '';
		icon.value = '';
		note.value = '';
		itemList.value = [];
	};
</script>

<template>
	<form class="tasksform" @submit.prevent="addList">
		<header class="tasksform__header">
			<div class="icon-container">
				<input
					type="text"
					name="title"
					id="title"
					placeholder="Titre"
					v-model="title"
				/>

				<IconSelector @icon-set="setIcon" />
			</div>

			<input
				type="text"
				name="note"
				id="note"
				placeholder="note"
				v-model="note"
			/>
		</header>

		<Divider direction="horizontal" />

		<ul class="tasksform__list">
			<li class="tasksform__list__item">
				<CheckBox
					class="tasksform__list__item__checkbox"
					v-model="checked"
					@click="console.log(checked)"
				/>

				<input
					type="text"
					placeholder="Ajouter un item"
					class="tasksform__list__item__input"
				/>
			</li>

			<li><CheckBox /></li>
		</ul>

		<footer class="tasksform__footer">
			<!-- <div class="pentagon"> -->
			<input
				type="submit"
				class="tasksform__submit--button"
				name="submit"
				id="submit"
				value="+"
			/>

			<label for="submit" class="tasksform__submit--label">
				<Icon
					class="icon"
					name="solar:home-add-angle-linear"
					size="40"
				/>
			</label>
			<!-- </div> -->
		</footer>
	</form>
</template>

<style lang="scss" scoped>
	.tasksform {
		position: relative;

		display: flex;
		flex-direction: column;
		gap: 30px;

		max-width: 505px;
		width: 100%;

		padding: 60px;

		border: solid 1px $accent;
		border-radius: 15px;

		&__header {
			display: flex;
			flex-direction: column;
			gap: 15px;

			width: 100%;

			.icon-container {
				display: flex;
				align-items: center;
				gap: 10px;

				input[name='title'] {
					flex: 1;
					font-family: 'Inter';
					font-size: 5.6rem;
					font-weight: 800;

					width: 100%;
				}
			}
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: 15px;

			&__item {
				display: flex;
				gap: 10px;
				align-items: center;

				width: 100%;

				&__input {
					width: 100%;
				}
			}
		}

		&__footer {
			position: absolute;
			bottom: 0;
			left: 0;
			transform: translateY(50%);

			display: flex;
			justify-content: center;

			// background: red;
			width: 100%;
			height: 40px;
		}

		&__submit {
			&--button {
				display: none;
			}

			&--label {
				display: flex;
				justify-content: center;
				align-items: center;

				width: 50px;

				background: $bg;
				color: $accent;

				&:hover {
					cursor: pointer;
				}
			}
		}
	}
</style>
