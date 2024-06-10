// Dependencies
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
const CatLoggr = require('cat-loggr');

// Functions
const log = new CatLoggr();

module.exports = {
    name: 'serverinfo', // Command name
    description: 'Display information about the server.', // Command description
    category: "info",

    /**
     * Command execute
     * @param {Message} message The message sent by user
     */
    execute(message) {
        const embed = new MessageEmbed()
            .setColor(config.color.default)
            .setTitle(`Server Information for ${message.guild.name}`)
            .addField('Total Members', message.guild.memberCount)
            .addField('Server Region', message.guild.region, true)
            .addField('Created On', message.guild.createdAt.toDateString(), true)
            .addField('Boost Count', message.guild.premiumSubscriptionCount)
            .setImage(message.guild.bannerURL({ dynamic: true }))
            .addField('Channels', message.guild.channels.cache.size)
            .addField('Channel Categories', message.guild.channels.cache.filter(c => c.type === 'category').size)
            .addField('Roles', message.guild.roles.cache.size)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setFooter(`${message.guild.id} - ${message.guild.createdAt.toDateString()} | ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(embed);
    }
};