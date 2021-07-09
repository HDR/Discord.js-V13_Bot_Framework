const constants = require('../constants')


module.exports = {
    name: 'message', //name is the actual slash command used in discord, this can be anything without spaces.
    description: 'send a message as the bot', //description is the command description as shown in discord.
    options: [ //options are used to register subcommands, these are optional and can be left empty.
        {
            //See https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype if you want to explore command options
            "name": "string",
            "description": "String you want to send",
            "type": 3,
            "required": true
        }
    ],

    //This is the main function in the command, and it gets fired whenever a slash command matching the name above gets fired.
    execute: function (interaction) {
        //In this case we reply with a string, it is also possible to use text to speech and embeds as a reply to a slash command.
        interaction.reply(interaction.options.get('string').value).then()
    }
}