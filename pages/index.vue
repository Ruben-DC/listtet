<script setup lang="ts"></script>

<template>
	<div class="feed">
		<TasksForm />

		<TodoList />
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
