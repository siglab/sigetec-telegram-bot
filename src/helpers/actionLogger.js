/**
  * Created by: Julian Rodriguez
  * Created on: 19/06/2018
  * Description: Log user actions module.
  *
*/

/**
  * Created by: Julian Rodriguez
  * Description: Log user commands in a global variable
  * @param  string username
  * @param  JSON result
  * @param  string command
  * @return void
*/
function logUserAction(username, result, command){
	if (!usersLog[username]) usersLog[username]={};
	if (typeof result != 'undefined' && result){
		usersLog[username].lastResult = result;
	}else{
		delete usersLog[username].lastResult;
	}
	usersLog[username].previousCmd=command;
}

//Module exportation
module.exports = {
  log: logUserAction
};