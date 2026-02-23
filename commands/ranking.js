const stateService = require('../services/state');

module.exports = {
  name: 'ranking',
  description: 'Mostra ranking simples baseado em histórico.',
  async execute(message) {
    const hist = stateService.state.history;
    if (hist.length === 0) return message.reply('Nenhum histórico.');
    const wins = {};
    hist.forEach(b => {
      if (b.status === 'Finalizada') {
        b.players.forEach(u => {
          wins[u] = (wins[u] || 0) + 1;
        });
      }
    });
    const entries = Object.entries(wins).sort((a,b)=>b[1]-a[1]);
    const lines = entries.map(([id,c])=>`<@${id}>: ${c}`);
    message.reply(lines.join('\n'));
  },
};