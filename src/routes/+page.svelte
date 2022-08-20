<script>
	import { onMount } from 'svelte';
	import { squigStore } from '$lib/squigStore.js';
	import { quadIn } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import logo from '$lib/assets/logo.gif';
	import { getNewSquig } from './squigGetter/+server.js';
	import SquigDetailsSection from './SquigDetailsSection.svelte';
	import AttributeSection from './AttributeSection.svelte';
	import { browser } from '$app/env';
 
	export let data;
	squigStore.set(data);
	console.log('squigStore is set, now its: ', $squigStore)

	const squigsMinted = 9675;
	let squigID = $squigStore.token.token.metadata.tokenID;
	let ready = false;
	let loadingOver = false;
	let firstLoad = false;
	let timer;
	let isMobile = false;

	onMount(() => {
		ready = true;
		firstLoad = true;
		document.onkeyup = function (e) {
			switch (e.key) {
				case 'ArrowLeft':
					squigID--;
					break;
				case 'ArrowRight':
					squigID++;
					break;
				case 'ArrowDown':
					squigID--;
					break;
				case 'ArrowUp':
					squigID++;
					break;
				case 'KeyR':
					rnjesus();
			}
		};
	});

	if (browser == true) {
		if (window.screen.width <= 420 || window.screen.height <= 420) {
			isMobile = true;
		}
	}

	let squigDown = () => squigID--;
	let squigUp = () => squigID++;
	function rnjesus() {
		squigID = Math.floor(Math.random() * squigsMinted);
	}

	$: if (squigID >= 0) {
		ready = false;
		clearTimeout(timer);
		timer = setTimeout(() => {
			getNewSquig(squigID).then((newSquig) => squigStore.set(newSquig));
			setTimeout(() => {
				ready = true;
			}, '200');
		}, 500);
	} else {
		ready = false;
		clearTimeout(timer);
		timer = setTimeout(() => {
			getNewSquig(7744)
				.then((newSquig) => console.log(newSquig))
				.then((newSquig) => squigStore.set(newSquig));
			setTimeout(() => {
				ready = true;
			}, '200');
		}, 500);
	}

	setTimeout(() => {
		loadingOver = true;
	}, '1000');
</script>

<svelte:head>
	<title>🔎 Squiggle Vision</title>
</svelte:head>

{#if loadingOver == false}
	<div out:fade={{ duration: 1000, easing: quadIn }} class="fixed z-10 h-full w-full bg-stone-900 ">
		<img
			out:fade={{ duration: 500, easing: quadIn }}
			alt="7744"
			src={logo}
			width="64"
			class="fixed z-20 top-1/2 left-1/2 -ml-6 -mt-6"
		/>
	</div>
{/if}

{#if isMobile == false}
	<div class="flex flex-row h-screen bg-stone-800">
		<!-- Left Column Bar -->

		<div class="basis-1/6 h-auto shadow-lg">
			<div class="grid grid-rows-3 place-items-center items-start	p-6 h-full">
				<div class="place-self-start left-0 top-0">
					{#if firstLoad == true}
						<h1
							in:fly={{ x: -40, delay: 1850, duration: 400 }}
							class="text-3xl text-start text-stone-200
                        bg-stone-800 font-darkGrotBlack
                        tracking-wide
                        laptop:text-4xl 
                        desktop:text-6xl"
						>
							Chromie Squiggle
							<span class="font-darkGrotBlack font-black self-start">
								<input
									in:fly={{ x: -30, delay: 2200, duration: 400 }}
									type="number"
									bind:value={squigID}
									id="newID"
									placeholder={squigID}
									class="input input-ghost input-md appearance-none	
                            text-stone-400 bg-stone-700 laptop:mt-2
                            laptop:w-3/4 desktop:w-1/2 laptop:text-2xl desktop:text-3xl text-left	
                            font-darkGrot
                            hover:bg-stone-900 hover:text-stone-700"
								/>
								<button
									in:fly={{ x: 30, delay: 2500, duration: 400 }}
									on:click={rnjesus}
									type="button"
									class="btn btn-ghost font-darkGrotBlack 
                                    bg-stone-900 laptop:mt-2
                                    laptop:text-xl desktop:text-2xl laptop:w-1/2 desktop:w-1/4">🎲</button
								>
							</span>
						</h1>
					{/if}
				</div>

				<div class="justify-self-center w-full h-full overflow-auto desktop:row-span-2">
					<AttributeSection {isMobile} />
				</div>
				<div class="place-self-end justify-self-start ">
					<SquigDetailsSection />
				</div>
			</div>
		</div>

		<!-- Live Squiggle View-->
		<div class="basis-5/6 bg-stone-700 relative z-0">
			<button on:click={squigDown} class="button pl-5 absolute inset-y-0 left-0 rounded-lg z-10">
				<kbd class="kbd bg-stone-700 text-stone-200 text-lg drop-shadow-lg z-10 animate-bounce-left"
					>←</kbd
				>
			</button>
			<button on:click={squigUp} class="button pr-5 absolute rounded-lg inset-y-0 right-0 z-10">
				<kbd class="kbd bg-stone-700 text-stone-200 text-lg drop-shadow-lg animate-bounce-right"
					>→</kbd
				>
			</button>
			{#if ready}
				<div
					in:fade={{ duration: 1000, easing: quadIn }}
					class="relative overflow-hidden w-full h-screen z-0 "
				>
					<iframe
						title="Live Squiggle View"
						class="absolute w-full h-screen"
						src={$squigStore.token.token.metadata.generator_url}
					/>
				</div>
			{/if}
		</div>
	</div>
{:else if isMobile == true}
	<div class="fixed z-10 h-full w-full bg-stone-900 p-20 font-darkGrotBlack text-center">
		<h2 class="text-lg font-bold text-stone-300 bg-stone-900 font-darkGrotBlack">Please View On Desktop</h2>
		<h3 class="text-xs italic font-thin text-stone-500 font-darkGrotBlack">Mobile version is still in development.</h3>
		<p class="py-4 text-stone-300 bg-stone-90 font-darkGrotBlack">
			Squigs.xyz is designed for a full-screen discovery/browsing experience and is best viewed on Desktop. 
		</p>
	</div>
{/if}

<style>
	@keyframes l-bounce {
		0%,
		100% {
			transform: translateX(25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: none;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}

	@keyframes r-bounce {
		0%,
		100% {
			transform: translateX(-25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: none;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}
	.animate-bounce-left {
		animation: l-bounce 1s infinite;
	}
	.animate-bounce-right {
		animation: r-bounce 1s infinite;
	}
</style>
