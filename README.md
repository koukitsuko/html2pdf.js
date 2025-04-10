# @koukitsuko/html2pdf.js

A fork of [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) with modern build tooling and improved HTML rendering.

## Changes from the original

This fork makes the following improvements to the original html2pdf.js:

1. Replaces `html2canvas` with `html2canvas-pro` for improved HTML rendering
2. Uses modern build tooling to provide ESM, CommonJS, and UMD builds
3. Simplified package structure for easier use in modern JavaScript environments

## Installation

```bash
# Using npm
npm install @koukitsuko/html2pdf.js

# Using pnpm
pnpm add @koukitsuko/html2pdf.js
```

## Usage Examples

### ESM Import (Recommended)

```js
import html2pdf from '@koukitsuko/html2pdf.js';

// Generate PDF from element
const element = document.getElementById('element-to-print');
html2pdf().from(element).save('my-pdf.pdf');
```

### CommonJS

```js
const html2pdf = require('@koukitsuko/html2pdf.js');

// Generate PDF from element
const element = document.getElementById('element-to-print');
html2pdf().from(element).save('my-pdf.pdf');
```

## Documentation

For detailed API documentation, options, and advanced usage, please refer to the [original html2pdf.js documentation](https://github.com/eKoopmans/html2pdf.js#usage).

## Development

### Build Commands

```bash
# Install dependencies
pnpm install

# Build development version
pnpm run dev

# Build production version
pnpm run build
```

### Building and Contributing

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Make changes to files in the `src` directory
4. Build with `pnpm run build`
5. Test your changes
6. Submit a pull request

## Credits

This project is a fork of [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) by [Erik Koopmans](https://github.com/eKoopmans).

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2017-2019 Erik Koopmans <[http://www.erik-koopmans.com/](http://www.erik-koopmans.com/)>