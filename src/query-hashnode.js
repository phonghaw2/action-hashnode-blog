const fetch           = require( "node-fetch" );
const helpers         = require( './helpers' );
const API_URL         = 'https://gql.hashnode.com/',
	  DEFAULT_HEADERS = {
		  'Content-type': 'application/json',
	  };

async function query_api( username = false ) {
	const query       = `{
		publication(host: "phonghaw2coder.hashnode.dev") {
			posts(first: 5) {
				edges {
				node {
					url
					title
				}
				}
			}
			}
	}`;
	const result      = await fetch( API_URL, {
		method: 'POST',
		headers: DEFAULT_HEADERS,
		body: JSON.stringify( { query } ),
	} );
	const ApiResponse = await result.json();

	return ApiResponse;
}

module.exports = async function( username ) {
	let results = await query_api( username );
	return results;
};
