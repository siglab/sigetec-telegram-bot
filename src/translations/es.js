// Bot words in spanish language
let translations = {
	attachmentCaption: 'Documento adjunto a la patente: ',
	attachmentError: 'No es posible obtener el archivo adjunto en este momento. Por favor inténtelo de nuevo más tarde.',
	attachmentNotFound: ['El resultado anterior no tiene ninguna patente con el id ', ' y un documento adjunto.'],
	attachmentWarning: 'Usted debe realizar una búsqueda primero para poder utilizar este comando.',
	cmdError: 'Hay un error en el comando. Por favor revise el comando ingresado e inténtelo de nuevo.',
	default: 'No reconozco el comando, por favor utilice /help para conocer los comandos disponibles',
	endprocess: 'Esos son todos los detalles de las petentes encontradas.',
	error1: 'Por favor, no envíes fotos o archivos, no puedo hacer nada con ellos',
	error2: 'No puedo obtener las patantes en este momento. Por favor intenta de nuevo más tarde',
	foundPatentsAttachment: 'Adjunto: ',
	foundPatentsCountry: 'País: ',
	foundPatentsDescription: 'Descripción: ',
	foundPatentsDetails: 'Detalles de patentes encontradas: ',
	foundPatentsPerCountry: ['Patentes encontradas registradas en ', 'Para más detalles acerca de las patentes encontradas para este país use el comando '],
	foundPatentsResearcher: 'Investigador principal: ',
	help: '',
	hi: 'Hola',
	internationalPatentsOpts: ['/idetails Si', 'No'],
	internationalPatentsQuestion: '¿Desea conocer más acerca de las patentes encontradas?',
	localPatentsOpts: ['/ldetails Si', 'No'],
	localPatentsQuestion: '¿Desea conocer más acerca de las patentes encontradas?',
	numberOfPatents: 'Número de patentes encontradas: ',
	noPatentsFound: 'No se encontraron patentes para el país del acrónimo dado.',
	options: ['/1. Número de patentes registradas localmente', '/2. Número de patentes registradas internacionalmente', '/3. Lista de paises donde hay al menos una patente registrada', '/login Iniciar sesión'],
	preprocess: 'Estoy procesando su solicitud. Esto podría tartar un momento.',
	welcome: 'Soy un robot creado para responder algunas de tus consultas a la bases de datos del proyecto SIGETec. Cómo puedo ayudarte? \n'
};

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