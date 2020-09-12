require('dotenv').config();
const countdown = require('countdown');
const bootUpTime = new Date();
const moment = require('moment');

module.exports = {
	name: 'uptime',
	triggers: ['uptime', 'ut'],
	description: 'See how long the bot has been up',
	handler: (message) => {
		return message.channel.send(`${process.env.BOT_NAME} has been up since ${moment().format('LLLL')} for a total of: ${countdown(bootUpTime)}`);
	},
};