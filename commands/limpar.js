module.exports = {
  name: 'limpar',
  description: 'Limpa mensagens do canal.',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageMessages')) return message.reply('Sem permissão.');
    const count = parseInt(args[0]) || 10;
    const fetched = await message.channel.bulkDelete(count, true);
    message.reply(`Apagadas ${fetched.size} mensagens.`).then(m=>setTimeout(()=>m.delete(),3000));
  },
};