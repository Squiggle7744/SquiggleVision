import { gql } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import { ZORA_API_KEY } from '$env/static/private';


export const client = new GraphQLClient('https://api.zora.co/graphql', {
    "X-API-KEY": ZORA_API_KEY
})


//get squig metadata from Zora, default returns random squig
export const load = async (tokenId) => {
	const squigsMinted = 9675;

	try {
		let tokenId;
		if (tokenId == undefined) {
			tokenId = Math.floor(Math.random() * squigsMinted);
		}
		const query = gql`
        query SquigLookup {
          token(token: {address: "0x059edd72cd353df5106d2b9cc5ab83a52287ac3a", 
          tokenId: "${tokenId}"}, 
          network: {chain: MAINNET, network: ETHEREUM}) {
            token {
              metadata
              owner
              mintInfo {
                toAddress
                mintContext {
                  blockTimestamp
                }
              }
            }
          }
        }        
    `;
    
		const squig = await client.request(query);
		return squig;
	} catch (error) {
    console.log('throwing error')
	}
};
