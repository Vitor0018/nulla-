const stateService = require('../services/state');
const qrcode = require('qrcode');

module.exports = {
  name: 'pix',
  description: 'Mostra chave e QR code PIX da aposta atual do mediador.',
  async execute(message, args) {
    // find bet in channel where mediator is present?
    const userId = message.author.id;
    const pixKey = stateService.state.pixKeys[userId];
    if (!pixKey) return message.reply('Você não definiu sua chave PIX.');
    // find first bet where mediatorId null and creator maybe??? we'll just show generic
    // find an ongoing bet with no mediator assigned or where this user is mediator
    let bet = Object.values(stateService.state.bets).find(b => b.status === 'Em andamento' && (!b.mediatorId || b.mediatorId === userId));
    if (!bet) return message.reply('Nenhuma aposta em andamento.');
    if (!bet.mediatorId) bet.mediatorId = userId; // assign current mediator
    const uri = `PIX:${pixKey}`;
    const dataUrl = await qrcode.toDataURL(uri);
    const embed = {
      title: 'PIX da Aposta',
      fields: [
        { name: 'Valor', value: `R$ ${bet.value.toFixed(2)}`, inline: true },
        { name: 'Chave', value: pixKey, inline: true },
      ],
      image: { url: dataUrl },
    };
    message.channel.send({ embeds: [embed] });
  },
};