import DataFrame from 'dataframe-js';

//Function that takes in "AttributeTitle" and spits out tokenID (xyz)
export const getSquigByAttribute = async (atty, attyValue) => {
	let tokenID = '42069';
	if (atty == 'End Color' || atty == 'Start Color') {
		return '7744';
	}
	if (atty == 'Segments') {
		attyValue = String(attyValue)
	}
	// Format atty to match DF header values
	switch (atty) {
		case 'Color Direction':
			atty = 'color_direction';
			break;
		case 'Steps Between':
			atty = 'steps_between';
			break;
		case 'Color Spread':
			atty = 'color_spread';
			break;
	}
	console.log('importing df...');

	let df = await DataFrame.fromCSV(
		'https://raw.githubusercontent.com/Squiggle7744/Squigs.xyz/main/src/lib/allSquigs.csv'
	);
	console.log('df successfully imported!', df.show(3));

	
	const selectedDF = df.select('token_id', atty);

	const selectedValuesDF = selectedDF.chain((row) => row.get(atty) === attyValue);
	selectedValuesDF.show(10);
	const filteredToken_id_df = selectedValuesDF.toArray('token_id');

	let totalLength = filteredToken_id_df.length;
	console.log('total length is... ', totalLength);
	//Generate RNG between 0 and length of DF
	let randomIndex = Math.floor(Math.random() * totalLength);
	console.log("random index we're choosing is... ", randomIndex);

	tokenID = filteredToken_id_df[randomIndex];
	console.log('tokenID is... ', tokenID);

	return tokenID;
};