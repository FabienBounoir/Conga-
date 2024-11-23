<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	let play = $state(false);

	let firstBackgroundColor = $state('#470db1');
	let secondBackgroundColor = $state('#640f0f');

	let audio: HTMLAudioElement | null = null;
	let interval: number | null = null;

	let animationType = ['ease-in', 'ease-out', 'ease-in-out', 'linear'];

	const startAnimation = () => {
		if (audio) {
			audio.play();

			audio.addEventListener('ended', () => {
				if (audio) {
					audio.currentTime = 0;
					audio.play();
				}
			});
		}

		setTimeout(() => {
			play = true;
		}, 100);

		interval = setInterval(() => {
			firstBackgroundColor = randomColor();
			secondBackgroundColor = randomColor();
			createRandomImage();
		}, 800);
	};

	onMount(() => {
		audio = new Audio('/conga.mp3');
		audio.load();
	});

	const randomColor = () => {
		return '#' + Math.floor(Math.random() * 16777215).toString(16);
	};

	const createRandomImage = () => {
		const image = document.createElement('img');
		image.src = '/metadance.gif';
		image.style.top = `${Math.random() * 90}vh`;
		image.style.position = 'absolute';
		image.style.zIndex = '11';
		image.style.opacity = `${Math.random() * 0.5 + 0.2}`;
		image.style.width = `${Math.random() * 20 + 3}vw`;
		image.style.animationDuration = `${Math.random() * 8 + 4}s`;
		image.style.filter = `hue-rotate(${Math.random() * 360}deg)`;

		if (Math.random() > 0.5) {
			image.style.animationName = 'leftToRight';
			image.style.left = `-${image.style.width + 2}vw`;
		} else {
			image.style.animationName = 'rightToLeft';
			image.style.right = `${image.style.width + 102}vw`;
		}

		image.style.animationTimingFunction = animationType[Math.floor(Math.random() * 4)];
		image.style.animationIterationCount = '1';

		image.addEventListener('animationend', () => {
			document.body.removeChild(image);
		});

		document.body.appendChild(image);
	};

	onDestroy(() => {
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}

		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<svelte:head>
	{#if play}
		<title>Conga Dance !</title>
	{:else}
		<title>???</title>
	{/if}
</svelte:head>

<button on:click={startAnimation}>Trust me</button>

{#if play}
	<main
		in:scale={{ duration: 1000 }}
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

	button:hover {
		transform: translate(-50%, -50%) scale(0.95);
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

	div > img {
		width: 50vw;
	}
</style>
