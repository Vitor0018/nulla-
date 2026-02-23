const { EmbedBuilder } = require('discord.js');
const stateService = require('../services/state');

module.exports = {
  name: 'p',
  description: 'Mostra estatísticas pessoais de apostas (vitórias, derrotas e streak).',
  async execute(message) {
    const hist = stateService.state.history;
    const userId = message.author.id;

    let totalWins = 0;
    let totalLosses = 0;

    // contar vitórias e derrotas
    hist.forEach(b => {
      if (!b.players.includes(userId)) return;
      if (b.status === 'Finalizada') totalWins++;
      else totalLosses++;
    });

    if (totalWins + totalLosses === 0) {
      return message.reply('Você não possui histórico de apostas.');
    }

    // calcular streak atual
    let streakWin = 0;
    let streakLoss = 0;
    for (let i = hist.length - 1; i >= 0; i--) {
      const b = hist[i];
      if (!b.players.includes(userId)) continue;
      if (b.status === 'Finalizada') {
        if (streakLoss > 0) break;
        streakWin++;
      } else {
        if (streakWin > 0) break;
        streakLoss++;
      }
    }

    const embed = new EmbedBuilder()
      .setColor('#2f3136')
      .setTitle(`📊 ESTATÍSTICAS DO JOGADOR ${message.author.username}`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: '🟢 Vitórias', value: `${totalWins}`, inline: true },
        { name: '🔴 Derrotas', value: `${totalLosses}`, inline: true },
        { name: '🔵 Streak de Vitórias', value: `${streakWin}`, inline: true },
        { name: '🟠 Streak de Derrotas', value: `${streakLoss}`, inline: true }
      )
      .setFooter({ text: message.client.user.username, iconURL: message.client.user.displayAvatarURL() })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
