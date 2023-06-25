module.exports = {
  title: "YasinChan 的博客",
  description: "Yasinchan 记录前端生活",
  plugins: ["vuepress-plugin-smooth-scroll", "@vuepress/back-to-top"],
  head: [
    ["link", { rel: "icon", href: "/logo.png" }],
    ["script", { src: "/iconfont.js" }],
    [
      "script",
      {},
      'var _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement("script");\n  hm.src = "https://hm.baidu.com/hm.js?7a4553a66f119e8706760cec79cafbbf";\n  var s = document.getElementsByTagName("script")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();',
    ],
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-8C7G0NW5CR",
      },
    ],
    [
      "script",
      {},
      " window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'G-8C7G0NW5CR');",
    ],
  ],
  cache: false,
  markdown: {
    extendMarkdown: (md) => {
      // 使用更多的 markdown-it 插件!
      md.use(require("markdown-it-task-lists"));
    },
  },
  theme: "vuepress-theme-inherit",
  themeConfig: {
    // sidebar: true,
    // sidebar: {
    //   '/post/': [{
    //     title: '博客',
    //     collapsable: false,
    //     children: [
    //       'post-1.md',
    //       'post-2.md',
    //       'post-3.md'
    //     ]
    //   }]
    // },
    // lastUpdated: 'Last Updated', // string | boolean
    nav: [
      { text: "首页", link: "/" },
      { text: "博客", link: "/post/" },
      { text: "标签", link: "/tags/" },
      { text: "归档", link: "/archives/" },
      {
        text: "关于",
        items: [
          {
            text: "此博客",
            link: "/about/blog.md",
          },
          {
            text: "我",
            link: "/about/me.md",
          },
        ],
      },
      {
        text: "好玩",
        items: [
          {
            text: "Quick Meet",
            link: "https://qm.yasinchan.com",
          },
          {
            text: "Typing",
            link: "https://typing.yasinchan.com",
          },
        ],
      },
      { text: "Github", link: "https://github.com/yasinchan" },
    ],
    footerRightHtml:
      '© 2022 <a href="https://github.com/yasinchan">YasinChan</a> · <a href="https://beian.miit.gov.cn">苏ICP备18046434号</a>',
  },
};
