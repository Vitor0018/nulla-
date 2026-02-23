// helper functions for queue value sequence and channel parsing

let cachedValues = null;
function generateQueueValues() {
  if (cachedValues) return cachedValues;
  const values = [];
  for (let v = 0.1; v <= 10 + 1e-9; v += 0.2) {
    values.push(parseFloat(v.toFixed(2)));
  }
  for (let v = 10 + 15; v <= 100 + 1e-9; v += 15) {
    values.push(parseFloat(v.toFixed(2)));
  }
  cachedValues = values;
  return values;
}

function parseChannelName(name) {
  // expected like "1x1-mobile" or "2x2-emu" etc
  const re = /^(\d+x\d+)-(mobile|emu|misto|full-soco)$/i;
  const m = name.match(re);
  if (!m) return null;
  const [_, size, mode] = m;
  return { size, mode };
}

function neededPlayers(size) {
  // size string like "1x1" or "2x2"
  const parts = size.split('x').map(Number);
  // total players = sum? basically first + second
  return parts[0] + parts[1];
}

module.exports = {
  generateQueueValues,
  parseChannelName,
  neededPlayers,
};