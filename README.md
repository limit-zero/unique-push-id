# Unique Push ID
🆔 Generates unique, chronological, lexicographical push IDs similar to Firebase with NodeJS.

This library (with unit tests added) was directly ported from a [blog post](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html) and [Gist](https://gist.github.com/mikelehen/3596a30bd69384624c11) by Michael Lehenbauer of Firebase. To learn more, see "What's in a Push ID?" below.

## Installation and Usage
To install, run `yarn add unique-push-id` or `npm i unique-push-id`.

Usage:
```js
const pushId = require('unique-push-id');

const id = pushId();
console.info(id); // Will output something similar to -L9QCCdxj62CBRFCn6rF
```

When rapidly calling the `pushId()` function you can see how the IDs remain chronological and lexicographical:
```js
const ids = [];
for (let i = 0; i < 1000; i += 1) {
  ids.push(pushId());
}
console.info(ids);
/* 
Output will look similar to:
[ 
  '-L9QCCdxj62CBRFCn6qw',
  '-L9QCCdxj62CBRFCn6qx',
  '-L9QCCdxj62CBRFCn6qy',
  '-L9QCCdxj62CBRFCn6qz',
  '-L9QCCdxj62CBRFCn6r-',
  '-L9QCCdxj62CBRFCn6r0',
  '-L9QCCdxj62CBRFCn6r1',
  '-L9QCCdxj62CBRFCn6r2',
  '-L9QCCdxj62CBRFCn6r3',
  ... more items
]
*/
```

## Development / Testing
To develop, clone this repository and install via `yarn`. Tests utilize Mocha/Chai and can be ran via `yarn test`. The code is linted using the AirBnB coding style and is checked with eslint. Coverage can be checked via `yarn coverage`.

## What's in a Push ID?
From Mr. Lehenbauer's [blog post](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html):

"A push ID contains 120 bits of information. The first 48 bits are a timestamp, which both reduces the chance of collision and allows consecutively created push IDs to sort chronologically. The timestamp is followed by 72 bits of randomness, which ensures that even two people creating push IDs at the exact same millisecond are extremely unlikely to generate identical IDs. One caveat to the randomness is that in order to preserve chronological ordering if a client creates multiple push IDs in the same millisecond, we just 'increment' the random bits by one."

"To turn our 120 bits of information (timestamp + randomness) into an ID that can be used as a Firebase key, we basically base64 encode it into ASCII characters, but we use a modified base64 alphabet that ensures the IDs will still sort correctly when ordered lexicographically (since Firebase keys are ordered lexicographically)."
