/**
  * Created by: Julian Rodriguez
  * Created on: 19/06/2018
  * Description: Get patents and all of its variations helper functions module.
  *
*/
// Dependencies load
const request = require('request-promise');
const config = require('../config/projectConfig.js');
const logger = require('./actionLogger.js');

/**
  * Created by: Julian Rodriguez
  * Description: Get all patents data from a database.
  * @param  Object bot
  * @param  integer chatId
  * @param  string messageLang
  * @return Promise (all patents data or error message)
*/
function getPatents (bot, chatId, messageLang){
	var requestOpts = {
		uri: config.projectConfig.dbURI,
		headers: {
			'User-Agent': 'Request-Promise'
		},
		json: true
	};
	return new Promise (
		resolve => {
			request(requestOpts)
				.then(function (data) {
					resolve(data);
				})
				.catch(function (err) {
					// console.log(err);
					const message = languageBase[messageLang].error2;
					bot.sendMessage(chatId,message);
				});
		}
	)
};

/**
  * Created by: Julian Rodriguez
  * Description: Get all patents data registered in COL.
  * @param  Object bot
  * @param  JSON msg
  * @param  string messageLang
  * @param  boolean respond
  * @return void
*/
async function getLocalPatents(bot, msg, messageLang, respond){
	if (respond) {
		bot.sendMessage(msg.chat.id, languageBase[messageLang].preprocess, {
		 	"reply_markup": {
		 	  "remove_keyboard": true,
		 	}
		});
	};
	var patents = await getPatents(bot, msg.chat.id, messageLang);
	let result = {
		COL: []
	};
	if (patents) {
		let localPatents = 0;
		const dbKeys = Object.keys(patents);
		for (var k = 0; k < dbKeys.length; k++) {
			if (patents[dbKeys[k]].country && (patents[dbKeys[k]].country).toString().toLowerCase() == 'col'){
				localPatents++;
				result.COL.push(patents[dbKeys[k]]);
			} 
		};
		if (respond) {
			var message = languageBase[messageLang].numberOfPatents + localPatents + '.';
			if (localPatents > 0) {
				message = message + '\n' + languageBase[messageLang].localPatentsQuestion;
				var keyboardOpts = [];
				for (var j = 0; j < (languageBase[messageLang].localPatentsOpts).length; j++) {
					var optionsRow = [];
					var optStr = languageBase[messageLang].localPatentsOpts[j];
					optionsRow.push(optStr);
					keyboardOpts.push(optionsRow);
					message = message + '\n' + optStr;
					if (j+1 < (languageBase[messageLang].localPatentsOpts).length) {
						optStr = languageBase[messageLang].localPatentsOpts[j+1];
						optionsRow = [];
						optionsRow.push(optStr);
						keyboardOpts.push(optionsRow);
						message = message + '\n' + optStr;
					}
					j = j+1;
				}
				bot.sendMessage(msg.chat.id, message, {
					"reply_markup": {
						"one_time_keyboard": true,
						"resize_keyboard": true,
						"keyboard": keyboardOpts
					}
				});
			}else{
				bot.sendMessage(msg.chat.id,message);
			}
		}
	}else{
		var message = languageBase[messageLang].error2;
		bot.sendMessage(msg.chat.id,message);
	}
	logger.log(msg.from.username, result, '/1');
}

/**
  * Created by: Julian Rodriguez
  * Description: Get all patents data not registered in COL.
  * @param  Object bot
  * @param  JSON msg
  * @param  string messageLang
  * @param  boolean respond
  * @return void
*/
async function getInternationalPatents(bot, msg, messageLang, respond){
	if (respond) {
		bot.sendMessage(msg.chat.id, languageBase[messageLang].preprocess, {
		 	"reply_markup": {
		 	  "remove_keyboard": true,
		 	}
		});
	};
	var patents = await getPatents(bot, msg.chat.id, messageLang);
	let result = {};
	if (patents) {
		let internationalPatents = 0;
		const dbKeys = Object.keys(patents);
		for (var k = 0; k < dbKeys.length; k++) {
			if (patents[dbKeys[k]].country && (patents[dbKeys[k]].country).toString().toLowerCase() != 'col'){
				internationalPatents++;
				if (!result[patents[dbKeys[k]].country]) result[patents[dbKeys[k]].country] = [];
				result[patents[dbKeys[k]].country].push(patents[dbKeys[k]]);
			} 
		};
		if (respond) {
			var message = languageBase[messageLang].numberOfPatents + internationalPatents + '.';
			if (internationalPatents > 0) {
				message = message + '\n' + languageBase[messageLang].internationalPatentsQuestion;
				var keyboardOpts = [];
				for (var j = 0; j < (languageBase[messageLang].internationalPatentsOpts).length; j++) {
					var optionsRow = [];
					var optStr = languageBase[messageLang].internationalPatentsOpts[j];
					optionsRow.push(optStr);
					keyboardOpts.push(optionsRow);
					message = message + '\n' + optStr;
					if (j+1 < (languageBase[messageLang].internationalPatentsOpts).length) {
						optStr = languageBase[messageLang].internationalPatentsOpts[j+1];
						optionsRow = [];
						optionsRow.push(optStr);
						keyboardOpts.push(optionsRow);
						message = message + '\n' + optStr;
					}
					j = j+1;
				}
				bot.sendMessage(msg.chat.id, message, {
					"reply_markup": {
						"one_time_keyboard": true,
						"resize_keyboard": true,
						"keyboard": keyboardOpts
					}
				});
			}else{
				bot.sendMessage(msg.chat.id,message);
			}
		}
	}else{
		var message = languageBase[messageLang].error2;
		bot.sendMessage(msg.chat.id,message);
	}
	logger.log(msg.from.username, result, '/2');
}

/**
  * Created by: Julian Rodriguez
  * Description: Get all patents data for each country in database.
  * @param  Object bot
  * @param  JSON msg
  * @param  string messageLang
  * @param  boolean respond
  * @return void
*/
async function getPatentsPerCountry(bot, msg, messageLang, respond){
	if (respond) {
		bot.sendMessage(msg.chat.id, languageBase[messageLang].preprocess, {
		 	"reply_markup": {
		 	  "remove_keyboard": true,
		 	}
		});
	};
	var patents = await getPatents(bot, msg.chat.id, messageLang);
	let result = {
		UNK: []
	};
	if (patents) {
		const dbKeys = Object.keys(patents);
		for (var k = 0; k < dbKeys.length; k++) {
			if (patents[dbKeys[k]].country){
				if (result[patents[dbKeys[k]].country]) {
					result[patents[dbKeys[k]].country].push(patents[dbKeys[k]]);
				} else {
					result[patents[dbKeys[k]].country] = [];
					result[patents[dbKeys[k]].country].push(patents[dbKeys[k]]);
				}
			} else {
				result.UNK.push(patents[dbKeys[k]]);
			}
		};
		if (respond) {
			const countries = Object.keys(result);
			var message = '';
			for (var i = 0; i < countries.length; i++) {
				message = message + '\n*' + languageBase[messageLang].foundPatentsPerCountry[0] + countries[i] + ': *' + result[countries[i]].length + '\n'
									+ languageBase[messageLang].foundPatentsPerCountry[1]
									+ '/show' + countries[i];
			}
			bot.sendMessage(msg.chat.id, message, {
				"parse_mode": 'Markdown'
			});
		}
	}else{
		var message = languageBase[messageLang].error2;
		bot.sendMessage(msg.chat.id,message);
	}
	logger.log(msg.from.username, result, '/3');
}

//Module exportation
module.exports = {
  getLocalPatents: getLocalPatents,
  getInternationalPatents: getInternationalPatents,
  getPatentsPerCountry: getPatentsPerCountry
};