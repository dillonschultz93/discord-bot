require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

const commands = require('./commands/index');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', (message) => {
	if (message.content[0] === '!') {
		const command = message.content.split(' ')[0].substr(1);
		commands.handle(command, message);
	}
});

client.login(process.env.TOKEN);
