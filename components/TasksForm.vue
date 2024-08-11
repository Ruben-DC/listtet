<script setup lang="ts">
	import type { TodoList } from '~/types';
	import IconSelector from './IconSelector.vue';

	const todoList: Ref<TodoList> = ref({
		id: 0,
		date: new Date(),
		title: '',
		icon: '',
		note: '',
		itemList: [
			{
				isChecked: false,
				content: '',
			},
		],
	});

	const allTodosStore = useAllTodosStore();

	const iconSelectorRef: Ref<InstanceType<typeof IconSelector> | null> =
		ref(null);
	const setIcon = (selectedIcon: string) => {
		todoList.value.icon = selectedIcon;
	};

	if (iconSelectorRef.value) {
		iconSelectorRef.value.resetSelector();
	}

	const addList = () => {
		todoList.value.id = allTodosStore.generateRandomId();
		todoList.value.date = new Date();
		allTodosStore.addTodoList(todoList.value);

		resetForm();
	};

	// à revoir. Ajoute un item à la fin de la liste, et pas après l'item sur lequel on a voulu ajouter un élément à la suite. Permet d'ajouter des items vides et pas un seul.
	const addRow = async (content: string) => {
		if (content.trim() === '') {
			return;
		}

		todoList.value.itemList.push({
			isChecked: false,
			content: '',
		});

		await nextTick();
		focusLastInput();
	};

	const deleteRow = async (index: number) => {
		if (todoList.value.itemList.length > 1) {
			todoList.value.itemList.splice(index, 1);
		}

		await nextTick();
		focusPreviousInput(index);
	};

	const handleKeydown = (
		event: KeyboardEvent,
		content: string,
		index: number
	) => {
		if (event.key === 'Enter' && event.ctrlKey) {
			event.preventDefault();
			addList();
		} else if (event.key === 'Enter') {
			event.preventDefault();
			addRow(content);
		} else if (event.key === 'Backspace' && content.trim() === '') {
			event.preventDefault();
			deleteRow(index);
		}
	};

	const focusLastInput = () => {
		const allInputs = document.querySelectorAll(
			'.tasksform__list__item__input'
		);
		const lastInput = allInputs[allInputs.length - 1];

		if (lastInput) {
			(lastInput as HTMLInputElement).focus();
		}
	};

	const focusPreviousInput = (index: number) => {
		const allInputs = document.querySelectorAll(
			'.tasksform__list__item__input'
		);

		const previousInput = allInputs[index - 1];
		if (previousInput) {
			(previousInput as HTMLInputElement).focus();
		}
	};

	const resetForm = () => {
		todoList.value = {
			id: 0,
			date: new Date(),
			title: '',
			icon: '',
			note: '',
			itemList: [
				{
					isChecked: false,
					content: '',
				},
			],
		};

		if (iconSelectorRef.value) {
			iconSelectorRef.value.resetSelector();
		}
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
					rows="5"
					placeholder="Titre"
					v-model="todoList.title"
				/>

				<IconSelector @icon-set="setIcon" ref="iconSelectorRef" />
			</div>

			<input
				type="text"
				name="note"
				placeholder="note"
				v-model="todoList.note"
			/>
		</header>

		<Divider direction="horizontal" />

		<ul class="tasksform__list">
			<li
				v-for="(item, index) in todoList.itemList"
				class="tasksform__list__item"
				:key="index"
			>
				<input type="checkbox" v-model="item.isChecked" />

				<input
					type="text"
					placeholder="Ajouter un item..."
					class="tasksform__list__item__input"
					v-model="item.content"
					@keydown="handleKeydown($event, item.content, index)"
				/>

				<div class="tasksform__list__item__actions">
					<div
						class="tasksform__list__item__actions__button"
						@click="addRow(item.content)"
					>
						<Icon name="lucide:plus" />
					</div>

					<div
						class="tasksform__list__item__actions__button"
						@click="deleteRow(index)"
					>
						<Icon name="lucide:trash" />
					</div>
				</div>
			</li>
		</ul>

		<footer class="tasksform__footer">
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
		height: fit-content;

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

			.note {
				background: $bg;

				border: solid 1px $bg-2;
				border-radius: 5px;

				height: 8rem;
				line-height: 1.5;

				resize: vertical;
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

				&:hover {
					.tasksform__list__item__actions {
						opacity: 1;
					}
				}

				&__input {
					width: 100%;
				}

				&__actions {
					display: flex;
					gap: 10px;

					opacity: 0;

					transition: opacity 0.2s ease-out;

					&__button {
						background: $bg-2;
						border-radius: 3px;
						padding: 5px;

						.icon {
							box-sizing: border-box;
						}

						&:hover {
							cursor: pointer;
						}
					}
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
