function optimizeServerConfig(config) {
    config.externals([
        /^react|react-router-dom|moment$/,
        (context, request, callback) => {
            if (needExternal(request)) {
                return callback(null, "commonjs " + request);
            }
            callback();
        }
    ]);

    config.devtool("cheap-source-map");
}

function needExternal(request) {
    const regs = [
        /^(babel-standalone)/i,
        /^(markdown-it)/i,
        /^(react-dom)/i,
        /^(lodash)/i,
        /^(core-js)/i,
        /^(prismjs)/i,
        /^(@cloudbase)/i
    ];
    return regs.some((reg) => request.match(reg));
}

module.exports.optimizeServerConfig = optimizeServerConfig;