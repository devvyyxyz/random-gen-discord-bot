// Dependencies
const { MessageEmbed, Message } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'help', // Command name
  description: 'Display the command list.', // Command description
    category: "info",

    /**
     * Command exetute
     * @param {Message} message The message sent by user
     */
  execute(message) {
    const { commands } = message.client; // Get commands from the client

    // Grouping commands by category
        const groupedCommands = new Map();
        commands.forEach(c => {
            if (!groupedCommands.has(c.category)) {
                groupedCommands.set(c.category, []);
            }
            groupedCommands.get(c.category).push(c);
        });

        // Creating embed for each category
        const embeds = [];
        groupedCommands.forEach((categoryCommands, category) => {
            const commandsList = categoryCommands.map(c => `**\`${config.prefix}${c.name}\`**: ${c.description ? c.description : '*No description provided*'}`).join('\n');
            const embed = new MessageEmbed()
                .setColor(config.color.default)
                .setTitle(`Command list - ${category}`)
                .setDescription(commandsList)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 64 }))
                .setTimestamp();
            embeds.push(embed);
        });

        // Sending each embed for a category
        embeds.forEach(embed => {
            message.channel.send(embed);
        });
  }
};
