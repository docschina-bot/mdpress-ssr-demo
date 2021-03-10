const { createBundleRenderer } = require("@mdpress/core/lib/node/webpack/lib");
const { path, fs } = require("@mdpress/shared-utils");
const { requestPromise } = require("./util");

async function prepare(app) {
    const { getData } = require("./provider");

    const DEVSSR = process.env.DEV_SSR;

    if (process.env.DEV && !DEVSSR) {
        return;
    }

    const context = JSON.parse(process.env.Context);

    if (!fs.existsSync(path.resolve(context.outDir, "manifest")) && !DEVSSR) {
        return;
    }

    if ("development" !== process.env.NODE_ENV || DEVSSR) {
        // Info: 请求 docsPath 的时候返回 ssr 渲染的内容

        app.get(context.docsPath, async (req, res) => {

            try {
                let serverBundle = DEVSSR
                    ? await requestPromise(
                        `http://127.0.0.1:${process.env.port}${context.base}manifest/server.json`
                    )
                    : require(path.resolve(context.outDir, "manifest/server.json"));
                let clientManifest = DEVSSR
                    ? await requestPromise(
                        `http://127.0.0.1:${process.env.port}/manifest/client.json`
                    )
                    : require(path.resolve(context.outDir, "manifest/client.json"));

                // Info: js 脚本加载两次，react-dom 的 render 执行两次，导致钩子失效
                let template = await fs.readFileSync(context.ssrTemplate, "utf-8");
                template = template.replace('{{{ renderScripts() }}}','');

                const renderer = createBundleRenderer(serverBundle, {
                    clientManifest,
                    runInNewContext: false,
                    inject: true,
                    shouldPrefetch: context.siteConfig.shouldPrefetch || (() => true),
                    template,
                    contentPlaceholder: "<div id='root'></div>"
                });

                // 应该用 match
                const param = path.basename(req.path);
                const doc = await getData(param);

                const ssrContext = {
                    url: req.path,
                    userHeadTags: [],
                    title: "MdPress",
                    lang: "en",
                    description: "",
                    pageMeta: "",
                    version: "1.0.0",
                    doc: doc[0],
                    state: JSON.stringify({
                        doc: doc[0],
                        param
                    })
                };

                let html;
                try {
                    html = await renderer.renderToString(ssrContext);
                    res.set("Content-Type", "text/html");
                } catch (e) {
                    console.error(e);
                    res.redirect(context.base);
                }

                res.send(html);
            } catch (e) {
                res.status(500).send('server error!')
            }

        });
    }
}

module.exports = prepare;