const proxy = require("express-http-proxy");

const proxyReqPathResolver = (req) => req.originalUrl;

const proxyDocsPage = (app,port) => {
    app.use(
        "/docs/*",
        proxy(`localhost:${port}/docs`, {
            proxyReqPathResolver
        })
    );
};

module.exports.proxyDocsPage = proxyDocsPage;