/**
  * Created by: Julian Rodriguez
  * Created on: 19/06/2018
  * Description: Get patent attachment.
  *
*/

/**
  * Created by: Julian Rodriguez
  * Description: Get an attachment file from a given patent id from previous result.
  * @param  Object bot
  * @param  JSON msg
  * @param  string messageLang
  * @return void
*/
function getAttachment(bot, msg, messageLang) {
	var patentId = msg.text.toString().toLowerCase().replace('/download', '');
	if (patentId && typeof patentId != 'undefined') {
		if (usersLog[msg.from.username] && usersLog[msg.from.username].lastResult) {
			try{
				if (usersLog[msg.from.username].lastResult[0][patentId]) {
					bot.sendDocument(msg.chat.id, usersLog[msg.from.username].lastResult[0][patentId].attachment, {
						"caption": '*' + languageBase[messageLang].attachmentCaption + '* ' + usersLog[msg.from.username].lastResult[0][patentId].desc,
						"parse_mode": 'Markdown'
					});
				}else{
					var message = languageBase[messageLang].attachmentNotFound[0] + patentId + languageBase[messageLang].attachmentNotFound[1];
					bot.sendMessage(msg.chat.id,message);
				}
			}catch(e){
				console.log(e);
				bot.sendMessage(msg.chat.id,languageBase[messageLang].attachmentError);
			}
		} else {
			bot.sendMessage(msg.chat.id, languageBase[messageLang].attachmentWarning, {
				"parse_mode": 'Markdown'
			});
		}
	} else {
		bot.sendMessage(msg.chat.id,languageBase[messageLang].cmdError);
	} 
}

//Module exportation
module.exports = {
  file: getAttachment
};