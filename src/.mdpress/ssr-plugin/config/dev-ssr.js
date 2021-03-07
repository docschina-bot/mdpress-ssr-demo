const path = require('path');
const nodemon = require("nodemon");
const createServerConfig = require("@mdpress/core/lib/node/webpack/createServerConfig");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const { optimizeServerConfig } = require("../webpack/util");
const { proxyDocsPage } = require('./util');

module.exports = {
    afterServer: async () => {
        if (process.env.DEV_SSR) {
            const bffPort = process.env.BFF_PORT;

            nodemon({
                script: path.resolve(__dirname, "../bff/index.js"),
                ext: "js json",
                watch: path.resolve(__dirname, "../bff"),
                env: process.env
            });

            nodemon
                .on("start", function () {
                    console.log("BFF has started ", bffPort);
                })
                .on("quit", function () {
                    console.log("BFF has quit");
                    process.exit();
                })
                .on("restart", function (files) {
                    console.log("BFF restarted due to: ", files);
                });
        }
    },
    beforeServer: async (app,server,context) => {
        if (process.env.DEV_SSR) {
            const ssrWebpack = createServerConfig(context);
            optimizeServerConfig(ssrWebpack);
            const ssrCompiler = webpack(ssrWebpack.toConfig());

            app.use(
                webpackMiddleware(ssrCompiler, {
                    publicPath: "/",
                    serverSideRender: true
                })
            );
            app.use(require("webpack-hot-middleware")(ssrCompiler));


            proxyDocsPage(app,process.env.BFF_PORT)
        }
    }
};