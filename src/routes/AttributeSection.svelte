<script>
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
	<div
		in:fly={{ x: -20, delay: 2000, duration: 400 }}
		class="subHeader sticky"
	>
		Attributes
	</div>
{/if}

{#if ready == true}
	<div
		in:fly={{ y: 40, delay: 2200, duration: 400 }}
		class="grid grid-flow-row row-span-full items-center gap-3 desktop:grid-cols-2"
	>

		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle QHD:text-base text-xs">Type</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs "
					>
						{$squigStore.token.token.metadata.features.Type}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features.Type}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle text-xs QHD:text-base">Spectrum</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base"
					>
						{$squigStore.token.token.metadata.features.Spectrum}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features.Spectrum}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle text-xs QHD:text-base">Color Direction</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base"
					>
						{$squigStore.token.token.metadata.features['Color Direction']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['Color Direction']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

        {#if isMobile == false}
		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle text-xs QHD:text-base">Height</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base"
					>
						{$squigStore.token.token.metadata.features.Height}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features.Height}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle text-xs QHD:text-base">Segments</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base"
					>
						{$squigStore.token.token.metadata.features.Segments}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features.Segments}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle text-xs QHD:text-base">Steps Between</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base"
					>
						{$squigStore.token.token.metadata.features['Steps Between']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['Steps Between']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle text-xs QHD:text-base">Start Color</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base"
					>
						{$squigStore.token.token.metadata.features['Start Color']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['Start Color']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle text-xs QHD:text-base">End Color</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base"
					>
						{$squigStore.token.token.metadata.features['End Color']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
					>
						{$squigStore.token.token.metadata.features['End Color']}
					</div>
				{/if}
				<div class="stat-desc" />
			</div>
		</div>

		<div class="stats statBlock statBlockHover">
			<div class="stat py-3">
				<div class="stat-title attyTitle text-xs QHD:text-base">Color Spread</div>
				{#if reloadAttributes == 1}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base"
					>
						{$squigStore.token.token.metadata.features['Color Spread']}
					</div>
				{:else}
					<div
						in:fly={{ x: -20, duration: 400 }}
						class="stat-value attyText text-xs QHD:text-base opacity-0"
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

