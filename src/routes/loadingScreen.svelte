<script>
	import logo from '$lib/assets/logo.gif';
	import { fade } from 'svelte/transition';
	import { quadIn } from 'svelte/easing';

    let loadingOver = false;

    
	setTimeout(() => {
		loadingOver = true;
	}, '1000');
</script>

{#if loadingOver == false}
	<div out:fade={{ duration: 1000, easing: quadIn }} class="fixed z-50 h-full w-full bg-stone-900 ">
		<img
			out:fade={{ duration: 500, easing: quadIn }}
			alt="7744"
			src={logo}
			width="64"
			class="fixed z-20 top-1/2 left-1/2 -ml-6 -mt-6"
		/>
	</div>
{/if}