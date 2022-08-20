import { ethers } from 'ethers';
import { INFURA_API_KEY } from '$env/static/private';

export let refreshENS = async (minterAddress, ownerAddress) => {
    const provider = new ethers.providers.JsonRpcProvider(
        `https://mainnet.infura.io/v3/${INFURA_API_KEY}`
    );

    let ENS = {
        minterAddress: await provider.lookupAddress(minterAddress),
        ownerAddress: await provider.lookupAddress(ownerAddress),
    }; 
    
    return ENS;
} 
