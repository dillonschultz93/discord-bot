require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

// Setting up a !ping command
client.on('message', (message) => {
	message.content === '!ping' ? message.channel.send('Pong') : null;
});

client.login(process.env.TOKEN);
