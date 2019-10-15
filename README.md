# alchemy.js

Yo the page is at https://dregu.github.io/alchemy.js/

## wat?

This is a js port of https://github.com/probable-basilisk/cheatgui alchemy recipe generator for Noita.

## Module usage

```js
const Alchemy = require('./alchemy.js');
const alchemy = new Alchemy();
var seed = 42069;
var recipes = alchemy.get_alchemy(seed);
```
