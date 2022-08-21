<script>
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	//Server Functions
	import { squigStore } from '$lib/squigStore.js';
	import { getNewSquig } from './squigGetter/+server.js';
	import { quadIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	//UI Components
	import SquigDetailsSection from './SquigDetailsSection.svelte';
	import AttributeSection from './AttributeSection.svelte';
	import LoadingScreen from './loadingScreen.svelte';
	import TitleSection from './TitleSection.svelte';
	import MobileLanding from './mobileLanding.svelte';
	import LiveView from './liveView.svelte';
	import ArrowKeys from './ArrowKeys.svelte';

	//import initial random squig from +page.server.js
	export let data;
	squigStore.set(data);

	const squigsMinted = 9675;
	let squigID = $squigStore.token.token.metadata.tokenID;
	let ready = false;
	let timer;
	let isMobile = false;
	let firstLoad = false

	onMount(() => {
		ready = true;
		firstLoad = true;

		//keyboard functionality
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
				case 'r': //get random squiggle
					squigID = Math.floor(Math.random() * squigsMinted);
			}
		};
	});

	//checks for mobile
	if (browser == true) {
		if (window.screen.width <= 420 || window.screen.height <= 420) {
			isMobile = true;
		}
	}

	//Listens for updates to squigID, gets a new squig based on new squigID change.
	$: if (squigID >= 0) {
		ready = false;
		clearTimeout(timer);
		timer = setTimeout(() => {
			getNewSquig(squigID).then((newSquig) => squigStore.set(newSquig));
			setTimeout(() => {
				ready = true;
			}, '200');
		}, 500);
		//If given invalid input, defaults to squig7744
	} else {
		ready = false;
		clearTimeout(timer);
		timer = setTimeout(() => {
			getNewSquig(7744).then((newSquig) => squigStore.set(newSquig));
			setTimeout(() => {
				ready = true;
			}, '200');
		}, 500);
	}
</script>

<svelte:head>
	<title>🔎 Squiggle Vision</title>
	<meta name="description" content="Interactive Full Screen Chromie Squiggle Viewer and Explorer">

</svelte:head>

<LoadingScreen />

{#if isMobile == false}
	<div class="flex flex-row h-screen bg-stone-800">
		<!-- Left Column Bar -->
		<div class="basis-1/6 h-auto shadow-lg">
			<div class="grid grid-rows-3 place-items-center items-start	p-6 h-full overflow-hidden">
				<div class="place-self-start left-0 top-0">
					<TitleSection {squigsMinted} bind:squigID={squigID} />
				</div>

				<div
					class="justify-self-center w-full h-full overflow-x-hidden z-30	 scroll-smooth desktop:row-span-2"
				>
					<AttributeSection {isMobile} />
				</div>
				<div class="place-self-end justify-self-start w-full z-40  bg-stone-800">
					<SquigDetailsSection />
				</div>
			</div>
		</div>

		<!-- Live Squiggle View-->
		<div class="basis-5/6 bg-stone-700 relative z-0">
			<ArrowKeys bind:squigID={squigID} />
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
	<MobileLanding />
{/if}
