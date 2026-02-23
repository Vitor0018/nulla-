const config = require('../config');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.author.bot) return;
    const prefixes = [config.prefix, '.'];
    const prefix = prefixes.find(p => message.content.startsWith(p));
    if (!prefix) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = message.client.commands.get(commandName);
    if (!command) return;
    try {
      await command.execute(message, args);
    } catch (err) {
      console.error(err);
      message.reply('Ocorreu um erro ao executar o comando.');
    }
  },
};