const { MessageEmbed } = require('discord.js');

// require all commands
const hello = require('./hello');
const uptime = require('./uptime');
const roll = require('./roll');
const reset = require('./reset');
const poll = require('./poll');

const rawCommands = [hello, uptime, roll, reset, poll];
// Setting up the handlers for each command.
const commands = [...rawCommands].reduce((all, command) => {
	command.triggers.forEach((trigger) => (all[trigger] = command.handler));

	return all;
}, {});

// Setting up the descriptions for all of the commands.
const descriptions = new MessageEmbed()
	.setTitle('📄 List of Valid Commands')
	.setDescription('Here is a list of valid commands that Mímameiðr Bot will take');

rawCommands.forEach(command => {
	descriptions.addField(
		`!${command.triggers.join(' | !')}`,
		`${command.description}\n${command.usage ? '**Usage:** ' + command.usage : ''}`,
		false,
	);
});

const showAllCommands = (message) => {
	return message.channel.send(descriptions);
};

commands['commands'] = showAllCommands;
commands['help'] = showAllCommands;

module.exports = {
	handle: (command, message) => {
		command && commands[command] ? commands[command](message) : null;
	},
};
