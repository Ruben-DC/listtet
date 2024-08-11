export type TodoItem = {
	isChecked: boolean;
	content: string;
};

export type TodoList = {
	id: number;
	date: Date;
	title: string;
	icon: string;
	note: string;

	itemList: TodoItem[];
};
