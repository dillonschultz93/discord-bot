# discord-bot

A Discord bot for a Discord server I own.

## Commands

### !hello | !hi

The bot will greet the user

### !uptime | !ut

The bot will output how long it has been booted up for

### !roll [d(n)]

The bot will output a random number based on the dice level. Valid dice levels are 2-20.

### !reset | !restart | !reboot

Restarts the bot. This is command is reserved for the server admin.

### !poll "<question>?" "<choices (optional)>"

Ask a polling question. Vote by emoji reaction
Usage: To ask a yes/no poll wrap your question around double quotes.
E.g. !poll "Yes or No?"
To ask a multiple choice question wrap your question around double quotes and the subsequent choices in double quotes as well.
E.g. !poll "What toppings do you want on the pizza?" "Mushrooms" "Black Olives" "Bacon" "Peppers" "Onions"
Note: Multiple choice polls have a limit of 5 options.