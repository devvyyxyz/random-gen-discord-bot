// Dependencies
const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');
const config = require('../config.json');

module.exports = {
    name: 'stock', // Command name
    description: 'Display the service stock.', // Command description
    category: "gen", // Command category



    /**
     * Command execute
     * @param {Message} message The message sent by user
     */
    execute(message) {
        // Arrays
        const stock = [];

        // Read all of the services
        fs.readdir(`${__dirname}/../stock/`, function (err, files) {
            // If unable to scan the directory
            if (err) return console.log('Unable to scan directory: ' + err);

            // Put services into the stock
            files.forEach(function (file) {
                if (!file.endsWith('.txt')) return;
                stock.push(file);
            });

            const embed = new MessageEmbed()
                .setColor(config.color.default)
                .setTitle(`${message.guild.name} has **${abbreviateNumber(stock.length)} services**`)
                .setDescription('');

            // Push all services to the stock
            stock.forEach(async function (data) {
                const filePath = `${__dirname}/../stock/${data}`;

                const lines = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);

                embed.addField(`**${data.replace('.txt','')}**:`, `\`${abbreviateNumber(lines.length)}\``, true);
            });

            message.channel.send(embed);
        });
    }
};

// Function to abbreviate large numbers
function abbreviateNumber(value) {
    const suffixes = ["", "K", "M", "B", "T"];
    const step = 3;
    const num = Math.abs(value);

    const digits = Math.floor(Math.log10(num));
    if (digits < step) return num.toString();

    const suffIndex = Math.floor(digits / step);
    const shortValue = num / Math.pow(10, suffIndex * step);

    return shortValue.toFixed(1) + suffixes[suffIndex];
}