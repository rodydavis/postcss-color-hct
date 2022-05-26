# postcss-color-hct

[![Tests](https://github.com/rodydavis/postcss-color-hct/actions/workflows/tests.yml/badge.svg)](https://github.com/rodydavis/postcss-color-hct/actions/workflows/tests.yml)
[![npm package](https://badgen.net/npm/v/postcss-color-hct)](https://npmjs.com/package/postcss-color-hct)

> [PostCSS](https://github.com/postcss/postcss) plugin to transform [hct() color](https://www.npmjs.com/package/@material/material-color-utilities) to compatible CSS (#hex or rgba()).

## Overview

Using the new [HCT](https://www.npmjs.com/package/@material/material-color-utilities) color space for [Material 3](https://m3.material.io/styles/color/overview) this plugin convert the hct color syntax to compatible CSS.

Implementation based on the [postcss-color-hcl](https://github.com/devgru/postcss-color-hcl) plugin.

CSS Custom properties are **not supported** as input for values:

```css
body {
  --hue: 20;
  color: hct(var(--hue), 70%, 50%, 0.5);
}
```

Using the HCT color space at runtime can be done with the [Material Color Utilities](https://www.npmjs.com/package/@material/material-color-utilities) package for use in javascript.

## Installation

```bash
$ npm install postcss-color-hct
```

## Usage

```js
// dependencies
var fs = require("fs");
var postcss = require("postcss");
var colorHct = require("postcss-color-hct");

// css to be processed
var css = fs.readFileSync("input.css", "utf8");

// process css
var output = postcss().use(colorHct()).process(css).css;
```

Using this `input.css`:

```css
body {
  color: hct(21, 70%, 50%, 0.5);
  background: hct(0, 0%, 50%);
}
```

you will get:

```css
body {
  color: rgba(221, 52, 80, 0.5);
  background: rgb(119, 119, 119);
}
```

Checkout [tests](test) for more examples.

---

## Contributing

Work on a branch, install dev-dependencies, respect coding style & run tests before submitting a bug fix or a feature.

    $ git clone https://github.com/rodydavis/postcss-color-hct.git
    $ git checkout -b patch-1
    $ npm install
    $ npm test

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
