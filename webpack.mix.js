const mix = require("laravel-mix");
const path = require("path");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/app.js", "public/js/app.js")
    .sass("resources/sass/app.scss", "public/css/")
    .copy("resources/assets/images", "public/images")
    .copy("resources/css/loader.css", "public/css")
    .vue({ version: 2 })
    .options({
        postCss: [require("autoprefixer")],
    })
    .webpackConfig({
        resolve: {
            alias: {
                "@resources": path.resolve(__dirname, "resources/"),
                "@": path.resolve(__dirname, "resources/js/src/"),
                "@core": path.resolve(__dirname, "resources/js/src/@core"),
                "@validations": path.resolve(
                    __dirname,
                    "resources/js/src/@core/utils/validations"
                ),
            },
        },
        devServer: { allowedHosts: "all" },
    });

if (mix.inProduction()) {
    mix.version();
} else {
    mix.browserSync("http://127.0.0.1:8000/");
}
