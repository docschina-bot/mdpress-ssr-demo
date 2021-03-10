const proxy = require("express-http-proxy");

const proxyReqPathResolver = (req) => req.originalUrl;

const proxyDocsPage = (app,port,docsPath) => {
    app.use(
        docsPath,
        proxy(`localhost:${port}${docsPath.replace(/\/\*$/,'')}`, {
            proxyReqPathResolver
        })
    );
};

module.exports.proxyDocsPage = proxyDocsPage;