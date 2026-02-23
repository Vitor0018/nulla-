const stateService = require('../services/state');

function parseEmoji(input) {
  // Discord custom emoji: <:nome:ID> ou <a:nome:ID> (animado)
  const discordEmojiMatch = input.match(/<a?:[^:]+:(\d+)>/);
  if (discordEmojiMatch) {
    return input; // retorna a string completa
  }
  // Se for só um número, é um ID (será interpretado como emoji)
  if (/^\d+$/.test(input)) {
    return input;
  }
  // Caso contrário assume que é um emoji normal (🎮, 💰, etc)
  return input;
}

module.exports = {
  name: 'editar',
  description: 'Edita visual das filas (cor, banner, emojis, botões, banners animados).',
  async execute(message, args) {
    if (!message.member.permissions.has('ManageChannels')) return message.reply('Sem permissão.');
    
    const guildSettings = stateService.getGuildSettings(message.guildId);
    let msg = '**Edições:**\n';
    let hasChanges = false;

    // Check for attachment (banner image/GIF)
    if (message.attachments.size > 0) {
      const attachment = message.attachments.first();
      if (attachment.contentType.startsWith('image/')) {
        guildSettings.banner = attachment.url;
        msg += `✓ Banner atualizado (${attachment.contentType})\n`;
        hasChanges = true;
      }
    }

    // Process text arguments
    args.forEach(arg => {
      const [k, v] = arg.split('=');
      if (!k || !v) return;
      
      if (k === 'color') {
        guildSettings.color = v;
        msg += `✓ Cor: ${v}\n`;
        hasChanges = true;
      } else if (k === 'banner') {
        guildSettings.banner = v;
        msg += `✓ Banner URL: ${v}\n`;
        hasChanges = true;
      } else if (k.startsWith('emoji-')) {
        const emojiKey = k.replace('emoji-', '');
        if (guildSettings.emojis.hasOwnProperty(emojiKey)) {
          guildSettings.emojis[emojiKey] = parseEmoji(v);
          msg += `✓ Emoji ${emojiKey}: ${v}\n`;
          hasChanges = true;
        }
      } else if (k === 'btn-normal') {
        guildSettings.buttonLabels.normal = v;
        msg += `✓ Botão Normal: ${v}\n`;
        hasChanges = true;
      } else if (k === 'btn-infinite') {
        guildSettings.buttonLabels.infinite = v;
        msg += `✓ Botão Infinito: ${v}\n`;
        hasChanges = true;
      } else if (k === 'btn-leave') {
        guildSettings.buttonLabels.leave = v;
        msg += `✓ Botão Sair: ${v}\n`;
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      return message.reply(
        '**Usar:**\n' +
        '`!editar color=#0099ff banner=url`\n' +
        '`!editar btn-normal=texto btn-infinite=texto btn-leave=texto`\n' +
        '`!editar emoji-mode=🎮 emoji-value=💰 emoji-players=👤`\n' +
        '`!editar emoji-normal=🧊 emoji-infinite=♾️ emoji-leave=🟥`\n' +
        '**Ou envie imagem (incluindo GIF animado) com:**\n' +
        '`(anexar arquivo) !editar`'
      );
    }

    msg += '\n✨ Use `!gerarfilas` para aplicar as mudanças.';
    message.reply(msg);
  },
};