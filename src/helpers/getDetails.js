/**
  * Created by: Julian Rodriguez
  * Created on: 19/06/2018
  * Description: Get patents details and all of its variations helper functions module.
  *
*/
// Dependencies load
const logger = require('./actionLogger.js');
const patents = require('./getPatents.js');

/**
  * Created by: Julian Rodriguez
  * Description: Get all patents data details from a previous result.
  * @param  Object bot
  * @param  JSON msg
  * @param  string messageLang
  * @param  function typeOfPatent
  * @param  string command
  * @param  string countryCode
  * @param  boolean respond
  * @return void
*/
async function getPatentsDetails(bot, msg, messageLang, typeOfPatent, command, countryCode=null, respond=true){
	if (respond) {
		bot.sendMessage(msg.chat.id, languageBase[messageLang].preprocess, {
		 	"reply_markup": {
		 	  "remove_keyboard": true,
		 	}
		});
	}
	var result = null;
	if (usersLog[msg.from.username] && usersLog[msg.from.username].lastResult && (usersLog[msg.from.username].previousCmd == '/1' || usersLog[msg.from.username].previousCmd == '/2' || usersLog[msg.from.username].previousCmd == '/3')) {
		if (countryCode && countryCode!=null) {
			var countries = [countryCode];
		}else{
			var countries = Object.keys(usersLog[msg.from.username].lastResult);
		}
		if (countries.length > 0) {
			var message = languageBase[messageLang].foundPatentsDetails;
			await bot.sendMessage(msg.chat.id,message);
			result = {};
			var sentMessages = 0;
			var totalMessages = 0;
			var counter = 0;
			for (var i = 0; i < countries.length; i++) {
				totalMessages = totalMessages + usersLog[msg.from.username].lastResult[countries[i]].length;
				for (var l = 0; l < usersLog[msg.from.username].lastResult[countries[i]].length; l++) {
					counter ++;
					message = '*' + languageBase[messageLang].foundPatentsDescription + '*' + usersLog[msg.from.username].lastResult[countries[i]][l].description + '\n'
						+ '*' + languageBase[messageLang].foundPatentsCountry + '*' + usersLog[msg.from.username].lastResult[countries[i]][l].country + '\n'
						+ '*' + languageBase[messageLang].foundPatentsResearcher + '*' + usersLog[msg.from.username].lastResult[countries[i]][l].principal_researcher + '\n';
					
					if (usersLog[msg.from.username].lastResult[countries[i]][l].documents) {
						result[counter] = {
							desc: usersLog[msg.from.username].lastResult[countries[i]][l].description,
							attachment: usersLog[msg.from.username].lastResult[countries[i]][l].documents[0].url
						};
						message = message + '*' + languageBase[messageLang].foundPatentsAttachment + '*' + '/download' + counter;
					}

					bot.sendMessage(msg.chat.id, message, {
						"parse_mode": 'Markdown'
					}).then(function(){
						sentMessages ++;
						if (sentMessages == totalMessages) {
							bot.sendMessage(msg.chat.id, languageBase[messageLang].endprocess);
						}
					});
				};
			}
			result = [result];
		}else{
			var numberOfPatents = 0;
			var message = languageBase[messageLang].numberOfPatents + numberOfPatents + '.';
			bot.sendMessage(msg.chat.id,message);
		}
		logger.log(msg.from.username, result, command);
	}else{
		await typeOfPatent(bot, msg, messageLang, false);
		getPatentsDetails(bot, msg, messageLang, typeOfPatent, command, countryCode, false);
	}
}

/**
  * Created by: Julian Rodriguez
  * Description: Get all patents data details from a given country acronym.
  * @param  Object bot
  * @param  JSON msg
  * @param  string messageLang
  * @return void
*/
async function getPatentDetailsPerCountry(bot, msg, messageLang){
	var country = msg.text.toString().toLowerCase().replace('/show', '').toUpperCase();
	if (country && typeof country != 'undefined') {
		if (usersLog[msg.from.username] && usersLog[msg.from.username].lastResult && usersLog[msg.from.username].previousCmd == '/3') {
			try{
				if (usersLog[msg.from.username].lastResult[country]) {
					getPatentsDetails(bot, msg, messageLang, patents.getPatentsPerCountry, '/show', country, false);
				}else{
					var message = languageBase[messageLang].noPatentsFound;
					bot.sendMessage(msg.chat.id,message);
				}
			}catch(e){
				console.log(e);
				bot.sendMessage(msg.chat.id,languageBase[messageLang].attachmentError);
			}
		} else {
			bot.sendMessage(msg.chat.id, languageBase[messageLang].preprocess, {
			 	"reply_markup": {
			 	  "remove_keyboard": true,
			 	}
			});
			await patents.getPatentsPerCountry(bot, msg, messageLang, false);
			getPatentDetailsPerCountry(bot, msg, messageLang);
		}
	} else {
		bot.sendMessage(msg.chat.id,languageBase[messageLang].cmdError);
	} 
}

//Module exportation
module.exports = {
  getPatentsDetails: getPatentsDetails,
  getPatentDetailsPerCountry: getPatentDetailsPerCountry
};