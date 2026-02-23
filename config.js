require('dotenv').config();

const config = {
  prefix: process.env.PREFIX || '!',
  token: process.env.TOKEN,
  mediatorRoleName: 'Mediador',
  queueEmojis: {
    normal: '🧊',
    infinite: '♾️',
    leave: '🟥'
  },
  defaultEmbedColor: '#0099ff',
  embedBanner: null,
  buttonLabels: {
    normal: '🧊 Gelo Normal',
    infinite: '🧊 Gelo Infinito',
    leave: '🟥 Sair da fila'
  },
  buttonEmojis: {
    normal: '🧊',
    infinite: '🧊',
    leave: '🟥'
  },
};

module.exports = config;