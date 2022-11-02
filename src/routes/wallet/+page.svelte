<script>
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
	import { quadIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { squigStore } from '$lib/squigStore.js';
	//Server Functions
	import { page } from '$app/stores';
	import { getNewSquig } from '../squigGetter/+server';
	//UI Components
	import SquigDetailsSection from '../SquigDetailsSection.svelte';
	import AttributeSection from '../AttributeSection.svelte';
	import LoadingScreen from '../loadingScreen.svelte';
	import TitleSection from '../TitleSection.svelte';
	import ArrowKeys from '../ArrowKeys.svelte';
	import { onboard } from '$lib/onboard.js';

	//import initial random squig from +page.server.js
	export let data;
	squigStore.set(data);

	//Number of Squigs Currently Minted
	const squigsMinted = 9675;

	let squigID = $squigStore.token.token.metadata.tokenID;
	let ready = false;
	let timer;
	let isMobile = false;

	$page.params.slug;

	onMount(() => {
		ready = true;

		//keyboard functionality
		document.onkeyup = function (e) {
			switch (e.key) {
				case 'a':
					squigID--;
					break;
				case 'ArrowLeft':
					squigID--;
					break;
				case 'd':
					squigID++;
					break;
				case 'ArrowRight':
					squigID++;
					break;
				case 's':
					squigID--;
					break;
				case 'ArrowDown':
					squigID--;
					break;
				case 'w':
					squigID++;
					break;
				case 'ArrowUp':
					squigID++;
					break;
					r;
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

	// Subscribe to wallet updates
	const wallets$ = onboard.state.select('wallets');

	// The first wallet in the array of connected wallets
	$: connectedAccount = $wallets$?.[0]?.accounts?.[0];

	$: account = connectedAccount?.ens?.name
		? {
				ens: connectedAccount?.ens,
				address: connectedAccount?.address
		  }
		: { address: connectedAccount?.address };

	const connect = async () => {
		await onboard.connectWallet();
	};

	const disconnect = ({ label }) => {
		onboard.disconnectWallet({ label });
	};
</script>

<!-- 
{#if isMobile == false} -->
<div class="flex flex-col mobile:flex-row h-screen bg-stone-800">
	<!-- Left Column Bar - Desktop Only -->
	{#if isMobile == false}
		<div class="basis-1/6 h-auto shadow-lg">
			<!-- Sectional Elements -->
			<div class="grid grid-rows-auto place-items-center items-start p-6 h-full overflow-hidden">
				<div class="place-self-start left-0 top-0 mobile:mb-6">
					<TitleSection {squigsMinted} {isMobile} bind:squigID />
				</div>
				<div
					class="justify-self-center w-full h-full overflow-x-hidden z-30	
					scroll-smooth desktop:row-span-2 hidebars"
				>
					<AttributeSection bind:squigID />
				</div>
				<div class="place-self-end justify-self-start w-full z-40  bg-stone-800">
					<SquigDetailsSection />
				</div>
			</div>
		</div>
	{/if}

	{#if $wallets$?.[0]?.provider}
		<div>
			<img src={ens?.avatar} alt="ENS Avatar" />
			<div>{ens?.name ? ens.name : address}</div>
			<div>Connected to {wallet.label}</div>
			<button
				onClick={() => {
					disconnect($wallets$?.[0]);
				}}>Disconnect</button
			>
		</div>
	{:else}
		<div>
			<button onClick={connect}> Connect </button>
		</div>
	{/if}
	<!-- Live Squiggle View-->
	<div class="basis-5/6 bg-white relative z-0 order-2">
		<ArrowKeys bind:squigID />
		{#if ready}
			<div
				in:fade={{ duration: 1000, easing: quadIn }}
				class="relative overflow-hidden w-full h-screen z-0 "
			>
				<iframe
					title="Live Squiggle View"
					class="absolute w-full h-screen "
					src={`https://generator.artblocks.io/${squigID}`}
				/>
			</div>
		{/if}
	</div>

	<!-- Mobile Section -->
	{#if isMobile == true}
		<div class="flex items-center left-0 top-0 bg-stone-800 fixed z-40 order-1">
			<TitleSection {squigsMinted} {isMobile} bind:squigID />
		</div>
		<div class="bg-stone-800 order-3">
			<!-- Sectional Elements -->
			<div class="grid grid-cols-1 place-items-center items-start	p-6 h-auto overflow-hidden">
				<div
					class="justify-self-center w-full h-full overflow-x-hidden z-30	 scroll-smooth desktop:row-span-2 hidebars"
				>
					<AttributeSection {isMobile} bind:squigID />
				</div>
				<div class="place-self-end mt-4 justify-self-start w-full z-20  bg-stone-800">
					<SquigDetailsSection />
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.hidebars::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.hidebars {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}
</style>
