export type Todo = {
	isChecked: boolean;
	content: string;
};

export type TodoList = {
	id: number;
	date: Date;
	title: string;
	note: string;

	todoList: Todo[];
};
