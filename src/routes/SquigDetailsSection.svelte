<script>
    import { fly } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { squigStore } from '$lib/squigStore.js'
    import { refreshENS } from './checkENS/+server'

    let minterChecked = 0;
    let ownerChecked = 0;
    let ready = false;
    let dataLoad = false; 
    let ENS 

    onMount(() => {
        ready = true
        setTimeout(() => dataLoad = true,2000)
    });

    async function refresh() {
        minterChecked = 0;
        ownerChecked = 0;
        ENS = await refreshENS($squigStore.token.token.mintInfo.toAddress,$squigStore.token.token.owner)
 
        if (ENS.minterAddress != null) {
            minterChecked = 1;
        } else {
            minterChecked = 2;
        }

        if (ENS.ownerAddress != null) {
            ownerChecked = 1;
        } else {
            ownerChecked = 2;
        }
    }

    $: refresh($squigStore.token.token.metadata.tokenID)

</script>


{#if ready == true}
    <div class="justify-between text-left overflow-hidden">
        
        <h2 transition:fly="{{ x: -40, delay: 2000, duration: 400 }}" class="text-3xl text-stone-200 py-5
            bg-stone-800 text-left font-darkGrot laptop:text-2xl">
            #{$squigStore.token.token.metadata.tokenID} Provenance
        </h2>
        <p transition:fly="{{ x: -40, delay: 2000, duration: 400 }}" class="text-lg font-darkGrot text-stone-300">Minted By:</p>
        
        
        {#if dataLoad == true}
            {#if minterChecked == 0}
                <div class="w-36 bg-gray-300 h-6 rounded-md animate-pulse opacity-10"></div>
            {:else if minterChecked == 1}
                <a href="https://etherscan.io/address/{ENS.minterAddress}">
                    <p in:fly="{{ y: 25, duration: 400 }}" 
                    class="delay-200 text-base font-darkGrot text-stone-400 hover:text-blue-300">
                    {ENS.minterAddress}</p>
                </a>
            {:else if minterChecked == 2}
                <a href="https://etherscan.io/address/{$squigStore.token.token.mintInfo.toAddress}">
                    <p in:fly="{{ y: 25, duration: 400 }}" 
                    class=" text-base font-darkGrot text-stone-400 hover:text-blue-300">
                    {$squigStore.token.token.mintInfo.toAddress.substring(0,15) + "..."}</p>
                </a>
            
            {/if}
        {/if}
        
        <p transition:fly="{{ x: -40, delay: 2000, duration: 400 }}" class="font-darkGrot text-stone-300">Owned By:</p>
        {#if dataLoad == true}
            {#if ownerChecked == 0}
            <div class="w-36 bg-gray-300 h-6 rounded-md animate-pulse opacity-10"></div>
            {:else if ownerChecked == 1}
            <a href="https://etherscan.io/address/{ENS.ownerAddress}">
                <p in:fly="{{ y: 25, duration: 400 }}" 
                class="text-base font-darkGrot text-stone-400 hover:text-blue-300">
                {ENS.ownerAddress}</p>     
            </a>
            {:else if ownerChecked == 2}
            <a href="https://etherscan.io/address/{$squigStore.token.token.owner}">
                <p in:fly="{{ y: 25, duration: 400 }}" 
                class="text-base font-darkGrot text-stone-400 hover:text-blue-300">
                {$squigStore.token.token.owner.substring(0,15) + "..."}</p>
            </a>
            {/if}
        {/if}
    </div>
{/if}