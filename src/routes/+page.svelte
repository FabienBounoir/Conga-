<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	let play = $state(false);

	let firstBackgroundColor = $state('#470db1');
	let secondBackgroundColor = $state('#640f0f');

	let arrayImage = [];

	let audio = null;

	const startAnimation = () => {
		play = true;

		audio.play();

		setInterval(() => {
			firstBackgroundColor = randomColor();
			secondBackgroundColor = randomColor();
			createRandomImage();
		}, 500);
	};

	onMount(() => {
		audio = new Audio('/conga.mp3');
	});

	const randomColor = () => {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	};

	const createRandomImage = () => {
		const image = document.createElement('img');
		image.src = '/metadance.gif';
		image.style.top = `${Math.random() * 95 + 5}vh`;
		image.style.left = `${Math.random() * 95 + 5}vw`;
		image.style.position = 'absolute';
		image.style.zIndex = '100';
		image.style.opacity = `${Math.random() * 0.5 + 0.2}`;
		image.style.width = `${Math.random() * 25 + 3}vw`;
		image.style.animationDuration = `${Math.random() * 5 + 5}s`;
		const element = document.body.appendChild(image);
		arrayImage.push(element);

		//max 10 images
		if (arrayImage.length > 10) {
			document.body.removeChild(arrayImage[0]);
			arrayImage.shift();
		}
	};
</script>

<button on:click={startAnimation}>Trust me</button>

{#if play}
	<main
		in:scale={{ duration: 500 }}
		style="--background-color: {firstBackgroundColor}; --background-color-2: {secondBackgroundColor}"
	>
		<div>
			<img src="/metadance.gif" alt="metadance" />
		</div>
	</main>
{/if}

<p class="animated-image"></p>

<style>
	button {
		font-weight: 600;
		font-size: 1.25rem;
		appearance: none;
		-webkit-appearance: none;
		outline: none;
		padding: 8px 16px;
		color: #000;
		text-shadow: 0 1px 2px hsla(0, 0%, 100%, 0.15);
		background-color: #ad68d9;
		background-image: linear-gradient(#ad68d9, #a960d7);
		box-shadow: inset 0 0 2px hsla(0, 0%, 100%, 0.15);
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.15s ease-out;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}

	main {
		background-color: var(--background-color, #470db1);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		width: 100%;
		height: 100%;
	}

	div {
		background-color: var(--background-color-2, #640f0f);
		width: 95vw;
		height: calc(100dvh - 5vw);
		border-radius: 1vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 50vw;
	}

	.animated-image {
		position: absolute;
		width: 100px;
		height: auto;
		animation: move 5s linear infinite;
	}

	@keyframes move {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(100vw + 100px));
		}
	}
</style>
