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
    // algolia: {
    //   appId: 'NEJ4XSDQMO',
    //   apiKey: '2bbb96faa705971e049a5c8e92e425ab',
    //   indexName: 'netlify_43ce8aec-b310-4624-9101-3b46a28ac6b2_dev_all',
    // },
    prism: {
      additionalLanguages: ['java', 'php'],
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
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
              html: `
              <a href="https://vercel.com/" target="_blank" rel="noreferrer noopener" aria-label="Deploys by Vercel">
                <svg role="img" aria-label="Vercel Inc." height="20" viewBox="0 0 283 64" fill="var(--geist-foreground)"><path d="M37 0l37 64H0L37 0zM159.6 34c0-10.3-7.6-17.5-18.5-17.5s-18.5 7.2-18.5 17.5c0 10.1 8.2 17.5 19.5 17.5 6.2 0 11.8-2.3 15.4-6.5l-6.8-3.9c-2.1 2.1-5.2 3.4-8.6 3.4-5 0-9.3-2.7-10.8-6.8l-.3-.7h28.3c.2-1 .3-2 .3-3zm-28.7-3l.2-.6c1.3-4.3 5.1-6.9 9.9-6.9 4.9 0 8.6 2.6 9.9 6.9l.2.6h-20.2zM267.3 34c0-10.3-7.6-17.5-18.5-17.5s-18.5 7.2-18.5 17.5c0 10.1 8.2 17.5 19.5 17.5 6.2 0 11.8-2.3 15.4-6.5l-6.8-3.9c-2.1 2.1-5.2 3.4-8.6 3.4-5 0-9.3-2.7-10.8-6.8l-.3-.7H267c.2-1 .3-2 .3-3zm-28.7-3l.2-.6c1.3-4.3 5.1-6.9 9.9-6.9 4.9 0 8.6 2.6 9.9 6.9l.2.6h-20.2zM219.3 28.3l6.8-3.9c-3.2-5-8.9-7.8-15.8-7.8-10.9 0-18.5 7.2-18.5 17.5s7.6 17.5 18.5 17.5c6.9 0 12.6-2.8 15.8-7.8l-6.8-3.9c-1.8 3-5 4.7-9 4.7-6.3 0-10.5-4.2-10.5-10.5s4.2-10.5 10.5-10.5c3.9 0 7.2 1.7 9 4.7zM282.3 5.6h-8v45h8v-45zM128.5 5.6h-9.2L101.7 36 84.1 5.6h-9.3L101.7 52l26.8-46.4zM185.1 25.8c.9 0 1.8.1 2.7.3v-8.5c-6.8.2-13.2 4-13.2 8.7v-8.7h-8v33h8V36.3c0-6.2 4.3-10.5 10.5-10.5z"></path></svg>
              </a>
              `
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
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
        // When applying `zh` in language, please install `nodejieba` in your project.
        highlightSearchTermsOnTargetPage: true
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-N5L0R05NMC',
        anonymizeIP: true,
      },
    ],
  ],
};
