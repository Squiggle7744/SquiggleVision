<script>
	//import { squigStore } from '../squigStore/+server';
    import { squigStore } from '$lib/squigStore.js'
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let isMobile;
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

</script>

{#if ready == true}
	<h2
		in:fly={{ x: -20, delay: 2000, duration: 400 }}
		class="text-3xl text-stone-200 py-5
bg-stone-800 text-left font-darkGrotBlack sticky"
	>
		Attributes
	</h2>
{/if}

{#if ready == true}
	<div
		in:fly={{ y: 40, delay: 2200, duration: 400 }}
		class="grid grid-flow-row row-span-full items-center gap-2 desktop:grid-cols-2"
	>

		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">Type</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features.Type}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features.Type}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">Spectrum</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features.Spectrum}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features.Spectrum}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">Color Direction</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features['Color Direction']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['Color Direction']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

        {#if isMobile == false}
		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">Height</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features.Height}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features.Height}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">Segments</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features.Segments}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features.Segments}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">Steps Between</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features['Steps Between']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['Steps Between']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">Start Color</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features['Start Color']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['Start Color']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">End Color</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features['End Color']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['End Color']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat">
				<div class="stat-title attyTitle text-xs desktop:text-base">Color Spread</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base"
					>
						{$squigStore.token.token.metadata.features['Color Spread']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs desktop:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['Color Spread']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>
        {/if}

		{#if $squigStore.token.token.metadata.tokenID == 7744}
			<div
				in:fly={{ y: 40, delay: 250, duration: 400 }}
				class="stats statBlock statBlockHover bg-violet-300 h-full place-items-stretch cursor-pointer"
			>
				<label
					for="my-modal-4"
					class="modal-button bg-transparent border-transparent place-self-stretch	
        text-white text-sm cursor-pointer bg-gradient-to-r from-green-300 to-purple-400"
				>
					<div class="stat-title attyTitle cursor-pointer invisible">About</div>
					<div class="stat-value attyText text-xs desktop:text-base text-stone-700">Gm, anon.</div>
				</label>
			</div>
		{/if}
	</div>
{/if}
