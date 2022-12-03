const he = require('he');

const removeHTML = input => {
  return he.decode(input)
	.replace(/^<p>/, '') // If the string starts with <p>, don't do anything
	.replace(/<p>/g, '\n\n') // Replace all other <p> with a new line
	.replace(/<\/p>/g, '\n\n') // Replace all </p> with a new line
	.replace(/<\/?[^>]+(>|$)/g, '')  // Remove all other html tags
	;
};

export { removeHTML, };
