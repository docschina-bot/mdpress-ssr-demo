module.exports = [{
    "_id": "28ee4e3e6041e65508ff53000c0356c9",
    "content": "# Markdown 拓展\n\n## 标题锚点\n\n所有的标题将会自动地应用锚点链接，锚点的渲染规则可以通过 enhanceApp 中 `mdConfig.anchor` 来配置。\n\n## 链接\n\n### 内部链接\n\n网站内部的链接，将会被转换成 `<a>` 用于 SPA 导航。同时，站内的每一个文件夹下的 `README.md` 或者 `index.md` 文件都会被自动编译为 `index.html`，对应的链接将被视为 `/`。\n\n以如下的文件结构为例：\n\n```\n.\n├─ README.md\n├─ foo\n│  ├─ README.md\n│  ├─ one.md\n│  └─ two.md\n└─ bar\n├─ README.md\n├─ three.md\n└─ four.md\n```\n\n\n\n假设你现在在 `foo/one.md` 中：\n\n``` md\n[Home](/) <!-- 跳转到根部的 README.md -->\n[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->\n[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->\n[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->\n[bar - four](../bar/four.html) <!-- 也可以用 .html -->\n```\n\n<!--\n### 链接的重定向\n\nMdPress 支持重定向到干净链接。如果一个链接 `/foo` 找不到，MdPress 会自行寻找一个可用的 `/foo/` 或 `/foo.html`。反过来，当 `/foo/` 或 `/foo.html` 中的一个找不到时，MdPress 也会尝试寻找另一个。借助这种特性，我们可以通过官方插件 [mdpress-plugin-clean-urls]() 定制你的网站路径。\n\n::: tip 注意\n无论是否使用了 permalink 和 clean-urls 插件，你的相对路径都应该依赖于当前的文件结构来定义。在上面的例子中，即使你将 `/foo/one.md` 的路径设为了 `/foo/one/`，你依然应该通过 `./two.md` 来访问 `/foo/two.md`。\n:::\n-->\n\n### 外部链接\n\n外部的链接将会被自动地设置为  `target=\"_blank\" rel=\"noopener noreferrer\"`:\n\n- [react.org](https://reactjs.org/)\n- [MdPress on GitHub](https://github.com/docschina/mdpress)\n\n你可以自定义通过配置 enhanceApp 中 `mdConfig.externalLinks` 来自定义外部链接的特性。\n\n\n",
    "name": 2,
    "path": "markdown",
    "_createTime": 1614931541786,
    "_updateTime": 1614931778961
}];