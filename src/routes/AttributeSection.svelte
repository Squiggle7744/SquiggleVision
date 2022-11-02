<script>
	import { squigStore } from '$lib/squigStore.js';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let squigID;

	let ready = false;
	let reloadAttributes = 1;

	onMount(() => {
		ready = true;
	});

	$: if ($squigStore.token.token.metadata.tokenID >= 0) {
		reloadAttributes = 0;
		setTimeout(() => {
			reloadAttributes = 1;
		}, 50);
	}

	const attArray = [
		'Type',
		'Spectrum',
		'Color Direction',
		'Height',
		'Segments',
		'Steps Between',
		'Start Color',
		'End Color',
		'Color Spread'
	];

	const colorArray = [
		'hover:bg-pink-400',
		'hover:bg-red-400',
		'hover:bg-orange-400',
		'hover:bg-yellow-400',
		'hover:bg-emerald-400',
		'hover:bg-cyan-400',
		'hover:bg-sky-400',
		'hover:bg-violet-400',
		'hover:bg-fuchsia-400'
	];
	const activeColorArray = [
		'active:bg-pink-200',
		'active:bg-red-200',
		'active:bg-orange-200',
		'active:bg-yellow-200',
		'active:bg-emerald-200',
		'active:bg-cyan-200',
		'active:bg-sky-200',
		'active:bg-violet-200',
		'active:bg-fuchsia-200'
	];

	console.log($squigStore);
	function getRelated(feature) {
		squigID = $squigStore.reLinkIDs[feature];
	}
</script>

{#if ready == true}
	<div
		in:fly={{ x: -20, delay: 2000, duration: 400 }}
		class="subHeader z-20 pb-6 w-full sticky top-0"
	>
		Attributes
	</div>
{/if}

{#if ready == true}
	<div
		in:fly={{ y: 40, delay: 2200, duration: 400 }}
		class="grid grid-cols-2 mobile:grid-cols-1 mobile:grid-flow-row 
		mobile:row-span-full items-center gap-3 desktop:grid-cols-2"
	>
		{#each attArray as feature, i}
			<button
				on:click={() => getRelated(feature)}
				class="stats statBlock statBlockHover bg-stone-400 {colorArray[i]}
					transition hover:shadow-none 
					focus:outline-none focus:ring {activeColorArray[i]}"
			>
				<div class="stat py-3">
					<div class="stat-title attyTitle QHD:text-base text-xs">{feature}</div>
					{#if reloadAttributes == 1}
						<div
							in:fly={{ x: -20, duration: 400 }}
							class="stat-value attyText text-xs QHD:text-base"
						>
							{$squigStore.token.token.metadata.features[feature]}
						</div>
					{:else}
						<div
							in:fly={{ x: -20, duration: 400 }}
							class="stat-value attyText text-xs QHD:text-base opacity-0"
						>
							{$squigStore.token.token.metadata.features[feature]}
						</div>
					{/if}
					<div class="stat-desc" />
				</div>
			</button>
		{/each}

		{#if $squigStore.token.token.metadata.tokenID == 7744}
			<a href='https://mirror.xyz/0xABC64317f72E78ED3Dd23502A4DCBE13B0e00588/iOn3uvC64BgIDVY_cizuV9nN3pTwhhsvv3a6gZzf8W4'
				in:fly={{ y: 40, delay: 250, duration: 400 }}
				class="stats statBlock statBlockHover h-full content-center	 cursor-pointer 
				specBtn tranHover"
			>
				<label
					for="my-modal-4"
					class="modal-button bg-transparent border-transparent place-self-stretch	
        			text-white text-sm cursor-pointer"
				>
					<div class="stat-value attyText text-xs about desktop:text-base text-stone-700">
						about
					</div>
				</label>
			</a>
		{/if}
	</div>
{/if}

<style>
	.specBtn {
        background-color: rgb(231, 229, 228);
        background-image: radial-gradient(at 71% 88%, rgb(245, 243, 255) 0, transparent 58%), radial-gradient(at 9% 13%, rgb(254, 242, 242) 0, transparent 97%), radial-gradient(at 18% 44%, rgb(34, 211, 238) 0, transparent 86%), radial-gradient(at 7% 27%, rgb(255, 255, 255) 0, transparent 88%), radial-gradient(at 40% 90%, rgb(112, 26, 117) 0, transparent 42%), radial-gradient(at 41% 44%, rgb(29, 78, 216) 0, transparent 63%);
      	}
</style>