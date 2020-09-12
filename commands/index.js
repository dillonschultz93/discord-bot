// require all commands
const hello = require('./hello');
const uptime = require('./uptime');
const roll = require('./roll');

let descriptions = '';
// Setting up descriptions and usage details of each command.
const commands = [hello, uptime, roll].reduce((all, command) => {
	command.triggers.forEach((trigger) => (all[trigger] = command.handler));
	descriptions += `**${command.name}** - ${command.description}
Usage: ${command.triggers.map((trigger) => `!${trigger}`).join(' | ')} ${
	command.example || ''
}

	`;

	return all;
}, {});

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
