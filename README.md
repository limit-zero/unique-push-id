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

## Development / Testing
To develop, clone this repository and install via `yarn`. Tests utilize Mocha/Chai and can be ran via `yarn test`. The code is linted using the AirBnB coding style and is checked with eslint. Coverage can be checked via `yarn coverage`.

## What's in a Push ID?
From Mr. Lehenbauer's [blog post](https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html):

"A push ID contains 120 bits of information. The first 48 bits are a timestamp, which both reduces the chance of collision and allows consecutively created push IDs to sort chronologically. The timestamp is followed by 72 bits of randomness, which ensures that even two people creating push IDs at the exact same millisecond are extremely unlikely to generate identical IDs. One caveat to the randomness is that in order to preserve chronological ordering if a client creates multiple push IDs in the same millisecond, we just 'increment' the random bits by one."

"To turn our 120 bits of information (timestamp + randomness) into an ID that can be used as a Firebase key, we basically base64 encode it into ASCII characters, but we use a modified base64 alphabet that ensures the IDs will still sort correctly when ordered lexicographically (since Firebase keys are ordered lexicographically)."

