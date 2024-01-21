function atag( link, title, content ) {
	return ( link !== '' ) ? `<a href="${link}" title="${title}">${content}</a>` : content;
}

function imgtag( coverImage, link, title, align, width ) {
	width   = ( width !== '' ) ? `width="${width}"` : '';
	align   = ( width !== '' ) ? `align="${align}"` : '';
	let alt = ( title !== '' ) ? `alt="${title}"` : '';
	return ( src !== '' ) ? atag( link, title, `<img src="${coverImage.url}" ${alt} ${width} ${align} />` ) : '';
}

module.exports = {
	a: atag,
	img: imgtag,
	parseDate(date){
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
		const parsedData = new Date(date);
		return `${parsedData.getDate()} ${months[parsedData.getMonth()]} ${parsedData.getFullYear()}`
	}
};

