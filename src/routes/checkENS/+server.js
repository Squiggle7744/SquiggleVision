import { ethers } from 'ethers';
//import { env } from ''

export let refreshENS = async (minterAddress, ownerAddress) => {
    const provider = new ethers.providers.JsonRpcProvider(
        `https://mainnet.infura.io/v3/ea4b2d39a8c344dd9708a9f4e092998d`
    );

    let ENS = {
        minterAddress: await provider.lookupAddress(minterAddress),
        ownerAddress: await provider.lookupAddress(ownerAddress),
    }; 
    
    return ENS;
} 
