<script setup lang="ts"></script>

<template>
	<header>
		<h1 class="name">
			<img src="/listtet.png" class="name__icon" />

			Listtet
		</h1>
	</header>

	<main>
		<slot />
	</main>

	<footer></footer>
</template>

<style lang="scss" scoped>
	header {
		position: sticky;
		top: 0;
		left: 0;

		display: flex;
		padding: 30px 50px;
		justify-content: space-between;
		align-items: center;

		background: 00000010;
		backdrop-filter: blur(140px);

		.name {
			display: flex;
			align-items: center;
			gap: 15px;

			font-size: 2.4rem;

			&__icon {
				color: $accent;
				aspect-ratio: 1;

				width: 3rem;
			}
		}
	}

	main {
		display: flex;
		justify-content: center;
	}
</style>
