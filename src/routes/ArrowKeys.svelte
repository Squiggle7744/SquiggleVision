<script>
    import { squigStore } from '$lib/squigStore.js';

	let squigDown = () => $squigStore.token.token.metadata.tokenID--
	let squigUp = () => $squigStore.token.token.metadata.tokenID++
</script>

<button on:click={squigDown} class="button pl-5 absolute inset-y-0 left-0 rounded-lg z-10">
    <kbd class="kbd bg-stone-700 text-stone-200 text-lg drop-shadow-lg z-10 animate-bounce-left"
        >←</kbd
    >
</button>
<button on:click={squigUp} class="button pr-5 absolute rounded-lg inset-y-0 right-0 z-10">
    <kbd class="kbd bg-stone-700 text-stone-200 text-lg drop-shadow-lg animate-bounce-right"
        >→</kbd
    >
</button>


<style>
	@keyframes l-bounce {
		0%,
		100% {
			transform: translateX(25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: none;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}

	@keyframes r-bounce {
		0%,
		100% {
			transform: translateX(-25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: none;
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}
	.animate-bounce-left {
		animation: l-bounce 1s infinite;
	}
	.animate-bounce-right {
		animation: r-bounce 1s infinite;
	}
</style>