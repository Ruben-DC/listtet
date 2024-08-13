import type { TodoList } from '~/types';

function deserialize(value: string): any {
	return JSON.parse(value, (key, val) => {
		if (typeof val === 'string' && !isNaN(Date.parse(val))) {
			return new Date(val);
		}
		return val;
	});
}

export const useAllTodosStore = defineStore(
	'todos',
	() => {
		const allTodosLists: Ref<TodoList[]> = ref([]);

		const addTodoList = (todoList: TodoList) => {
			allTodosLists.value.push(todoList);
		};

		const deleteTodoList = (todoListId: number) => {
			const todoListToRemove = allTodosLists.value.findIndex(
				(item) => item.id === todoListId
			);

			allTodosLists.value.splice(todoListToRemove, 1);
		};

		const updateTodoList = () => {};

		const generateRandomId = () => Math.floor(Math.random() * 1000000) + 1;

		return {
			allTodosLists,
			addTodoList,
			deleteTodoList,
			updateTodoList,
			generateRandomId,
		};
	},
	{
		persist: {
			paths: ['allTodosLists'],
			key: 'AllTodos',
			serializer: {
				deserialize: deserialize,
				serialize: JSON.stringify,
			},
		},
	}
);
