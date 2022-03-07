module.exports = {
  title: '演技熊随想',
  tagline: 'The tagline of my site',
  url: 'https://blognew.gaoqixhb.com',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: '', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.
  onBrokenLinks: 'ignore',
  themeConfig: {
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
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          label: '标签',
          to: 'tags',
          position: 'right',
        },
        {
          label: '归档',
          to: 'archive',
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
        docs: false,
        blog: {
          blogSidebarTitle: '全部博文',
          blogSidebarCount: 0,
          postsPerPage: 20,
          showReadingTime: true,
          readingTime: ({content, frontMatter, defaultReadingTime}) =>
            defaultReadingTime({content, options: {wordsPerMinute: 300}}),
          path: './blog',
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
