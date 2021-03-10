const { optimizeServerConfig } = require("./ssr-plugin/webpack/util");
const handleDevSSR = require("./ssr-plugin/webpack/devSSR");

module.exports = () => ({
  base: '/mdpress-ssr-demo/',
  extraWatchFiles: [
    require.resolve('@mdpress/plugin-tencent-cloud-cms')
  ],
  plugins: [
    ["@mdpress/back-to-top"],
    [
      "@mdpress/plugin-tencent-cloud-cms",
      {
        tencentCloudEnv: "test-19a220",
        tencentCloudModel: {
          document: "document",
          sidebar: "sidebar"
        }
      }
    ],
    [
      require("./ssr-plugin"),
      {
        tencentCloudEnv: "test-19a220",
        tencentCloudModel: {
          document: "document",
          sidebar: "sidebar"
        },
        secretId: "xx", // 前往「腾讯云控制台」-「访问密钥」获取
        secretKey: "xxx", // 前往「腾讯云控制台」-「访问密钥」获取
      }
    ]
  ],
  themeConfig: {
    repo: "docschina-bot/mdpress-ssr-demo",
    editLinks: true
  },
  configureWebpack: {
    node: {
      global: true
    }
  },
  chainWebpack(config, isServer) {
    if (isServer) {
      optimizeServerConfig(config);
    } else {
      // Todo: 这部分代码要放 mdpress createClientConfig 源码里
      config.optimization.splitChunks({
        maxInitialRequests: 10, // This one!
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            name: "react",
            priority: 90,
            chunks: "all"
          },
          babel: {
            test: (module) => {
              return (
                  module.resource &&
                  module.resource.match("node_modules/babel-standalone")
              );
            },
            name: "babel-standalone",
            priority: 100,
            chunks: "all"
          },
          vendor: {
            chunks: "all",
            test: (module) => {
              return (
                  module.resource &&
                  /\.js$/.test(module.resource) &&
                  module.resource.match("node_modules") &&
                  !module.resource.match("node_modules/babel-standalone")
              );
            },
            name: "vendor"
          }
        }
      });

      // const BundleAnalyzerPlugin  =  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
      // config.plugin('analyze').use(BundleAnalyzerPlugin, [{
      //   analyzerMode: 'static',
      //   reportFilename: 'report.html',
      //   logLevel: 'info'
      // }]);
    }

    if (process.env.DEV_SSR && !isServer) {
      handleDevSSR(config);
    }
  }
});
