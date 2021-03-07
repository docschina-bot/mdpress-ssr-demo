const configs = require('./config');

const SSRServePlugin = (options, context) => {
    const bffPort = (options.port || context.siteConfig.port || 3000) + 1;
    Object.assign(process.env,{
        BFF_PORT: bffPort,
        Context: JSON.stringify({
            base: context.base,
            siteConfig: context.siteConfig,
            outDir: context.outDir,
            ssrTemplate: context.ssrTemplate
        }),
        TENCENT_CLOUD_ENV: options.tencentCloudEnv,
        CMS_DOCUMENT: options.tencentCloudModel
            ? options.tencentCloudModel.document
            : "document",
        CMS_SIDEBAR: options.tencentCloudModel
            ? options.tencentCloudModel.sidebar
            : "sidebar",
        SECRETID: options.secretId,
        SECRETKEY: options.secretKey
    });

    const afterServer = async (app, server) => {
        let port;

        // mdpress server
        if (server.address) {
            port = server.address().port;
        }

        // webpack-dev-server
        if (server.options) {
            port = server.options.port;
        }

        Object.assign(process.env,{
            port,
        });

        configs.forEach(config => config.afterServer(app, server,context));
    };
    const beforeServer = async (app, server) => {
        // mdpress server
        if (server.address) {
            process.env.NODE_ENV = "production";
        }

        configs.forEach(config => config.beforeServer(app, server,context));
    };
    return {
        name: "mdpress-plugin-ssr",
        plugins: [
            [
                "serve",
                {
                    removeMainfest: false,
                    beforeServer,
                    afterServer
                },
                context
            ]
        ],
        beforeDevServer: beforeServer,
        afterDevServer: afterServer
    };
};
module.exports = SSRServePlugin;