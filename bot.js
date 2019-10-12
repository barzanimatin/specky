//Discord.js stuff
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//other stuff
const util = require('util');
const ytdl = require('ytdl-core');
const ytdlDiscord = require('ytdl-core-discord');
fs          = require('fs');
request     = require('request');
path        = require('path')

const config = require("../config.json"); //remove one dot if you h
const prefix = config.prefix;
const owner  = config.owner;

console.log(prefix);

bot.login(config.token);

fs.readdir("./cmds/utilities/", (err, files) => {
	console.log("Utilities loading");
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)
	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/utilities/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.config.name, props);
		props.config.aliases.forEach((alias) =>{
			bot.aliases.set(alias, props.config.name);
		});
	});
});

fs.readdir("./cmds/music/", (err, files) => {
	console.log("Music loading");
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)
	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/music/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.config.name, props);
		props.config.aliases.forEach((alias) =>{
			bot.aliases.set(alias, props.config.name);
		});
	});
});

fs.readdir("./cmds/misc/", (err, files) => {
	console.log("Misc loading");
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)
	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/misc/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.config.name, props);
		props.config.aliases.forEach((alias) =>{
			bot.aliases.set(alias, props.config.name);
		});
	});
});

fs.readdir("./cmds/games/", (err, files) => {
	console.log("Games loading");
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)
	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/games/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.config.name, props);
		props.config.aliases.forEach((alias) =>{
			bot.aliases.set(alias, props.config.name);
		});
	});
});

fs.readdir("./cmds/admin/", (err, files) => {
	console.log("Admin loading");
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js")
	if(jsfiles.lenght <= 0){
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.lenght} commands!`)
	jsfiles.forEach((f,i) => {
		let props = require(`./cmds/admin/${f}`)
		console.log(`${i+1}: ${f} loaded!`)
		bot.commands.set(props.config.name, props);
		props.config.aliases.forEach((alias) =>{
			bot.aliases.set(alias, props.config.name);
		});
	});
});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
	if (!msg.content.toLowerCase().startsWith(prefix) || msg.author.bot || msg.channel.type === "dm") return;

	let args = msg.content.toLowerCase().split(" ");
	let command = args[0];
	args = args.slice(1);

	let cmd = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
	if(cmd){
		console.log(`${command.toUpperCase().slice(prefix.length)}: actived by ${msg.author.username} (${msg.author.id})`);
		cmd.run(bot, msg, args, owner, prefix);
		return;
	}else{
	msg.reply("we didn't find the commad you were looking for. Sowwy UwU");
	}
});