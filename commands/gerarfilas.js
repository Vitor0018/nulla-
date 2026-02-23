const { generateQueueValues, parseChannelName } = require('../utils/queueUtils');
const { createQueueEmbed } = require('../utils/embedUtils');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const stateService = require('../services/state');

module.exports = {
  name: 'gerarfilas',
  description: 'Gera as filas para o canal atual.',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageChannels')) {
      return message.reply('Sem permissão.');
    }
    const parsed = parseChannelName(message.channel.name);
    if (!parsed) return message.reply('Canal não é de fila válido.');
    const { size, mode } = parsed;
    let values = generateQueueValues();
    values = values.slice().reverse(); // largest first
    // decide subset based on popularity unless 'todas' arg
    if (args[0] !== 'todas') {
      const pop = stateService.state.popularity[message.channel.id] || {};
      values = values.filter(v => pop[v] && pop[v] > 0);
      if (values.length === 0) {
        return message.reply('Nenhuma fila "puxada" detectada; use `!gerarfilas todas` para forçar todas.');
      }
    }
    stateService.state.queues[message.channel.id] = { size, mode, queues: {} };
    const guildSettings = stateService.getGuildSettings(message.guildId);
    for (const v of values) {
      const embed = createQueueEmbed({ size, mode, value: v, players: [], infinite: [], guild: message.guild, guildSettings });
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`join:${message.channel.id}:${v}`)
          .setLabel(`${guildSettings.emojis.normal} ${guildSettings.buttonLabels.normal.split(' ').slice(1).join(' ')}`)
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId(`joininf:${message.channel.id}:${v}`)
          .setLabel(`${guildSettings.emojis.infinite} ${guildSettings.buttonLabels.infinite.split(' ').slice(1).join(' ')}`)
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`leave:${message.channel.id}:${v}`)
          .setLabel(`${guildSettings.emojis.leave} ${guildSettings.buttonLabels.leave.split(' ').slice(1).join(' ')}`)
          .setStyle(ButtonStyle.Danger)
      );
      const msg = await message.channel.send({ embeds: [embed], components: [row] });
      stateService.state.queues[message.channel.id].queues[v] = {
        players: [],
        infinite: [],
        messageId: msg.id,
        locked: false,
      };
    }
    message.reply('Filas geradas.');
  },
};