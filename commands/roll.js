const rollDice = (max) => {
	return 1 + Math.floor(Math.random() * max);
};

module.exports = {
	name: 'roll',
	triggers: ['roll'],
	description: 'Roll a dice',
	example: '!roll d20',
	handler: (message) => {
		const args = message.content.match(/d{1}\d+/g);
		const num = Number(args[0].substr(1));

		if (args) {
			if (num > 1 && num <= 20) {
				return message.channel.send(`🎲 ${rollDice(num)}`);
			}
			else {
				return message.channel.send('Valid dice rolls are d2 - d20');
			}
		}
		else {
			return;
		}
	},
};