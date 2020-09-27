require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const optionChars = require('../util/regionalIndicatorCharacters');

module.exports = {
	name: 'poll',
	triggers: ['poll'],
	description: 'Ask a polling question. Vote by emoji reaction',
	usage:
		'To ask a yes/no poll wrap your question around double quotes.\nE.g. !poll "Yes or No?"\nTo ask a multiple choice question wrap your question around double quotes and the subsequent choices in double quotes as well.\nE.g. !poll "What toppings do you want on the pizza?" "Mushrooms" "Black Olives" "Bacon" "Peppers" "Onions"\n Note: Multiple choice polls have a limit of 5 options.',
	handler: (message) => {
		let args = message.content.match(/"(.+?)"/g);

		const executePoll = () => {
			if (args) {
				// Yes/No question
				if (args.length === 1) {
					const question = args[0].replace(/"/g, '');
					const filter = (reaction) => {
						return ['👍', '👎', '🤷'].includes(reaction.emoji.name);
					};

					return message.channel
						.send(`${question}`)
						.then(async (msg) => {
							await msg.react('👍');
							await msg.react('👎');
							await msg.react('🤷');

							msg
								.awaitReactions(filter, { time: 1800000 })
								.then((collected) => {
									// Collect all of the reactions
									const reactions = collected.array();

									// Collect the channel's reactions
									const channelReactions = {
										yes: reactions.filter((react) => react.emoji.name === '👍')
											.length,
										no: reactions.filter((react) => react.emoji.name === '👎')
											.length,
										undecided: reactions.filter(
											(react) => react.emoji.name === '🤷',
										).length,
									};

									// Logging results to the server
									console.log(`${question}: `, channelReactions);

									const embed = new MessageEmbed()
										.setTitle('Here are the results of the poll')
										.setDescription(`${question}`);

									for (const tally in channelReactions) {
										embed.addField(tally, channelReactions[tally], false);
									}

									msg.channel.send(embed);
								})
								.catch(() => console.error);
						})
						.catch(() => console.error);
				}
				// Multiple choice question
				else {
					args = args.map((arg) => arg.replace(/"/g, ''));
					const question = args[0];
					const pollOptions = args.slice(1);
					const numberOfOptions = args.length - 1;
					const filter = (reaction) => {
						return [...optionChars].includes(reaction.emoji.name);
					};

					// Generates a string for the bot to display
					const generateOptions = (options) => {
						const output = [];
						options.forEach((option, index) => {
							output.push(`${optionChars[index]} ${option}  `);
						});
						return output.join('');
					};

					// Check if the length of questions exceeds 5
					if (numberOfOptions > 5) {
						return message.channel.send(
							`${message.author}, polls are limited to 5 options`,
						);
					}
					else {
						return message.channel
							.send(`${question}\n\n${generateOptions(pollOptions)}`)
							.then(async (msg) => {
								for (let i = 0; i < numberOfOptions; i++) {
									await msg.react(optionChars[i]);
								}

								msg
									.awaitReactions(filter, { time: 6000 })
									.then((collected) => {
										// Collect all of the reactions
										const reactions = collected.array();

										// Collect the channel's reactions
										const channelReactions = {};
										pollOptions.forEach((option, index) => {
											channelReactions[option] = reactions.filter(
												(react) => react.emoji.name === optionChars[index],
											).length;
										});

										// Logging results to the server
										console.log(`${question}: `, channelReactions);

										const embed = new MessageEmbed()
											.setTitle('Here are the results of the poll')
											.setDescription(`${question}`);

										for (const tally in channelReactions) {
											embed.addField(tally, channelReactions[tally], false);
										}

										msg.channel.send(embed);
									})
									.catch(() => console.error);
							})
							.catch(() => console.error);
					}
				}
			}
			else {
				return message.channel.send(
					'Please provide a question. Invoke the !help command if you would like a usage guide.',
				);
			}
		};

		// Only run the command if it's invoked in the #polls channel or #🧪testing channel
		message.channel.id !== process.env.POLL_CHANNEL_ID &&
		message.channel.id !== process.env.TESTING_CHANNEL_ID
			? message.channel.send(
				'You may only invoke the `!polls` command in the #poll channel',
			)
			: executePoll();
	},
};