const stateService = require('../services/state');

module.exports = {
  name: 'status',
  description: 'Mostra estado atual do servidor (filas e apostas).',
  async execute(message) {
    const lines = [];
    lines.push('**Filas ativas**');
    for (const chId in stateService.state.queues) {
      const ch = stateService.state.queues[chId];
      lines.push(`Canal <#${chId}> modo ${ch.mode} tamanho ${ch.size}`);
    }
    lines.push('**Apostas em andamento**');
    for (const bid in stateService.state.bets) {
      const b = stateService.state.bets[bid];
      lines.push(`${b.id} | valor R$ ${b.value.toFixed(2)} | jogadores: ${b.players.map(u=>`<@${u}>`).join(', ')}`);
    }
    message.reply(lines.join('\n')||'Nada a mostrar.');
  },
};