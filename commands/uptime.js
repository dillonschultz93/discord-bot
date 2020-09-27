require('dotenv').config();
const countdown = require('countdown');
const bootUpTime = new Date();
const moment = require('moment');

module.exports = {
	name: 'uptime',
	triggers: ['uptime', 'ut'],
	description: 'See how long the bot has been up',
	handler: (message) => {
		// Logging how long the server has been up
		console.log(`${moment().format('LLL')}: The server has been up for ${countdown(bootUpTime)}`);

		return message.channel.send(`${process.env.BOT_NAME} has been up for ${countdown(bootUpTime)}`);
	},
};