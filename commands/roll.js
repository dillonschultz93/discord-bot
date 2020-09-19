const rollDice = (max) => {
	return 1 + Math.floor(Math.random() * max);
};

module.exports = {
	name: 'roll',
	triggers: ['roll'],
	description: 'Roll a dice between d2-d20',
	handler: (message) => {
		const args = message.content.match(/d{1}\d+/g);

		if (args) {
			const num = Number(args[0].substr(1));
			if (num > 1 && num <= 20) {
				return message.channel.send(`🎲 ${rollDice(num)}`);
			}
			else {
				return message.channel.send('Valid dice rolls are d2 - d20');
			}
		}
		else {
<<<<<<< HEAD
			return message.channel.send('Please specify a dice. Valid dice are d2 - d20');
=======
			return message.channel.send('Please add a dice value (e.x. !roll d20)');
>>>>>>> main
		}
	},
};
