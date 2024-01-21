const fetch           = require( "node-fetch" );
const helpers         = require( './helpers' );
const API_URL         = 'https://gql.hashnode.com/',
	  DEFAULT_HEADERS = {
		  'Content-type': 'application/json',
	  };

async function query_api( username = false) {
	const query       = `{
		user(username: "${username}"){
			posts(pageSize: 5 page: 1) {
				nodes {
					title
					url
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

	if( 0 === ApiResponse.data.user.posts.nodes.length ) {
		return false;
	}

	return ApiResponse.data.user.posts.nodes;
}

module.exports = async function( username ) {
	let results = await query_api( username );

	if ( false === results ) {
		return [];
	}

	return results;
};
