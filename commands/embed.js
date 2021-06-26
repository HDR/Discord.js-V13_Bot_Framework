const constants = require('../constants') //Require constants so we can use the client object
const Discord = require("discord.js"); //Require discord so we can build embeds


module.exports = {
    name: 'embed', //name is the actual slash command used in discord, this can be anything without spaces.
    description: 'Embeds hello world into a message', //description is the command description as shown in discord.
    options: [ //options are used to register subcommands, these are optional and can be left empty.
        {
            //See https://discord.com/developers/docs/interactions/slash-commands#applicationcommandoptiontype if you want to explore command options
            "name": "string",
            "description": "String you want to append to hello world",
            "type": 3,
            "required": true
        }
    ],

    execute: function (interaction) {

        //Build the embed
        const Embed = new Discord.MessageEmbed
        Embed.addField('Message', `Hello World ${interaction.options.get('string').value}`)

        //Reply to the interaction with the embed we just built
        interaction.reply({ embeds: [Embed]}).then()
    }
}