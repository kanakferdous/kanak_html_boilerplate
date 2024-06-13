const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const svgSprite = require("gulp-svg-sprite");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browserslist = require("browserslist");
const { spawn } = require("child_process");

// Function to compile Sass to CSS, add prefixes, and minify CSS
function style() {
  const plugins = [autoprefixer({ overrideBrowserslist: browserslist() })];

  return gulp
    .src("./assets/sass/scss/**/*.scss") // Source folder
    .pipe(sourcemaps.init()) // Initialize sourcemaps before compilation
    .pipe(sass().on("error", sass.logError)) // Compile SASS and handle errors
    .pipe(postcss(plugins)) // Apply Autoprefixer via PostCSS
    .pipe(cleanCSS({ compatibility: "ie8" })) // Minify CSS
    .pipe(sourcemaps.write("./maps")) // Write sourcemaps to a separate folder
    .pipe(gulp.dest("./assets/css")); // Destination folder
}

// Function to minify JavaScript files
function script() {
  return gulp
    .src("./assets/sass/js/**/*.js") // Source folder
    .pipe(sourcemaps.init()) // Initialize sourcemaps before minification
    .pipe(terser()) // Minify JavaScript
    .pipe(sourcemaps.write("./maps")) // Write sourcemaps to a separate folder
    .pipe(gulp.dest("./assets/js")); // Destination folder
}

// Function to generate SVG sprite from icons
function generateIcons() {
  return gulp
    .src("./assets/icons/**/*.svg") // Source folder for individual SVG icons
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg", // Sprite filename (output path relative to ./assets/icons)
          },
        },
      })
    )
    .pipe(gulp.dest("./assets/icons")); // Destination folder for generated sprite
}

// Function to start live-server
function startLiveServer() {
  const server = spawn("live-server");

  server.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  server.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  server.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

// Function to watch files for changes
function watch() {
  gulp.watch("./assets/sass/scss/**/*.scss", style); // Watch SASS files
  gulp.watch("./assets/sass/js/**/*.js", script); // Watch JS files
  gulp.watch("./assets/icons/**/*.svg", generateIcons); // Watch SVG icons
}

// Define complex tasks
const build = gulp.series(
  gulp.parallel(style, script, generateIcons),
  startLiveServer
);

// Export tasks to Gulp CLI
exports.style = style;
exports.script = script;
exports.generateIcons = generateIcons;
exports.watch = watch;
exports.build = build;

// Default task
exports.default = build;
