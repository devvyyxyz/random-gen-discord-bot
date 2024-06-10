// Dependencies
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'invitelb', // Command name
    description: 'Display the invite leaderboard with pages.', // Command description
    category: "invites", // Command category

    /**
     * Command execute
     * @param {Message} message The message sent by user
     */
    execute(message) {
        // Logic to get the top 100 invitees
        const top100Invitees = getTop100Invitees(); 

        const leaderboard = top100Invitees.map((invitee, index) => {
            return `**${index + 1}. ${invitee.username}** has **${invitee.invites}** invites`;
        });

        const embed = new MessageEmbed()
            .setColor(config.color.default)
            .setTitle('Top 100 Invitees')
            .setDescription(leaderboard.join('\n'));

        message.channel.send(embed);
    }
};