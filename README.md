Project Name
A boilerplate project for front-end development using Gulp, Sass, and SVG sprites.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Gulp Tasks](#gulp-tasks)
- [Folder Structure](#folder-structure)
- [Additional Notes](#additional-notes)
- [License](#license)

# Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/kanakferdous/kanak_html_boilerplate.git
cd your-repo
```

# Install dependencies using npm:

Node version should be 18.15.0
If you don't have it please run:

```bash
nvm install 18.15.0
nvm use 18.15.0
npm install
```

This will install all necessary packages defined in package.json, including Gulp and its plugins.

## Usage

# Development Mode

To start the development environment, run:

```bash
npm run watch
```

This command will compile Sass to CSS, minify JavaScript, generate SVG sprites, start a live-reloading server, and watch for changes in relevant files (scss, js, svg).

# Production Build

For a production-ready build (minified and optimized files), run:

```bash
npm run build
```

This command will compile Sass, minify JavaScript, and generate SVG sprites without starting a live server or watching for changes.

## Available Scripts

Runs the Gulp build task to compile assets for production.

```bash
npm run build
```

Runs the Gulp task to compile Sass files to CSS.

```bash
npm run style
```

Runs the Gulp task to minify JavaScript files.

```bash
npm run script
```

Runs the Gulp task to generate SVG sprites from icons.

```bash
npm run icons
```

Starts the development environment with live-reloading and watches for changes.

```bash
npm run watch
```

## Gulp Tasks

gulpfile.js
The Gulp tasks are defined in gulpfile.js. Here’s a breakdown of the main tasks:

- style: Compiles Sass to CSS, adds vendor prefixes, and minifies CSS.
- script: Minifies JavaScript files.
- generateIcons: Generates an SVG sprite from individual SVG icons.
- watch: Starts a live-reloading server and watches for changes in Sass, JavaScript, and SVG files.
- assets/: Contains development and compiled files.
- .gitignore: Specifies files and directories to ignore in version control.
- gulpfile.js: Defines Gulp tasks for compiling Sass, minifying JS, generating SVG sprites, and starting the live server.
- package.json: Lists dependencies and defines scripts for running Gulp tasks.

## Additional Notes

Ensure live-server is globally installed

```bash
npm install -g live-server
```

for the live-reloading feature to work.
Modify paths and configurations in gulpfile.js as per your project structure and requirements.

## For Icon Uses

this will generate the icons id with the name of icons. so try to use proper name that you can understand you are using icons.

```html
<svg class="icon">
  <use xlink:href="assets/icons/sprite.svg#icon-name"></use>
</svg>
```

## License

ISC License. See LICENSE for details.
