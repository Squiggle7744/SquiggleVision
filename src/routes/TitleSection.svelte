<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let firstLoad = false;
	export let squigsMinted
	export let squigID;

	onMount(() => {
		firstLoad = true;
	});

	function rnjesus() {
		squigID = Math.floor(Math.random() * squigsMinted)
	}
</script>

{#if firstLoad == true}
	<h1
		in:fly={{ x: -40, delay: 1850, duration: 400 }}
		class="text-3xl text-start text-stone-200
                        bg-stone-800 font-darkGrotBlack
                        tracking-wide laptop:text-4xl desktop:text-6xl"
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
                            laptop:w-3/4 desktop:w-1/2 laptop:text-2xl desktop:text-3xl	
                            font-darkGrot text-center
                            hover:bg-stone-900 hover:text-stone-700"
			/>
			<button
				in:fly={{ x: 30, delay: 2500, duration: 400 }}
				on:click={rnjesus}
				type="button"
				class="btn btn-ghost font-darkGrotBlack bg-stone-900 laptop:mt-2
                    laptop:text-xl desktop:text-2xl laptop:w-1/2 desktop:w-1/4"
				>🎲</button
			>
		</span>
	</h1>
{/if}

<style>
	/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>