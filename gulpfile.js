const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const svgSprite = require("gulp-svg-sprite");
const connect = require("gulp-connect");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

// Function to compile Sass to CSS
function style() {
  return gulp
    .src("./assets/sass/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./assets/css"))
    .pipe(connect.reload()); // Reload connect server for live-server
}

// Function to minify JavaScript files
function script() {
  return gulp
    .src("./assets/sass/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./assets/js"))
    .pipe(connect.reload()); // Reload connect server for live-server
}

// Function to generate SVG sprite from icons
function generateIcons() {
  return gulp
    .src("./assets/icons/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(gulp.dest("./assets/icons"))
    .pipe(connect.reload()); // Reload connect server for live-server
}

// Function to start connect server
function startServer(done) {
  connect.server({
    root: "./",
    livereload: true,
    port: 8080,
  });
  done();
}

// Function to watch files for changes
function watch() {
  gulp.watch("./assets/sass/scss/**/*.scss", style);
  gulp.watch("./assets/sass/js/**/*.js", script);
  gulp.watch("./assets/icons/**/*.svg", generateIcons);
}

// Define the default task
exports.default = gulp.series(
  gulp.parallel(style, script, generateIcons),
  startServer,
  watch
);
