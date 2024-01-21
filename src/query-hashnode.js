const fetch           = require( "node-fetch" );
const helpers         = require( './helpers' );
const API_URL         = 'https://gql.hashnode.com/',

async function query_api( blog_url, limit ) {
	const query       = `{
		publication(host: "${blog_url}") {
			posts(first: ${limit}) {
				edges {
				node {
					url
					title
					brief
					coverImage {
					url
					}
				}
				}
			}
			}
	}`;
	const result      = await fetch( API_URL, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify( { query } ),
	} );
	const ApiResponse = await result.json();

	return ApiResponse;
}

module.exports = async function( blog_url, limit ) {
	let results = await query_api( blog_url, limit );
	return results;
};
