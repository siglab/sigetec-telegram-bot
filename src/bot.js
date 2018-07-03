#!/usr/bin/env node
/**
  * Created by: Julian Rodriguez
  * Description: Telegram bot main application. Bot commands receiver.
  *
*/
'use strict';

// Dependencies load
const TelegramBot = require('node-telegram-bot-api');
const nodemailer = require('nodemailer');
const enUsLang = require('./translations/en-us.js');
const esLang = require('./translations/es.js');
const config = require('./config/projectConfig.js');

// Variable initialization
const token = config.projectConfig.botToken;
const bot = new TelegramBot(token, {polling: true});
global.languageBase = {
	'en-us': enUsLang.translations,
	'es': esLang.translations
};
global.usersLog = {};

// Helper functions load
const welcome = require('./helpers/welcome.js');
const patents = require('./helpers/getPatents.js');
const details = require('./helpers/getDetails.js');
const attachments = require('./helpers/getAttachments.js');

// Bot commands receiver
bot.on('message', (msg) => {
	let messageLang = 'en-us';
	if (msg.from.language_code && msg.from.language_code == 'es')	messageLang =  msg.from.language_code;
	if (!msg.text) {
		bot.sendMessage(msg.chat.id,languageBase[messageLang].error1 + ' ' + msg.from.first_name);
	}else{
		switch(true) {
			case (msg.text.toString().toLowerCase().indexOf('/start') == 0):
				welcome.startMessage(bot, msg, messageLang);
				break;
			case (msg.text.toString().toLowerCase().indexOf('/help') == 0):
				break;
			case (msg.text.toString().toLowerCase().indexOf('/1') == 0):
				patents.getLocalPatents(bot,msg, messageLang, true);
				break;
			case (msg.text.toString().toLowerCase().indexOf('/2') == 0):
				patents.getInternationalPatents(bot, msg, messageLang, true);
				break;
			case (msg.text.toString().toLowerCase().indexOf('/3') == 0):
				patents.getPatentsPerCountry(bot, msg, messageLang, true);
				break;
			case (msg.text.toString().toLowerCase().indexOf('/login') == 0):
				bot.sendMessage(msg.chat.id, 'This feature is not working yet.', {
		    	"reply_markup": {
		    	  "remove_keyboard": true,
		    	}
		    });
				break;
			case (msg.text.toString().toLowerCase().indexOf('/ldetails') == 0):
				details.getPatentsDetails(bot, msg, messageLang, patents.getLocalPatents, '/ldetails', 'COL');
				break;
			case (msg.text.toString().toLowerCase().indexOf('/idetails') == 0):
				details.getPatentsDetails(bot, msg, messageLang, patents.getInternationalPatents, '/idetails');
				break;
			case (msg.text.toString().toLowerCase().indexOf('/show') == 0):
				details.getPatentDetailsPerCountry(bot, msg, messageLang);
				break;
			case (msg.text.toString().toLowerCase().indexOf('/download') == 0):
				attachments.file(bot, msg, messageLang);
				break;
			case (msg.text.toString().toLowerCase().indexOf('no') == 0):
				bot.sendMessage(msg.chat.id, 'Ok', {
		    	"reply_markup": {
		    	  "remove_keyboard": true,
		    	}
		    });
				break;
			default:
				bot.sendMessage(msg.chat.id, languageBase[messageLang].default, {
				 	"reply_markup": {
				 	  "remove_keyboard": true,
				 	}
				});
				break;
		};
	}
});