const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: 'menu', //name is the actual slash command used in discord, this can be anything without spaces.
    description: 'Send a message with a menu attached', //description is the command description as shown in discord.
    options: [],

    execute: function (interaction) {

        //This is a single row of buttons, you can have up to 5 rows per message.
        const row = new MessageActionRow();

        //Build our menu and add it to the row
        row.addComponents(new MessageSelectMenu().setCustomId("Menu").setPlaceholder("Click Me!").addOptions([
            {
                label: 'Hello',
                description: 'Hello Description',
                value: 'hello'
            },
            {
                label: 'World',
                description: 'World Description',
                value: 'world'
            }
        ]));

        //Reply to the interaction with a message and the Row we just built
        interaction.reply({content: "Menus make it easy to select something quickly and efficiently", components: [row]}).then()
    },

    hello: async function (interaction) {
        await interaction.deferUpdate().then();
        //Edit the previous reply
        await interaction.editReply({content: 'Hello!'}).then();
    },

    world: async function (interaction) {
        await interaction.deferUpdate().then();
        //Edit the previous reply
        await interaction.editReply({content: 'World!'}).then();
    }
}