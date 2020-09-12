const { MessageAttachment } = require('discord.js');
const attachment = new MessageAttachment(
	'https://media.giphy.com/media/Nx0rz3jtxtEre/giphy.gif',
);

module.exports = {
	name: 'hello',
	triggers: ['hello', 'hi'],
	description: 'Greet the bot',
	handler: (message) => {
		return message.channel.send(`${message.author}`, attachment);
	},
};
