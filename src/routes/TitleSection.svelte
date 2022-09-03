<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import dieSalute from '$lib/dieSalute.png'

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
		class="text-3xl text-start text-stone-200 leading-none align-text-top		
                        bg-stone-800 font-darkGrotBlack -mt-4
                         laptop:text-4xl desktop:text-6xl"
	>
		Chromie
		<br class='hidden WQHD:inline'> 
		Squiggle
		<br class='hidden WQHD:inline'> 
	</h1>

		<div class="grid grid-cols-2 grid-rows-1 font-darkGrotBlack font-black self-start mt-4">
			<input
				in:fly={{ x: -30, delay: 2200, duration: 400 }}
				type="number"
				bind:value={squigID}
				id="newID"
				placeholder={squigID}
				class="input input-ghost input-md appearance-none	
                            text-stone-400 bg-stone-700 laptop:mt-2
                            laptop:w-3/4 desktop:w-full laptop:text-2xl desktop:text-3xl	
                            font-darkGrot text-center
                            hover:bg-stone-900 hover:text-stone-700"
			/>
			<!-- <button
				in:fly={{ x: 30, delay: 2500, duration: 400 }}
				on:click={rnjesus}
				type="button"
				class="btn btn-ghost font-darkGrotBlack bg-stone-900 laptop:mt-2
                    laptop:text-xl desktop:text-2xl laptop:w-1/2 desktop:w-1/4"
				>🎲
			</button> -->
			<button 
			in:fly={{ x: 30, delay: 2500, duration: 400 }} 
			on:click={rnjesus}
			class='bottom-0 w-full'>
				<img src={dieSalute} alt='dieSalute' width=64 class='pl-4'>
			</button>
		</div>
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