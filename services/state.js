// in-memory state management for queues, bets, mediators, pix keys, history

const state = {
  queues: {}, // channelId -> { value: { players: [], infinite: [], messageId, locked: false } }
  bets: {}, // betId -> { channelId, players, value, mediatorId, status }
  mediators: new Set(), // userIds that are mediators (determined by role)
  pixKeys: {}, // userId -> pixKey
  history: [], // array of past bets
  guildSettings: {}, // guildId -> { banner, color, buttonLabels, icon }
  popularity: {}, // channelId -> { value -> count }
};

let betCounter = 1;

function getNextBetId() {
  return `bet_${betCounter++}`;
}

function resetState() {
  state.queues = {};
  state.bets = {};
  state.history = [];
  // mediators, pixKeys, and guildSettings persist
}

function getGuildSettings(guildId) {
  if (!state.guildSettings[guildId]) {
    state.guildSettings[guildId] = {
      banner: null,
      color: '#0099ff',
      buttonLabels: {
        normal: '🧊 Gelo Normal',
        infinite: '🧊 Gelo Infinito',
        leave: '🟥 Sair da fila'
      },
      emojis: {
        mode: '🎮',
        value: '💰',
        players: '👤',
        normal: '🧊',
        infinite: '♾️',
        leave: '🟥'
      },
      icon: null,
    };
  }
  return state.guildSettings[guildId];
}

function updateGuildSettings(guildId, updates) {
  const settings = getGuildSettings(guildId);
  Object.assign(settings, updates);
  if (updates.buttonLabels) {
    Object.assign(settings.buttonLabels, updates.buttonLabels);
  }
  if (updates.emojis) {
    Object.assign(settings.emojis, updates.emojis);
  }
}

module.exports = {
  state,
  getNextBetId,
  resetState,
  getGuildSettings,
  updateGuildSettings,
};