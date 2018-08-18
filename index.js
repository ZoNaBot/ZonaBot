const Discord = require('discord.js')
const bot = new Discord.Client()
const prefix = "Z+"
const TOKEN = "TOKEN"
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json')
const db = low(adapter)

db.defaults({warns: [], commands: []}).write()

bot.on('ready', () => {
    console.log(`Je suis actuellement connecté sous le pseudo ${bot.user.tag} avec le prefix ${prefix}`)    
    bot.user.setActivity(`Z+help || ${bot.users.size} users || ${bot.guilds.size} servers`)
})

var color = "#" + Math.floor(Math.random() * 16777215).toString(16)

bot.on('message', message => {
    let command = message.content.split(' ')[0]
    let args = message.content.slice(prefix.length).split(/ +/)
    command = args.shift().toLowerCase()
    let msgauthor = message.author.tag;
    let msgauthorid = message.author.id;
    if (!message.content.startsWith(prefix)) return
    var guildid = message.guild.id
    var guildname = message.guild.name
    
    if (command === "help") {
        let embed = new Discord.RichEmbed()
        .setTitle(`Page d'aide`)
        .addField("Commandes Utilitaires", "```css\nZ+help : Page d'aide\nZ+invitebot\nZ+botinfo : Donne les infos du bot\nZ+serverinfo : Donne les info du serveur\nZ+info @user : Donne l'info de l'utilisateur\n```")
        .addField("Commandes de développement", "```css\nZ+add <nom> <code> : Enregistre un nouveau code\nZ+recup <nom> : Vois le code qui correspond au nom\n```")
        .setColor(color)
        .setFooter(`ZoNa Dévloppement`, message.author.displayAvatarURL)
        message.author.send(embed)
        message.channel.send(`Page d'aide envoyer en privé :white_check_mark:`)
        
    }

    if (command === "botinfo") {

        var srvlist_embed = new Discord.RichEmbed()

            .setTitle(`Info sur ZoNa`)

            .addField("Serveurs", bot.guilds.size, true)

            .addField("Utilisateurs", bot.users.size, true)

            .addField("Channels", bot.channels.size, true)

            .addField("Ping", bot.ping+"ms", true)

            .setColor(color)

            .setFooter("ZoNa.Net", bot.user.displayAvatarURL)

        message.channel.sendEmbed(srvlist_embed)
    }
    if(command === "disconect"){
        var rolefinddeco = message.guild.roles.find("id", "480409445709381652")
        if(!rolefinddeco) return
        var rolefindco = message.guild.roles.find("id", "480411482509541386")
        if(!rolefinddeco) return
        const fs = require("fs");
    	let logindisco = JSON.parse(fs.readFileSync("./logindisco.json", "utf8"));
        if(!logindisco[message.author.id]) return message.channel.send(" :x: Vous êtes déjà déconnecté(e) :x:)
        message.member.removeRole(rolefindco.id)
        message.member.addRole(rolefinddeco.id)
        
		delete logindisco[message.author.id]
        fs.writeFile("./logindisco.json", JSON.stringify(logindisco), (err) => { if (err) console.error(err);});
		
    }
    if(command === "login"){
        var rolefinddeco = message.guild.roles.find("id", "480409445709381652")
        if(!rolefinddeco) return
        var rolefindco = message.guild.roles.find("id", "480411482509541386")
        if(!rolefinddeco) return
        const fs = require("fs");
    	let logindisco = JSON.parse(fs.readFileSync("./logindisco.json", "utf8"));
        if(logindisco[message.author.id]) return message.channel.send(" :x: Vous êtes déjà connecté(e) :x:)
        message.member.removeRole(rolefinddeco.id)
        message.member.addRole(rolefindco.id)
        
		logindisco[message.author.id] = {"logindisco" : "Connect"};
        
        fs.writeFile("./logindisco.json", JSON.stringify(logindisco), (err) => { if (err) console.error(err);});
		
    }
    if (command === "invitebot"){
        let embed = new Discord.RichEmbed()
        .setTitle("Clique ici")
        .setURL("https://discordapp.com/oauth2/authorize?client_id=477558072890359818&scope=bot&permissions=2146958847")
        .setColor(color)
        .setFooter(`Request ${msgauthor}`, message.author.displayAvatarURL)
        message.channel.send(embed)
    }

    if(command ==="info") {
        var memberavatar = message.author.avatarURL
        var membername = message.author.username
           var mentionned = message.mentions.users.first();
          var getvalueof;
          if(mentionned){
              var getvalueof = mentionned;
          } else {
              var getvalueof = message.author;
          }
    
          if(getvalueof.bot == true){
              var checkbot = "L'utilisateur est un bot";
          } else {
              var checkbot = "N'est pas un bot";
          }
          var stat = (getvalueof.presence.status).replace("dnd", "Ne pas déranger").replace("online", "En ligne").replace("offline", "Hors ligne").replace("idle", "Inactif")
    
        message.channel.sendMessage({
            embed: {
              type: 'rich',
                description: '',
                fields: [{
                    name: 'Pseudo',
                    value: getvalueof.username,
                    inline: true
                }, {
                    name: 'User id',
                    value: getvalueof.id,
                    inline: true
                },{
                    name: 'Discriminateur',
                    value: getvalueof.discriminator,
                    inline: true
        },{
                    name: 'Status',
                    value: stat,
                    inline: true
        },{
                    name: 'Bot',
                    value: checkbot,
                    inline: true
        }],
                image: {
            url: getvalueof.avatarURL
                },
                color: 0xE46525,
                footer: {
                    text: 'Message de ZoNa.Net',
                    proxy_icon_url: ' '
                },
        
                author: {
                    name: membername,
                    icon_url: memberavatar,
                    proxy_icon_url: ' '
                }
            } 
        });


    }

    if(command === "serverinfo") {
        var sowner = message.guild.owner.user.username
        var otag = message.guild.owner.user.discriminator
        var listMembers = message.guild.members.array()
        let nombreHumain = 0
        let nombreBots = 0
        const nombreTotal = message.guild.memberCount

        for (var k in listMembers){
            if (listMembers[k].user.bot === true) nombreBots++
        }

        nombreHumain = nombreTotal - nombreBots;
        var server_embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag)
        .setTitle(message.guild.name)
        .setDescription("Informations du serveur " + message.guild.name)
        .addField("nombre de membres", message.guild.memberCount, true)
        .addField("nombre de channels", message.guild.channels.size, true)
        .addField("nombre de rôles", message.guild.roles.size, true)
        .addField("Fondateur", sowner + '#' + otag, true)
        .addField("Nombres d'humains", nombreHumain, true)
        .addField("Nombre de bots", nombreBots, true)
        .addField("Region", message.guild.region, true)
        .addField("Nombre de roles", message.guild.roles.size, true)
        .setThumbnail(message.guild.iconURL)
        .setFooter("ZoNa.Net", message.author.displayAvatarURL)
        .setColor(color)
        message.channel.send(server_embed)
    }

    if (command === "createrôle"){
        let nom = args.slice(0).join(' ')
        if (!nom) return message.reply("Merci d'entrer un nom de rôle à créer")
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Vous n'avez pas les droits d'utiliser cette commande !")
        message.guild.createRole({
            name: nom,
            color: color,
            hoist: true,
            mentionable: true
        })

        message.channel.send(`L'utilisateur **${msgauthor}** vient de créer le rôle **${nom}** avec la couleur **${color}**`)
    } 

    if (command === "add"){
        let nom = args.slice(0).shift()
        if (message.guild.id !== "477552292363632680") return message.reply("Vous pouvez faire cette commande que dans le serveur ZoNa.Net")
        if (db.get("commands").find({nom: nom}).value()) return message.reply("Cette commande existe déjà !")
        let code = args.slice(1).join(' ')
        if (!nom) return message.reply("Merci d'entrer un nom")
        if (!code) return message.reply("Merci d'entrer le code de la commande !")
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Vous n'avez pas les droits !")
        db.get("commands").push({id: Math.random() + 1, nom: nom, code: code, author: msgauthor}).write()
        message.channel.send(`La commande ${nom} a été enregistrer !`)
    }

    if (command === "recup"){
        let nom = args.slice(0).join(' ')
        if (!nom) return message.reply("Merci d'entrer un nom de commande")
        if (!db.get("commands").find({nom: nom}).value()) return message.reply("Merci d'entrer un vrai nom de commande !")
        let commande = db.get("commands").filter({nom: nom}).find('code').value()
        let useCommande = Object.values(commande)
        message.channel.send("```css\n" + useCommande[2] + "```")
    }
    
    if (command === "del"){
        let nom = args.slice(0).join(' ')
        if (message.guild.id !== "477552292363632680") return message.reply("Vous pouvez faire cette commande que dans le serveur ZoNa.Net")
        if (!nom) message.reply("Merci de mettre un nom de commande !")
        if (!db.get('commands').find({nom: nom}).value()) return message.reply("Merci de mettre un nom de commande qui existe !")
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Vous n'avez pas les droits !")
        let commande = db.get("commands").filter({nom: nom}).find('code').value()
        let useCommande = Object.values(commande)
        db.get("commands").remove({id: useCommande[0], nom: nom, code: useCommande[2], author: useCommande[3]}).write()
        message.channel.send(`L'utilisateur **${msgauthor}** a supprimer la commande **${nom}** :white_check_mark:`)
    }

    if (command === "list-commands"){
        var comande = db.get("commands").map('nom').value()
        let embed = new Discord.RichEmbed()
        .setTitle("La liste des commandes")
        .setDescription(comande.join(" | "))
        .setColor(color)
        .setFooter(`ZoNa.Net`, bot.user.displayAvatarURL)
        message.channel.send(embed)
    }

    if (command === "kick"){
        let member = message.mentions.members.first()
        if (!member) return message.reply("Merci de mentionner la personne à kick !")
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply("Vous n'avez pas les droits !")
        if (!member.kickable) return message.reply("Je ne peut pas kick ce joueur !")
        let reason = args.slice(0).join(' ')
        if (!reason) reason = "Aucune raison"
        member.kick(reason).then(message.channel.send(`L'utilisteur **${member.user.tag}** a été kick par **${msgauthor}** pour **${reason}**`))
    }

    if (command === "ban"){
        let member = message.mentions.members.first()
        if (!member) return message.reply("Merci de mentionner la personne à ban !")
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("Vous n'avez pas les droits !")
        if (!member.bannable) return message.reply("Je ne peut pas ban ce joueur !")
        let reason = args.slice(0).join(' ')
        if (!reason) reason = "Aucune raison"
        member.ban(reason).then(message.channel.send(`L'utilisteur **${member.user.tag}** a été ban par **${msgauthor}** pour **${reason}**`))
    }
    
        if(command === "cours"){
        let role = message.guild.roles.find("name", "---Professeurs---")
        if (!args[0]) return message.reply("Merci de mettre un cours !")
        let embed = new Discord.RichEmbed()
        .setTitle("Demande de cours")
        .addField("Pseudo", message.author.tag)
        .addField("Cours", args[0])
        .setColor(color)
        .setFooter("ZoNa.Net", bot.user.displayAvatarURL)
        var channel = message.guild.channels.find("id", "478479000793251860")
        if (!channel) return
        channel.send("<@&477552508064104448>")
        channel.send(embed)
    }

})

bot.on("guildMemberAdd", member => {
    let channel = member.guild.channels.find("name", "général®")
    if (!channel) return 
    let embed = new Discord.RichEmbed()
    .setTitle(`Nouveau membre : ${member.user.tag}`)
    .setDescription(`**${member.user.tag}** vient de rejoindre **${member.guild.name}** ! Bienvenue à lui !`)
    .setColor(color)
    .setThumbnail(member.user.displayAvatarURL)
    .setFooter(`Member joined`, member.user.displayAvatarURL)
    channel.send(embed)
    let embedMp = new Discord.RichEmbed()
    .setTitle(`Bienvenue ${member.user.tag}`)
    .setDescription(`Bienvenue à ${member.guild.name} grâce à toi on est **${member.guild.members.size} membres** :grin:`)
    .setColor(color)
    .setFooter(`${member.guild.name}`, member.guild.iconURL)
    member.send(embedMp)
})

bot.on("guildMemberRemove", member => {
    let channel = member.guild.channels.find("name", "général®")
    if (!channel) return 
    let embed = new Discord.RichEmbed()
    .setTitle(`Membre partit : ${member.user.tag}`)
    .setDescription(`**${member.user.tag}** vient de quitter **${member.guild.name}** ! Bonne chance à lui !`)
    .setColor(color)
    .setThumbnail(member.user.displayAvatarURL)
    .setFooter(`Membre partit`, member.user.displayAvatarURL)
    channel.send(embed)
})

bot.login(TOKEN)
