module.exports = {
  title: 'YasinChan',
  plugins: ['vuepress-plugin-smooth-scroll', '@vuepress/back-to-top'],
  head: [
    ['link', {rel: 'icon', href: '/logo.png'}],
    ['script', { src: '/iconfont.js' }]
  ],
  cache: false,
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
      {text: '首页', link: '/'},
      {text: '博客', link: '/post/'},
      {text: '标签', link: '/tags/'},
      {text: '归档', link: '/archives/'},
      {
        text: '关于',
        items: [
          {
            text: '此博客',
            link: '/about/blog.md'
          },
          {
            text: '我',
            link: '/about/me.md'
          }
        ]
      },
      {text: 'Github', link: 'https://github.com/yasinchan'},
    ]
  }
}
