const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Exibe lista completa de comandos.',
  async execute(message) {
    const embeds = [
      new EmbedBuilder()
        .setTitle('📖 COMANDOS DO BOT DE APOSTAS')
        .setColor('#0099ff')
        .setDescription('Use `!comando` ou `.comando` para executar.')
        .addFields(
          { name: '⚙️ GERAÇÃO DE FILAS', value: '`gerarfilas` - Cria filas no canal. Use `!gerarfilas todas` para criar todas as filas, ou apenas as mais puxadas automaticamente.', inline: false },
          { name: '📋 Passo a passo:', value: '1. Crie um canal com nome válido (ex: 1x1-mobile)\n2. Use `!gerarfilas` ou `!gerarfilas todas`\n3. Filas aparecem do maior ao menor valor e, por padrão, somente as que já tiveram entradas.', inline: false }
        ),
      new EmbedBuilder()
        .setColor('#00ff00')
        .addFields(
          { name: '🎮 PARTICIPAR DE FILAS', value: '**Botões nas filas:**\n🧊 Gelo Normal - Entra temporário\n🧊 Gelo Infinito - Entra fixo até cancelar\n🟥 Sair - Remove você da fila', inline: false }
        ),
      new EmbedBuilder()
        .setColor('#ff9900')
        .addFields(
          { name: '💰 APOSTAS E MEDIADORES', value: '`finalizaraposta <id>` - Finaliza aposta (mediador)\n`cancelaraposta <id>` - Cancela aposta (mediador)', inline: false },
          { name: '📋 Passo a passo:', value: '1. Quando fila completa, aposta é criada automática\n2. Mediador assume a aposta\n3. Usa `!pix` para mostrar QR Code\n4. Usa `!finalizaraposta <id>` ao fim', inline: false }
        ),
      new EmbedBuilder()
        .setColor('#ff00ff')
        .addFields(
          { name: '💳 SISTEMA PIX', value: '`setpix <chave>` - Define sua chave PIX\n`pix` - Mostra QR Code da aposta', inline: false },
          { name: '📋 Passo a passo:', value: '1. Mediador usa `!setpix chave_aleatoria`\n2. Ao assumir aposta, usa `!pix`\n3. Aparece embed com chave + QR Code\n4. Passa para os jogadores', inline: false }
        ),
      new EmbedBuilder()
        .setColor('#ff3333')
        .addFields(
          { name: '🎨 PERSONALIZAR FILAS', value: '`editar color=#ff0000` - Muda cor do embed\n`editar banner=url` - URL da imagem\n(anexar imagem) `editar` - Sobe imagem como banner\n`editar emoji-mode=🎮 emoji-value=💰` - Emojis\n`editar btn-normal=Entrar` - Texto dos botões', inline: false },
          { name: '📋 Passo a passo:', value: '1. Use `!editar opção=valor`\n2. Envie imagem/GIF para banner automático\n3. Use emojis normais, animados ou do servidor\n4. Use `!gerarfilas` para aplicar mudanças\n5. Exemplo: `!editar color=#ff0000 emoji-mode=🎮`', inline: false }
        ),
      new EmbedBuilder()
        .setColor('#00ffff')
        .addFields(
          { name: '📊 HISTÓRICO E STATUS', value: '`ranking` - Mostra ranking de vitórias\n`historico` - Lista apostas passadas\n`status` - Mostra filas e apostas ativas\n`limpar <número>` - Limpa mensagens do canal', inline: false }
        ),
      new EmbedBuilder()
        .setColor('#ffff00')
        .setTitle('💡 DICAS E INFORMAÇÕES')
        .addFields(
          { name: '🎯 Canal válido deve ser:', value: '`1x1-mobile`, `2x2-emu`, `3x3-misto`, `4x4-full-soco` ou similar', inline: false },
          { name: '🔑 Cargo Mediador:', value: 'Crie um cargo chamado "Mediador" e atribua quem pode gerenciar apostas', inline: false },
          { name: '♾️ Gelo Infinito:', value: 'Jogador fica na fila até sair manualmente (útil para players que sempre querem jogar)', inline: false },
          { name: '🔄 Sequência de valores:', value: 'R$ 0,10 → 10,00 (+0,20 cada)\nR$ 25,00 → 100,00 (+15 cada)', inline: false }
        )
    ];

    for (const embed of embeds) {
      await message.channel.send({ embeds: [embed] });
    }
  },
};