const query       = require( './query-hashnode' );
const render      = require( './display' );
const core        = require( '@actions/core' );
const fs          = require( "fs" );
const commitFile  = require( './commit-file' );

// most @actions toolkit packages have async methods
async function run() {
	try {
		const FILE     = core.getInput( 'FILE' );
		const STYLE    = core.getInput( 'STYLE' );
		const LIMIT    = core.getInput( 'LIMIT' );
		const BLOG_URL = core.getInput( 'BLOG_URL' );

		core.startGroup( 'Parsed Config' );
		core.info( `File			= ${FILE}` );
		core.info( `Output Style	= ${STYLE}` );
		core.info( `MAX Visisble	= ${LIMIT}` );
		core.endGroup();


		const results = await query( BLOG_URL, LIMIT );

		core.startGroup( 'Latest Posts' );
		core.info( JSON.stringify( results, null, 2 ) );
		core.endGroup();
		core.info( ' ' );

		const regex			= /^(<!--(?:\s|)HASHNODE_BLOG:(?:START|start)(?:\s|)-->)(?:\n|)([\s\S]*?)(?:\n|)(<!--(?:\s|)HASHNODE_BLOG:(?:END|end)(?:\s|)-->)$/gm;
		const file_path    	= `${process.env.GITHUB_WORKSPACE}/${FILE}`;
		const file_content 	= fs.readFileSync( file_path );

		//
		let output    = '';
		if (STYLE.toLowerCase().startsWith( 'list' )) {
			output = await render.list( results, STYLE );
		}
		else if(STYLE.toLowerCase().startsWith( 'blog' )) {
			output = await render.blog( results, STYLE );
		}


		const result = file_content.toString().replace( regex, `$1\n${output}\n$3` );

		fs.writeFileSync( file_path, result );

		await commitFile().catch( err => {
			core.error( err );
			core.info( err.stack );
			process.exit( err.code || -1 );
		} );

	} catch( error ) {
		core.setFailed( error.message );
	}
}

run();
