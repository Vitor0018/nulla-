const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const stateService = require('../services/state');
const { parseChannelName, neededPlayers } = require('../utils/queueUtils');
const { createQueueEmbed } = require('../utils/embedUtils');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (interaction.isButton()) {
      const [action, channelId, value] = interaction.customId.split(':');
      const chState = stateService.state.queues[channelId];
      if (!chState || !chState.queues || !chState.queues[value]) {
        return interaction.reply({ content: 'Fila não encontrada.', ephemeral: true });
      }
      const queue = chState.queues[value];
      const userId = interaction.user.id;
      if (queue.locked) {
        return interaction.reply({ content: 'Fila travada, não é possível entrar ou sair.', ephemeral: true });
      }
      if (action === 'join') {
        if (queue.players.includes(userId)) {
          return interaction.reply({ content: 'Você já está na fila.', ephemeral: true });
        }
        queue.players.push(userId);
        // increment popularity
        const pop = stateService.state.popularity[channelId] ||= {};
        pop[value] = (pop[value] || 0) + 1;
        await updateQueueMessage(interaction, channelId, value);
        interaction.reply({ content: 'Você entrou na fila.', ephemeral: true });
      } else if (action === 'joininf') {
        if (queue.infinite.includes(userId)) {
          return interaction.reply({ content: 'Você já está fixo na fila.', ephemeral: true });
        }
        queue.infinite.push(userId);
        const pop = stateService.state.popularity[channelId] ||= {};
        pop[value] = (pop[value] || 0) + 1;
        await updateQueueMessage(interaction, channelId, value);
        interaction.reply({ content: 'Você entrou fixo na fila.', ephemeral: true });
      } else if (action === 'leave') {
        const idx = queue.players.indexOf(userId);
        if (idx !== -1) queue.players.splice(idx, 1);
        const idx2 = queue.infinite.indexOf(userId);
        if (idx2 !== -1) queue.infinite.splice(idx2, 1);
        await updateQueueMessage(interaction, channelId, value);
        interaction.reply({ content: 'Você saiu da fila.', ephemeral: true });
      }
      // check completion
      const total = queue.players.length + queue.infinite.length;
      const needed = neededPlayers(chState.size);
      if (total >= needed && !queue.locked) {
        queue.locked = true;
        createBet(channelId, value, queue.players.concat(queue.infinite));
        interaction.channel.send(':moneybag: **Fila completa! Aposta criada automaticamente.**');
      }
    }
  },
};

async function updateQueueMessage(interaction, channelId, value) {
  const chState = stateService.state.queues[channelId];
  const queue = chState.queues[value];
  const guildSettings = stateService.getGuildSettings(interaction.guildId);
  const embed = createQueueEmbed({
    size: chState.size,
    mode: chState.mode,
    value: parseFloat(value),
    players: queue.players,
    infinite: queue.infinite,
    guild: interaction.guild,
    guildSettings,
  });
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`join:${channelId}:${value}`)
      .setLabel(`${guildSettings.emojis.normal} ${guildSettings.buttonLabels.normal.split(' ').slice(1).join(' ')}`)
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId(`joininf:${channelId}:${value}`)
      .setLabel(`${guildSettings.emojis.infinite} ${guildSettings.buttonLabels.infinite.split(' ').slice(1).join(' ')}`)
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`leave:${channelId}:${value}`)
      .setLabel(`${guildSettings.emojis.leave} ${guildSettings.buttonLabels.leave.split(' ').slice(1).join(' ')}`)
      .setStyle(ButtonStyle.Danger)
  );
  const msg = await interaction.channel.messages.fetch(queue.messageId);
  if (msg) {
    await msg.edit({ embeds: [embed], components: [row] });
  }
}

function createBet(channelId, value, players) {
  const id = stateService.getNextBetId();
  stateService.state.bets[id] = {
    id,
    channelId,
    players,
    value: parseFloat(value),
    mediatorId: null,
    status: 'Em andamento',
  };
}
