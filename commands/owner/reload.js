var mys = require('microseconds');
const { readFileSync } = require('fs');

module.exports.run = async (bot, msg, args, owner, prefix) => {
    if(!(msg.author.id === owner)){
        msg.channel.send("You aren't my owner.");
        return;
    }
    if(!args[0]) return msg.channel.send("You have to define an handler to reload")
    const begin = mys.now();
    const cmddir = `../../handlers/commands.js`;
    const eventdir = `../../handlers/events.js`;
    const consdir = `../../handlers/console.js`;
    try{
        switch(args[0]){
            case "commands":
            case "command":
            case "cmds":
            case "cmd":
                bot.commands.forEach(c => {
                    bot.commands.delete(c);
                });
                bot.aliases.forEach(a => {
                    bot.commands.delete(a);
                });
                require(cmddir)(bot);
                break
            
            case "events":
            case "event":
            case "eve":
            case "ev":
                await delete require.cache[require.resolve('../../handlers/events.js')];
                require(eventdir)(bot);
                break

            case "console":
            case "cons":
                await delete require.cache[require.resolve('../handlers/console.js')];
                require(consdir)(bot);    
                break
                
            default:
                msg.channel.send("Action is invalid")
        }
    }catch(e){
        msg.channel.send(`ERROR: ${e.message}`);
        return
    }
    const end = mys.now();
    const diff = end - begin;
    msg.channel.send(`Every **${args[0]}** got reloaded! (${parseFloat(diff/1000).toFixed(3)}ms)`).then(ms => ms.delete(10000)).catch()
    msg.delete(5000)
}

module.exports.config = {
    name: "reload",
	description: "The bot will reload all events!",
    usage: `<type>`,
    category: `owner`,
	accessableby: "Bot Owner",
    aliases: ["rld","rl"]
}