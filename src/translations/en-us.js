// Bot words in english language
const translations = {
	attachmentCaption: 'Attached document to patent: ',
	attachmentError: 'It is not possible to reach the attached file at this moment. Please try again later.',
	attachmentNotFound: ['The previous search does not have any result with id ', ' and attached file.'],
	attachmentWarning: 'You must to do a search before in order to use this command',
	cmdError: 'There is an error in the provided command. Please chek the command and try it again.',
	default: 'I don\'t recognize the command. Type /help to know the available commands',
	endprocess: 'Those are all the details of the found patents. Use the / start command to start a new search.',
	error1: 'Please don\'t send files or photos, I can\'t do anything with them',
	error2: 'I can not get the patents at this moment. Please try again later',
	foundPatentsAttachment: 'Attachment: ',
	foundPatentsCountry: 'Country: ',
	foundPatentsDescription: 'Description: ',
	foundPatentsDetails: 'Found patents details: ',
	foundPatentsPerCountry: ['Patents found registered in ', 'For more details about the patents found for this country use the command '],
	foundPatentsResearcher: 'Main researcher: ',
	help: '',
	hi: 'Hi',
	internationalPatentsOpts: ['/idetails Yes', 'No'],
	internationalPatentsQuestion: '¿Do you want to know more about the found patents?',
	localPatentsOpts: ['/ldetails Yes', 'No'],
	localPatentsQuestion: '¿Do you want to know more about the found patents?',
	numberOfPatents: 'Number of found patents: ',
	noPatentsFound: 'No patents found for the given country acronym.',
	options: ['/1. Number of patents registered locally', '/2. Number of patents registered internationally', '/3. List of countries where there are at least one patent registered', '/login Log in'],
	preprocess: 'I am processing your request. This could take a while, please be patient...',
	welcome: 'I\'m a bot created to respond some of your SIGETec project database queries. How can I help you?'
}

function addOpts() {
	var commandOpts = '';
	for (var i = 0; i < translations.options.length; i++) {
		commandOpts = commandOpts + '\n' + translations.options[i];
	}
	translations.welcome = translations.welcome + commandOpts;
	translations.help = translations.help + commandOpts;
}

addOpts();

//Module exportation
module.exports = {
	translations: translations
};