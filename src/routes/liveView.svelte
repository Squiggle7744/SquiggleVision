<script>
    import { quadIn } from 'svelte/easing';
	import { fade } from 'svelte/transition';
    import { squigStore } from '$lib/squigStore.js';

</script>

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
