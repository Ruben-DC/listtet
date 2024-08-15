<script setup lang="ts">
	useHead({
		title: 'Listtet',
		meta: [{ name: 'description', content: 'My amazing site.' }],
		link: [
			{
				rel: 'icon',
				type: 'image/png',
				href: './icon.png',
			},
		],
	});

	const allTodosStore = useAllTodosStore();
</script>

<template>
	<div class="feed">
		<TasksForm />

		<TodoList
			v-for="todo in allTodosStore.allTodosLists"
			:todo-list="todo"
			:key="todo.id"
		/>
	</div>
</template>

<style lang="scss" scoped>
	.feed {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 30px 20px;

		width: 100%;
		height: fit-content;

		padding-bottom: 50px;
	}
</style>
