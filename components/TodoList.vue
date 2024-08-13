<script setup lang="ts">
	import type { TodoList } from '~/types';

	const props = defineProps<{
		todoList: TodoList;
	}>();

	const todoList = toRef(props.todoList);

	const setIcon = (selectedIcon: string) => {
		todoList.value.icon = selectedIcon;
	};

	const allTodosStore = useAllTodosStore();

	const updateList = (index: number) => {};

	const deleteList = (id: number) => {
		allTodosStore.deleteTodoList(id);
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
			// updateList();
		} else if (event.key === 'Enter') {
			event.preventDefault();
			addRow(content);
		} else if (event.key === 'Backspace' && content.trim() === '') {
			event.preventDefault();
			deleteRow(index);
		}
	};

	// // à revoir. Focus le last input de la dernière liste. Il faudrait se baser sur un id de liste.
	const focusLastInput = () => {
		const allInputs = document.querySelectorAll(
			'.todolist__list__item__input'
		);
		const lastInput = allInputs[allInputs.length - 1];

		if (lastInput) {
			(lastInput as HTMLInputElement).focus();
		}
	};

	const focusPreviousInput = (index: number) => {
		const allInputs = document.querySelectorAll(
			'.todolist__list__item__input'
		);

		const previousInput = allInputs[index - 1];
		if (previousInput) {
			(previousInput as HTMLInputElement).focus();
		}
	};

	// const deleteList = (index: number) => {};
	const formatDate = (date: Date) => {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};
</script>

<template>
	<div class="todolist">
		<header class="todolist__header">
			<p class="date">{{ formatDate(todoList.date) }}</p>

			<div class="icon-container">
				<input
					type="text"
					name="title"
					id="title"
					rows="5"
					placeholder="Titre"
					v-model="todoList.title"
				/>

				<IconSelector @icon-set="setIcon" :icon="todoList.icon" />
			</div>

			<input
				type="text"
				name="note"
				placeholder="note"
				v-model="todoList.note"
			/>
		</header>

		<Divider direction="horizontal" />

		<ul class="todolist__list">
			<li
				v-for="(item, index) in todoList.itemList"
				class="todolist__list__item"
				:key="index"
			>
				<input type="checkbox" v-model="item.isChecked" />

				<input
					type="text"
					placeholder="Ajouter un item..."
					class="todolist__list__item__input"
					v-model="item.content"
					@keydown="handleKeydown($event, item.content, index)"
				/>

				<div class="todolist__list__item__actions">
					<div
						class="todolist__list__item__actions__button"
						@click="addRow(item.content)"
					>
						<Icon name="lucide:plus" />
					</div>

					<div
						class="todolist__list__item__actions__button"
						@click="deleteRow(index)"
					>
						<Icon name="lucide:trash" />
					</div>
				</div>
			</li>
		</ul>

		<footer class="todolist__footer">
			<ul for="submit" class="todolist__actions">
				<li
					class="todolist__actions__button todolist__actions__button--delete"
					@click="deleteList(todoList.id)"
				>
					<Icon class="icon" name="lucide:trash-2" size="20" />
				</li>
			</ul>
		</footer>
	</div>
</template>

<style lang="scss" scoped>
	.todolist {
		position: relative;

		display: flex;
		flex-direction: column;
		gap: 30px;

		max-width: 505px;
		width: 100%;
		height: fit-content;

		padding: 60px;

		border: solid 1px $strokes;
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

			.date {
				color: $secondary;
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
					.todolist__list__item__actions {
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

		&__actions {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 10px;

			padding: 10px;

			border: solid 1px $strokes;
			border-radius: 25px;
			background: $bg;

			&__button {
				&:hover {
					cursor: pointer;
				}

				&--delete {
					display: flex;
					justify-content: center;
					align-items: center;

					width: 50px;

					background: $bg;
					// color: $accent;

					&:hover {
						cursor: pointer;
						color: $accent;
					}
				}
			}
		}
	}
</style>
