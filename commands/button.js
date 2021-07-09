const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: 'button', //name is the actual slash command used in discord, this can be anything without spaces.
    description: 'Posts an example for how buttons can be used.', //description is the command description as shown in discord.
    options: [],

    execute: function (interaction) {

        //This is a single row of buttons, you can have up to 5 rows per message.
        const row = new MessageActionRow().addComponents(new MessageButton().setCustomId('button_example').setLabel("Click Me").setStyle("PRIMARY").setEmoji('👋'))

        //This is a single button, which we add to Row1, each row can have up to 5 buttons.
        //Buttons can have multiple styles, see https://support.discord.com/hc/en-us/articles/1500012250861-Bots-Buttons
        //Valid styles are `PRIMARY, SECONDARY, SUCCESS, DANGER, LINK`
        //Emojis can also be added to buttons

        //Reply to the interaction with a message and the Row we just built
        interaction.reply({content: "Buttons are a great way to interact with bots.", components: [row]}).then()
    },

    //This is the function ran when button_example is pressed.
    example: async function (interaction) {
        let rand = ["Button Pressed", "Hello World!", "Execute Order 66!", "Keep pressing!", "Subscribe to makho", "i can't come up with any more of these."]
        await interaction.deferUpdate().then();
        //Edit the previous reply
        await interaction.editReply({content: rand[Math.floor(Math.random() * rand.length)]}).then();
    }
}