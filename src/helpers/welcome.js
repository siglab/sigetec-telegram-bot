/**
  * Created by: Julian Rodriguez
  * Created on: 19/06/2018
  * Description: Welcome message
  *
*/
/**
  * Created by: Julian Rodriguez
  * Description: Welcome message builder
  * @param  Object bot
  * @param  JSON msg
  * @param  string messageLang
  * @return void
*/
function startMessage(bot, msg, messageLang){
	const message = languageBase[messageLang].hi + ' ' + msg.from.first_name + '! ' + languageBase[messageLang].welcome;
	var keyboardOpts = [];
	for (var i = 0; i < (languageBase[messageLang].options).length; i++) {
		var optionsRow = [];
		optionsRow.push(languageBase[messageLang].options[i]);
		if (i+1 < (languageBase[messageLang].options).length) optionsRow.push(languageBase[messageLang].options[i+1]);
		keyboardOpts.push(optionsRow);
		i = i+1;
	};
	bot.sendMessage(msg.chat.id, message, {
		"reply_markup": {
			"one_time_keyboard": true,
			"resize_keyboard": true,
		  "keyboard": keyboardOpts
		}
	});
}

//Module exportation
module.exports = {
  startMessage: startMessage
};