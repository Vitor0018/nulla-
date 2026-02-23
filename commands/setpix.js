const stateService = require('../services/state');
const config = require('../config');

module.exports = {
  name: 'setpix',
  description: 'Define chave PIX do mediador.',
  async execute(message, args) {
    if (!message.member.roles.cache.some(r=>r.name===config.mediatorRoleName)) {
      return message.reply('Apenas mediadores podem definir PIX.');
    }
    const key = args[0];
    if (!key) return message.reply('Informe a chave PIX.');
    stateService.state.pixKeys[message.author.id] = key;
    message.reply('Chave PIX salva.');
  },
};