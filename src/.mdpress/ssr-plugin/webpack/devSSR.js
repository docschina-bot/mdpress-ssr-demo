const {
    ReactSSRClientPlugin
} = require("@mdpress/core/lib/node/webpack/lib/webpack-plugin/client");
const safeParser = require("postcss-safe-parser");
const CSSExtractPlugin = require("mini-css-extract-plugin");

function handleDevSSR(config) {
    function createCSSRule(lang, test) {
        const baseRule = config.module.rule(lang).test(test).sideEffects(true);
        const modulesRule = baseRule.oneOf("modules").resourceQuery(/module/);
        const normalRule = baseRule.oneOf("normal");

        applyLoaders(modulesRule);
        applyLoaders(normalRule);

        function applyLoaders(rule) {
            rule.use("style-loader").loader(CSSExtractPlugin.loader);
        }
    }

    const siteConfig = {};

    createCSSRule("css", /\.css$/);
    createCSSRule("postcss", /\.p(ost)?css$/);
    createCSSRule("scss", /\.scss$/, "sass-loader", siteConfig.scss);
    createCSSRule(
        "sass",
        /\.sass$/,
        "sass-loader",
        Object.assign({ indentedSyntax: true }, siteConfig.sass)
    );
    createCSSRule("less", /\.less$/, "less-loader", siteConfig.less);
    createCSSRule(
        "stylus",
        /\.styl(us)?$/,
        "stylus-loader",
        Object.assign(
            {
                preferPathResolver: "webpack"
            },
            siteConfig.stylus
        )
    );

    config.plugin("ssr-client").use(ReactSSRClientPlugin, [
        {
            filename: "manifest/client.json"
        }
    ]);

    config
        .plugin("optimize-css")
        .use(require("optimize-css-assets-webpack-plugin"), [
            {
                canPrint: false,
                cssProcessorOptions: {
                    parser: safeParser,
                    autoprefixer: { disable: true },
                    mergeLonghand: false
                }
            }
        ]);

    config.plugin("extract-css").use(CSSExtractPlugin, [
        {
            filename: "assets/css/styles.[chunkhash:8].css"
        }
    ]);

    // ensure all css are extracted together.
    // since most of the CSS will be from the theme and very little
    // CSS will be from async chunks
    config.optimization.splitChunks({
        cacheGroups: {
            styles: {
                name: "styles",
                // necessary to ensure async chunks are also extracted
                test: (m) => {
                    return /css\/mini-extract/.test(m.type);
                },
                chunks: "all",
                enforce: true
            }
        }
    });
}

module.exports = handleDevSSR;
