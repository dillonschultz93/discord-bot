const moment = require('moment');

module.exports = {
	name: 'hello',
	triggers: ['hello', 'hi'],
	description: 'Greet the bot',
	handler: (message) => {
		return message.channel.send(`${message.author}`, {
			files: [{
				attachment: __dirname + '/assets/hello-there.gif',
				name: 'hello-there.gif',
			}],
		})
			.then(console.log(`${moment().format('LLL')}: A greeting was sent to ${message.author}`))
			.catch(console.error);
	},
};
