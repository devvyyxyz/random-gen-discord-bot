// Dependencies
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
const CatLoggr = require('cat-loggr');

// Functions
const log = new CatLoggr();

module.exports = {
    name: 'inviterank', // Command name
    description: 'Display rank of server invitees.', // Command description
    category: "invites",

    /**
     * Command execute
     * @param {Message} message The message sent by user
     */
    execute(message) {
        const user = message.mentions.users.first() || message.author;

        // Your logic to get the amount of invites and rank
        const inviteCount = message.guild.fetchInvites().then(invites => {
            const sortedInvites = invites.array().sort((a, b) => a.uses - b.uses);
            const userInvites = sortedInvites.filter(invite => invite.inviter.id === user.id);
            const inviteRank = userInvites.length > 0 ? sortedInvites.findIndex(invite => invite.inviter.id === user.id) + 1 : 0; // Adding 1 to start from 1 instead of 0

            const embed = new MessageEmbed()
                .setColor(config.color.default)
                .setTitle(`Invite Rank for ${message.guild.name}`)
                .setDescription(`${user} has ${userInvites.length} invites and is rank ${inviteRank} in the server`)
                .setFooter(user.username, user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            message.channel.send(embed);
        });
    }
};