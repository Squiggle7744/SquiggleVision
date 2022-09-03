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
    <div class="justify-between text-left overflow-visible">
        
        <!-- Section Title -->
        <h2 transition:fly="{{ x: -40, delay: 2000, duration: 400 }}" class="subHeader">
            #{$squigStore.token.token.metadata.tokenID} Provenance
        </h2>

        <!-- Minter Label -->
        <p transition:fly="{{ x: -40, delay: 2000, duration: 400 }}" 
        class="text-lg font-darkGrot text-stone-200 mb-2">Minter 💎</p>
        
        <!-- Check for Minter ENS -->
        {#if dataLoad == true}

            <!-- Skeleton Loader -->
            {#if minterChecked == 0}
            <strong class="inline-flex items-center bg-stone-100 px-5 py-1.5 rounded-lg 
                tranHover">
                    <span class="text-[12px] font-medium">
                        <div class="skeletonText"></div>
                    </span>
                </strong>

            <!-- ENS Found -->
            {:else if minterChecked == 1}
                <a href="https://etherscan.io/address/{ENS.minterAddress}">
                    <strong class="inline-flex items-center bg-stone-100 px-5 py-1.5 rounded-lg 
                tranHover">
                    <span class="text-[12px] font-medium ">
                        <p in:fly="{{ y: 25, duration: 400 }}" 
                        class="delay-200 text-stone-800 baseUrl">
                        {ENS.minterAddress}</p>
                    </span>
                </strong>
                </a>

            <!-- No ENS found, display default 0x Address -->
            {:else if minterChecked == 2}
            <a href="https://etherscan.io/address/{$squigStore.token.token.mintInfo.toAddress}"
            class='relative flex transition '>
                <strong class="inline-flex items-center bg-stone-100 px-5 py-1.5 rounded-lg 
                tranHover">
                    <span class="text-[12px] font-medium ">
                        <p in:fly="{{ y: 25, duration: 400 }}" 
                        class="text-stone-800 baseUrl">
                        {$squigStore.token.token.mintInfo.toAddress.substring(0,15) + "..."}</p>
                    </span>
                </strong>
            </a>
            {/if}
        {/if}

        <!-- Owner Label -->
        <p transition:fly="{{ x: -40, delay: 2000, duration: 400 }}" 
        class="font-darkGrot text-stone-200  my-2">Owner 🙌</p>
        
        <!-- Check for Owner ENS -->
        {#if dataLoad == true}
        
            <!-- Skeleton Loader -->
            {#if ownerChecked == 0}
            <strong class="inline-flex items-center bg-stone-100 px-5 py-1.5 rounded-lg 
                tranHover">
                    <span class="text-[12px] font-medium ">
                        <div class="skeletonText"></div>
                    </span>
                </strong>

            <!-- ENS Found -->
            {:else if ownerChecked == 1}
            <a href="https://etherscan.io/address/{ENS.ownerAddress}">
                <strong class="inline-flex items-center bg-stone-100 px-5 py-1.5 rounded-lg 
                tranHover">
                    <span class="text-[12px] font-medium ">
                        <p in:fly="{{ y: 25, duration: 400 }}" 
                        class="text-stone-800 baseUrl">
                        {ENS.ownerAddress}</p>     
                    </span>
                </strong>
            </a>
            
            <!-- No ENS found, display default 0x Address -->
            {:else if ownerChecked == 2}
            <a href="https://etherscan.io/address/{$squigStore.token.token.owner}">
                <strong class="inline-flex items-center bg-stone-100 px-5 py-1.5 rounded-lg 
                tranHover">
                    <span class="text-[12px] font-medium ">
                        <p in:fly="{{ y: 25, duration: 400 }}" 
                        class="text-stone-800 baseUrl">
                        {$squigStore.token.token.owner.substring(0,15) + "..."}</p>
                    </span>
                </strong>
            </a>
            {/if}
        {/if}
    </div>
{/if}

