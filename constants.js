const { Client, Intents } = require('discord.js')

//This allows usage of the client object in other files.
module.exports = Object.freeze({
    client: new Client({ intents: [Intents.ALL], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
});