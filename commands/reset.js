const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');

module.exports = {
	name: 'reset',
	triggers: ['reset', 'restart', 'reboot'],
	description: 'Restarts the bot. This is command is reserved for the server admin',
	handler: (message) => {
		// Check if the message sender has the correct permissions
		const isAdmin = message.member.hasPermission('ADMINISTRATOR');

		if (isAdmin) {
			// Notify that the server is back
			const notify = async () => {
				await new Promise((resolve) =>
					setTimeout(() => {
						message.channel.send('I\'m back!');
						console.log(`${moment().format('LLL')}: Reboot complete`);
						resolve();
					}, 200),
				);
			};

			message.channel
				.send('Rebooting...')
				// Restarting the server
				.then(() => console.log(`${moment().format('LLL')}: Rebooting...`))
				.then(() => client.destroy())
				.then(() => client.login(process.env.TOKEN))
				.then(() => notify())
				.catch(console.error);
		}
		else {
			message.channel.send(`${message.author}, you do not have permission to run this command`);
		}
	},
};