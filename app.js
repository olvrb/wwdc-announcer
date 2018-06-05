const Discord = require("discord.js"),
    client = new Discord.Client(),
    config = require("./config.json");
client.on("message", message => {
    if (!message.guild) return;
    if (!message.member.roles.exists("name", "Moderators")) return;
    if (message.channel.id !== "451425907291455498") return;
    const args = message.content.split(" ");
    args.shift();
    message.guild.roles.find("name", "WWDC Alerts").setMentionable(true).then(() => {
        if (message.content.toLowerCase().startsWith("<wwdc")) {
            message.delete();
            const embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setAuthor(client.user.username, client.user.displayAvatarURL())
                .setFooter("created by oliver#9880")
                .setTitle("News from WWDC 2018")
                .setDescription(args.join(" "));
            message.guild.channels.find("name", "wwdc-news").send({
                embed: embed,
                content: `${message.guild.roles.find("name", "WWDC Alerts")}`
            }).then(() => {
                message.guild.roles.find("name", "WWDC Alerts").setMentionable(false);
            });
        }
    });

});
client.login(config.token);