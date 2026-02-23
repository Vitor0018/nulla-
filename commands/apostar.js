const stateService = require('../services/state');
const { neededPlayers } = require('../utils/queueUtils');

module.exports = {
  name: 'apostar',
  description: 'Força a criação de aposta na fila atual (use para testes).',
  async execute(message, args) {
    const chId = message.channel.id;
    const chState = stateService.state.queues[chId];
    if (!chState) return message.reply('Nenhuma fila ativa.');
    // find first queue with enough players
    for (const val in chState.queues) {
      const q = chState.queues[val];
      const total = q.players.length + q.infinite.length;
      const needed = neededPlayers(chState.size);
      if (total >= needed && !q.locked) {
        q.locked = true;
        const betId = stateService.getNextBetId();
        stateService.state.bets[betId] = {
          id: betId,
          channelId: chId,
          players: q.players.concat(q.infinite),
          value: parseFloat(val),
          mediatorId: null,
          status: 'Em andamento',
        };
        return message.reply(`Aposta ${betId} criada com sucesso.`);
      }
    }
    message.reply('Nenhuma fila completa para apostar.');
  },
};