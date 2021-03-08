const constants = require('./constants') //Require constants so we can use the client object
const Discord = require('discord.js')
const { token } = require('./config.json') //Pull the discord bot token from config.json
const fs = require('fs') //Require fs so we can access files

//Get all commands
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Get all handlers
const handlers = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));
constants.client.commands = new Discord.Collection();

//Register every command in the commands (Commands are registered globally, this means it will take up to an hour before they show up.
for (const file of commands) {
    const command = require(`./commands/${file}`);
    constants.client.commands.set(command.name, command)

    //Uncomment the line below and comment the other one if you want global commands, guild commands will update instantly, while global commands may take up to an hour before they show up.
    //constants.client.api.applications('Bot Client ID').commands.post({data: {
    constants.client.api.applications('Bot Client ID').guilds('Guild ID').commands.post({data: {
            name: command.name,
            description: command.description,
            options: command.options
       }}).then()
}

//Handlers are used for different discord events, see the handlers folder for more information, handlers can also be built into command files, but are separated in this case for ease of use
for (const file of handlers) {
    const handler = require(`./handlers/${file}`);
    constants.client.commands.set(handler.name, handler)
}

//Runs whenever one of the bots slash commands are used, executes the corresponding command in the commands folder
constants.client.ws.on('INTERACTION_CREATE', interaction => {
    //Fetch the guild the command was used in
    const guild = constants.client.guilds.cache.get(interaction.guild_id)
    //Fetch the channel the command was used in
    const channel = guild.channels.cache.get(interaction.channel_id);
    //fetch the member that executed the command
    const member = guild.members.cache.get(interaction.member.user.id)
    const command = constants.client.commands.get(interaction.data.name) || constants.client.commands.find(cmd => cmd.name && cmd.name.includes(interaction.data.name));
    try{
        command.execute(channel, interaction.data.options, member, interaction);
    } catch (error) {
        console.error(error);
    }
})

//Log in with the token from config.json
constants.client.login(token).then();