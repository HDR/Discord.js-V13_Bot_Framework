const {client} = require("./constants");
const Discord = require('discord.js')
const { token, guildID } = require('./config.json')
const fs = require('fs')
const commands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();

//Docs -
// Slash commands: https://deploy-preview-638--discordjs-guide.netlify.app/interactions/registering-slash-commands.html
// Buttons: https://deploy-preview-674--discordjs-guide.netlify.app/interactions/buttons.html
// v12 to V13: https://deploy-preview-551--discordjs-guide.netlify.app/additional-info/changes-in-v13.html#rolemanager

for (const file of commands) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

async function registerCommands(){
    const data = []
    for (const file of commands) {
        if (!client.application?.owner) await client.application?.fetch();
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command)
        data.push({
            name: command.name,
            description: command.description,
            options: command.options
        },);

    }
    //Register commands in the commands folder in bulk, please keep in mind that Global commands take up to an hour before they update or show up on your server.
    await client.application?.commands.set(data).then();
    //Comment the above line and uncomment the below line if you want guild commands, guild commands are instantly updated but they work on a per guild basis, this requires specifying your guild's ID in config.json
    //await client.guilds.cache.get(guildID)?.commands.set(data).then();
}

//We put the events here.
for (const file of events) {
    require(`./events/${file}`);
}

//Get interaction events to check if a command is fired, or a button is pressed.
client.on('interactionCreate', async interaction => {
    console.log(interaction)
    //Check if interaction is a button press.
    if (interaction.isMessageComponent() && interaction.componentType === 'BUTTON'){
        //Get the original interaction command name, this only works if the intent is NOT ephemeral.
        const buttonCommand = client.commands.get(interaction.message.interaction.commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(interaction.message.interaction.commandName));
        //We use button id's to run other functions in the same file as the original command, this is a workaround and requires all button id's to start with "button_" the text after that is the actual function you want to run.
        buttonCommand[interaction.customId.substr(7, interaction.customId.length-7)](interaction);
    } else {
        //If it's not we execute the command
        try{
            const command = client.commands.get(interaction.commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(interaction.commandName));
            command.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    }
});

client.login(token).then(registerCommands).then();
