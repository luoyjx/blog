module.exports = {
  title: '演技熊的随想',
  tagline: 'Hi there 👋 这里分享一些技术经验、学习总结、踩过的坑、生活感悟等等',
  url: 'https://blognew.gaoqixhb.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: '', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.
  onBrokenLinks: 'ignore',
  customFields: {
    // Put your custom environment here
    gitalk: {
      clientId: process.env.GITALK_ID,
      clientSecret: process.env.GITALK_SECRET,
      repo: 'blog',
      owner: 'luoyjx',
      admin: ['luoyjx'],
    },
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN']
  },
  themeConfig: {
    metadata: [{
      name: 'keywords',
      content: 'docker, golang, javascirpt, k8s, kubernetes, mysql, node.js, react'
    }],
    docs: {
      sidebar: {
        hideable: true
      }
    },
    algolia: {
      appId: '9IONV53BRI',
      apiKey: 'db22115ab7932c062bdba64ca76ea717',
      indexName: 'gaoqixhb',
    },
    prism: {
      additionalLanguages: ['java', 'php'],
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      hideOnScroll: true,
      title: '演技熊随想',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/gaoqi_blog_logo.png',
      // },
      items: [
        {to: 'blog', label: '文章', position: 'left'},
        {
          type: "doc",
          docId: "hello",
          position: "left",
          label: "笔记归类",
        },
        {
          label: '所有文章',
          to: 'blog/archive',
          position: 'right',
        },
        {
          label: '标签',
          to: 'blog/tags',
          position: 'right',
        },
        {
          href: 'https://github.com/luoyjx',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/luoyjx',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/luoyjx',
            },
            {
              label: 'Deployed by Vercel',
              href: 'https://vercel.com',
            },
            {
              label: 'Algolia DocSearch',
              href: 'https://docsearch.algolia.com'
            },
            {
              label: "People illustrations by Storyset",
              href: "https://storyset.com/people"
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          blogSidebarTitle: '全部博文',
          blogSidebarCount: 0,
          postsPerPage: 10,
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 100}}),
          path: './blog',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    // ... Your other plugins.
    // [
    //   require.resolve("@easyops-cn/docusaurus-search-local"),
    //   {
    //     // ... Your options.
    //     // `hashed` is recommended as long-term-cache of index file is possible.
    //     hashed: true,
    //     // For Docs using Chinese, The `language` is recommended to set to:
    //     // ```
    //     language: ["en", "zh"],
    //     // ```
    //     // When applying `zh` in language, please install `nodejieba` in your project.
    //     highlightSearchTermsOnTargetPage: true
    //   },
    // ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-N5L0R05NMC',
        anonymizeIP: true,
      },
    ],
  ],
};
