import { gql } from 'graphql-request';
import { GraphQLClient } from 'graphql-request';
import { ZORA_API_KEY } from '$env/static/private';
import { getSquigByAttribute } from '$lib/relatedSquigFetcher'


export const client = new GraphQLClient('https://api.zora.co/graphql', {
    "X-API-KEY": ZORA_API_KEY
})

const attArray = [
	'Type',
	'Spectrum',
	'Color Direction',
	'Height',
	'Segments',
	'Steps Between',
	'Start Color',
	'End Color',
	'Color Spread'
];

//get squig metadata from Zora, default returns random squig
export const load = async ({ params }) => {
	const squigsMinted = 9675;

	try {
		let tokenId = params.slug;
		if (tokenId == undefined || tokenId > 9675 || tokenId < 0) {
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
    
			let reLinkIDs = {
				Type: '',
				Spectrum: '',
				'Color Direction': '',
				Height: '',
				Segments: '',
				'Steps Between': '',
				//CSV does not have below data yet. Replace when updated.
				'Start Color': '/',
				'End Color': '/',
				//CSV does not have above data yet. Replace when updated.
				'Color Spread': ''
			};

			for (let i = 0; i < attArray.length; i++) {
				let attTitle = attArray[i];
				let reLinkID = await getSquigByAttribute(
					attArray[i],
					squig.token.token.metadata.features[attArray[i]]
				);
				reLinkIDs[attTitle] = reLinkID;
			}

			squig.reLinkIDs = reLinkIDs;
		return squig;
	} catch (error) {
    console.log('throwing error')
	}
};
