const stateService = require('../services/state');

module.exports = {
  name: 'historico',
  description: 'Mostra histórico de apostas.',
  async execute(message) {
    const hist = stateService.state.history;
    if (hist.length === 0) return message.reply('Nenhum histórico.');
    const lines = hist.map(b => `${b.id} | ${b.status} | R$ ${b.value.toFixed(2)} | Jogadores: ${b.players.map(u=>`<@${u}>`).join(', ')}`);
    message.reply(lines.join('\n'));
  },
};