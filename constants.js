const Discord = require('discord.js')

//This allows usage of the client object in other files.
module.exports = Object.freeze({
    client: new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
});