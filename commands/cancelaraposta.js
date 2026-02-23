const stateService = require('../services/state');
const config = require('../config');

module.exports = {
  name: 'cancelaraposta',
  description: 'Cancela aposta em andamento (mediadores apenas).',
  async execute(message, args) {
    const member = message.member;
    if (!member.roles.cache.some(r => r.name === config.mediatorRoleName)) {
      return message.reply('Apenas mediadores podem cancelar apostas.');
    }
    const betId = args[0];
    if (!betId) return message.reply('Informe o ID da aposta.');
    const bet = stateService.state.bets[betId];
    if (!bet) return message.reply('Aposta não encontrada.');
    if (bet.status !== 'Em andamento') return message.reply('Aposta não está em andamento.');
    if (bet.mediatorId && bet.mediatorId !== message.author.id) return message.reply('Você não está designado para esta aposta.');
    bet.status = 'Cancelada';
    const chState = stateService.state.queues[bet.channelId];
    if (chState && chState.queues && chState.queues[bet.value]) {
      chState.queues[bet.value].locked = false;
      chState.queues[bet.value].players = [];
      chState.queues[bet.value].infinite = [];
      try {
        const msg = await message.channel.messages.fetch(chState.queues[bet.value].messageId);
        if (msg) {
          const { createQueueEmbed } = require('../utils/embedUtils');
          const guildSettings = stateService.getGuildSettings(message.guildId);
          const embed = createQueueEmbed({
            size: chState.size,
            mode: chState.mode,
            value: parseFloat(bet.value),
            players: [],
            infinite: [],
            guild: message.guild,
            guildSettings,
          });
          await msg.edit({ embeds: [embed] });
        }
      } catch (e) {}
    }
    stateService.state.history.push(bet);
    delete stateService.state.bets[betId];
    message.reply(`Aposta ${betId} cancelada.`);
  },
};