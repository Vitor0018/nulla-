const { EmbedBuilder } = require('discord.js');
const stateService = require('../services/state');

function createQueueEmbed({ size, mode, value, players, infinite, guild, guildSettings }) {
  const modeNameMap = {
    mobile: 'Mobile',
    emu: 'Emulador',
    misto: 'Misto',
    'full-soco': 'Full Soco',
  };
  const guildName = guild?.name || 'ORG';
  const title = `${size.toUpperCase()} | ${guildName}`;
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setColor(guildSettings.color)
    .setThumbnail(guildSettings.icon || guild?.iconURL() || null)
    .setImage(guildSettings.banner || null)
    .addFields(
      { name: `${guildSettings.emojis.mode} Modo`, value: modeNameMap[mode] || mode, inline: true },
      { name: `${guildSettings.emojis.value} Valor`, value: `R$ ${value.toFixed(2)}`, inline: true },
      {
        name: `${guildSettings.emojis.players} Jogadores`,
        value:
          players.length + infinite.length === 0
            ? '- Nenhum jogador na fila'
            : players
                .map((u) => `<@${u}>`)
                .concat(infinite.map((u) => `<@${u}> ${guildSettings.emojis.infinite}`))
                .join('\n'),
      }
    );
  return embed;
}

function createBetEmbed({ bet }) {
  const embed = new EmbedBuilder()
    .setTitle(`Aposta ${bet.id}`)
    .setColor(config.defaultEmbedColor)
    .addFields(
      { name: 'Valor', value: `R$ ${bet.value.toFixed(2)}`, inline: true },
      { name: 'Jogadores', value: bet.players.map((u) => `<@${u}>`).join('\n') },
      { name: 'Status', value: bet.status },
    );
  return embed;
}

module.exports = {
  createQueueEmbed,
  createBetEmbed,
};