module.exports = {
	name: 'hello',
	triggers: ['hello', 'hi'],
	description: 'Greet the bot',
	handler: (message) => {
		return message.channel.send({
			files: [{
				attachment: __dirname + '/assets/hello-there.gif',
				name: 'hello-there.gif',
			}],
		})
			.then(console.log('sent the greeting'))
			.catch(console.error);
	},
};
