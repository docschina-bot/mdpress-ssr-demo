# docschina-bot/mdpress-ssr-demo

线上数据源驱动的 [mdpress](https://docschina.github.io/mdpress/zh/) 项目

## 运行
`npm run dev`

## 项目结构
项目结构遵循 mdpress 约定，`readme.md` 充当首页，`.mdpress/config.js` 作为配置，
项目核心逻辑作为一个插件 plugin-ssr-server 存在。

```
src
└── readme.md
└── .mdpress
    ├── config.js
    └── plugin-online
        ├── client
        │   ├── Layout.js
        │   └── index.js
        └── index.js
```

## 构建
`npm run build`