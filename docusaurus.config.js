module.exports = {
  title: '演技熊的随想',
  tagline: 'Hi there 👋',
  url: 'https://blognew.gaoqixhb.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: '', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.
  onBrokenLinks: 'ignore',
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN']
  },
  themeConfig: {
    hideableSidebar: true,
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
        {to: 'blog', label: 'Blog', position: 'right'},
        {
          label: '标签',
          to: 'blog/tags',
          position: 'right',
        },
        {
          label: '归档',
          to: 'blog/archive',
          position: 'right',
        },
        {
          type: "doc",
          docId: "hello",
          position: "right",
          label: "Notes",
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
              lable: 'DocSearch by Algolia',
              href: 'https://www.algolia.com'
            },
            {
              "label": "People illustrations by Storyset",
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
          blogSidebarCount: 5,
          postsPerPage: 20,
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 300}}),
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
