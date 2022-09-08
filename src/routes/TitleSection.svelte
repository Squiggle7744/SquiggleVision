<script>
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import dieSalute from '$lib/dieSalute.png'

	let firstLoad = false;
	export let squigsMinted
	export let squigID;
	export let isMobile;

	console.log(isMobile)

	onMount(() => {
		firstLoad = true;
	});

	function rnjesus() {
		squigID = Math.floor(Math.random() * squigsMinted)
	}
</script>

{#if firstLoad == true}
	<!-- Desktop Chromie Squiggle Title -->
	{#if isMobile == false}
	<h1
		in:fly={{ x: -40, delay: 1850, duration: 400 }} 
		class="text-3xl text-start text-stone-200 leading-none align-text-top		
                        bg-stone-800 font-darkGrotBlack -mt-4 mb-4
                         laptop:text-4xl desktop:text-6xl"
	>
		Chromie
		<br class='hidden WQHD:inline'> 
		Squiggle
		<br class='hidden WQHD:inline'> 
	</h1>
	{/if}

	<!-- Grid Section -->
		<div class="grid grid-cols-3 mobile:grid-cols-2 grid-rows-1
		font-darkGrotBlack font-black self-start mobile:mt-0 bg-stone-800 space-4">
		
		<!-- Mobile Chromie Squiggle Title -->
			{#if isMobile == true}
			<h1
				in:fly={{ x: -40, delay: 1850, duration: 400 }} 
				class="text-3xl text-start text-stone-200 leading-none align-text-top		
								bg-stone-800 font-darkGrotBlack p-4
								laptop:text-4xl desktop:text-6xl"
			>
				Chromie
				<br class='hidden WQHD:inline'> 
				Squiggle
				<br class='hidden WQHD:inline'> 
			</h1>
			{/if}

			

			<input
				in:fly={{ x: -30, delay: 2200, duration: 400 }}
				type="number"
				bind:value={squigID}
				id="newID"
				placeholder={squigID}
				class="input input-ghost col-span-2 text-lg mobile:col-span-1 input-md appearance-none	
                            text-stone-200 bg-stone-700 w-4/5 laptop:mt-2
                            laptop:w-full desktop:w-full laptop:text-xl desktop:text-3xl	
                            font-darkGrot text-center place-self-center	
                            hover:bg-stone-900 hover:text-stone-700"
			/>
			<!-- DieSalute Desktop Button -->
			{#if isMobile == false}
			<button 
			in:fly={{ x: 30, delay: 2500, duration: 400 }} 
			on:click={rnjesus}
			class='bottom-0 w-full'>
				<img src={dieSalute} alt='dieSalute' width=64 class='pl-4'>
			</button>
			{/if}
		</div>
{/if}

<!-- DieSalute Mobile Button -->
{#if isMobile == true}
<button 
in:fly={{ x: 30, delay: 2500, duration: 400 }} 
on:click={rnjesus}
class='bottom-0 right-0 z-50 fixed'>
	<img src={dieSalute} alt='dieSalute' width=64 class='p-2'>
</button>
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