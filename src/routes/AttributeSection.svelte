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

	console.log($squigStore)
	function getRelated(feature) {
		squigID = $squigStore.reLinkIDs[feature]
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
		class="grid grid-cols-2 mobile:grid-cols-1 mobile:grid-flow-row mobile:row-span-full items-center gap-3 
		desktop:grid-cols-2"
	>
		{#each attArray as feature}
				<button on:click={() => getRelated(feature)} class="stats statBlock statBlockHover bg-stone-400 shadow-[6px_6px_0_0_#555] transition hover:shadow-none focus:outline-none focus:ring active:bg-stone-50">
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
			<div
				in:fly={{ y: 40, delay: 250, duration: 400 }}
				class="stats statBlock statBlockHover h-full content-center	 cursor-pointer 
				bg-gradient-to-r from-yellow-200 to-yellow-500 tranHover"
			>
				<label
					for="my-modal-4"
					class="modal-button bg-transparent border-transparent place-self-stretch	
        			text-white text-sm cursor-pointer"
				>
					<div class="stat-value attyText text-xs about desktop:text-base text-stone-700">
						ABOUT.
					</div>
				</label>
			</div>
		{/if}
	</div>
{/if}

<style>
</style>