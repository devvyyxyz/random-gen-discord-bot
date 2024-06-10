// Dependencies
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
const CatLoggr = require('cat-loggr');

// Functions
const log = new CatLoggr();

module.exports = {
    name: 'restart', // Command name
    description: 'Restart the bot.', // Command description
    category: "misc",

    /**
     * Command execute
     * @param {Message} message The message sent by user
     */
    execute(message) {
        if (config.adminids.includes(message.author.id)) {
            const embed = new MessageEmbed()
                .setDescription('Restarting bot...\n\nOnly authorized users can run this command.');

            config.adminids.forEach(adminId => {
                const user = message.guild.members.cache.get(adminId);
                if (user) {
                    embed.addField('Authorized User', user.toString());
                }
            });

            message.channel.send(embed);

            setTimeout(() => {
                process.exit(0); // Restart the bot
            }, 2000); // 2 seconds delay before restart 
        } else {
            const embed = new MessageEmbed()
                .setDescription('You do not have permission to restart the bot.');

            message.channel.send(embed);
        }
    }
};