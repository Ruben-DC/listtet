import type { TodoList } from '~/types';

export const useAllTodosStore = defineStore('todos', () => {
	const allTodosLists: Ref<TodoList[]> = ref([]);

	const addTodoList = (todoList: TodoList) => {
		allTodosLists.value.push(todoList);
	};

	const deleteTodoList = (todoListId: number) => {
		allTodosLists.value.splice(todoListId, 1);
	};

	const updateTodoList = () => {};

	const generateRandomId = () => Math.floor(Math.random() * 10000) + 1;

	return {
		allTodosLists,
		addTodoList,
		deleteTodoList,
		updateTodoList,
		generateRandomId,
	};
});
