const incrementArray = require('./increment-array');

// Inspired/refactored from https://gist.github.com/mikelehen/3596a30bd69384624c11

// Base64 web-safe characters, ordered by ASCII
const PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';
// console.info(PUSH_CHARS.length);

// Timestamp of last push.
// Used to prevent local collisions if pushed to more than once in the same millisecond.
let lastPushTime = 0;

// We generate 72-bits of randomness which get turned into 12 characters and appended to the
// timestamp to prevent collisions with other clients.  We store the last characters we
// generated because in the event of a collision, we'll use those same characters except
// they'll be "incremented" by one.
const lastRandomPositions = [];

module.exports = () => {
  let now = Date.now();
  const isSameTime = now === lastPushTime;
  lastPushTime = now;

  let i;
  const characters = new Array(8);
  for (i = 7; i >= 0; i -= 1) {
    characters[i] = PUSH_CHARS.charAt(now % 64);
    now = Math.floor(now / 64);
  }

  let id = characters.join('');

  if (isSameTime) {
    // Time hasn't change since last push.
    // Use the same random character positions, except increment by 1.
    incrementArray(lastRandomPositions, 63);
  } else {
    // The time has changed since last push.
    // Fill with new, random character positions between 0 and 63
    for (i = 0; i < 12; i += 1) {
      lastRandomPositions[i] = Math.floor(Math.random() * 64);
    }
  }
  for (i = 0; i < 12; i += 1) {
    id += PUSH_CHARS.charAt(lastRandomPositions[i]);
  }
  return id;
};
