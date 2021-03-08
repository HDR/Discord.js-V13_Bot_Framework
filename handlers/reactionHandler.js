const constants = require('../constants') //Require constants so we can use the client object

//Runs every time a message receives a reaction
constants.client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.log("Failed to fetch reaction")
            return;
        }
    }

    //Remove the reaction
    await reaction.remove()
    //Send the reaction as a message
    await reaction.message.channel.send(`${reaction.emoji}`)
})