const constants = require('../constants')


module.exports = {
    name: 'helloworld', //name is the actual slash command used in discord, this can be anything without spaces.
    description: 'Replies with Hello World', //description is the command description as shown in discord.
    options: [ //options are used to register subcommands, these are optional and can be left empty.
        {
            //See https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype if you want to explore command options
            "name": "string",
            "description": "String you want to append to hello world",
            "type": 3,
            "required": true
        }
    ],
    choices: [], //Choices allow users to pick a pre-determined option, see https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptionchoice for choice options


    execute: function (channel, args, member, interaction) {
        //Reply to the interaction (slash command)
        constants.client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                //response types are not yet fully implemented, see https://discord.com/developers/docs/interactions/slash-commands#interaction-response-interactionresponsetype
                type: 4,
                data: {
                    //In this case we reply with a string, it is also possible to use tts and embeds as a reply to a slash command.
                    content: `Hello World ${args[0].value}`
                }
            }
        })
    }
}