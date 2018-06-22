# SIGETec Telegram Query Bot

A telegram bot built in Nodejs to answer some patents queries.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites 

In order to run this project you will need:

```
git
Nodejs v8+
Previously created telegram bot token (To learn more about telegram bots check https://core.telegram.org/bots)
A given database URL
```

### Installing

Clone this repo running the command:

```
git clone https://github.com/siglab/sigetec-telegram-bot.git
```

Get into src folder:

```
cd sigetec-telegram-bot/src
```

Install project depencencies:

```
npm install
```

### Project Configuration

Open the project config module at:

```
sigetec-telegram-bot/src/config/projectConfig.js
```

Modify the project config file using your telegram bot token and your given SIGETec db URL. Your config object should look something like:

```
const config = {
	botToken: '3455879:JJYtyhY-8-lW-nFGYUzi990dgfkL',
	dbURI: 'https://patents-repo.firebaseio.com/your-patents-repo.json'
} 
```

### Running the bot

To run the bot use nodejs command to execute the index.js file at src folder.

```
node sigetec-telegram-bot/src/index.js
```

## Deployment

No deployment instructions added yet.

## Authors

* **Julián Rodríguez** - *Initial work* - [felorodri](https://github.com/felorodri)

See also the list of [contributors](https://github.com/siglab/sigetec-telegram-bot/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details