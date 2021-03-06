const { resolve } = require('path')

const defaultLang = {
  // default pages title
  home: '首页',
  posts: '文章',
  category: '分类',
  categories: '分类',
  tag: '标签',
  tags: '标签',

  // post filter
  allCategories: '全部',
  search: '查找',
  searchHint: '查找标题和摘要',
  noRelatedPosts: '没有相关文章',

  // post meta
  createdAt: '发布时间',
  updatedAt: '最后修改',
  prevPost: '上一篇',
  nextPost: '下一篇',

  // post nav
  toc: '文章目录',
  comments: '评论',

  // hints
  notFound: '哎呀！你要找的页面不在这里',
}

module.exports = (options, context) => {
  options.lang = {
    ...defaultLang,
    ...options.lang,
  }
  options.authors = options.authors || []
  options.comments = options.comments || {}
  options.personalInfo = options.personalInfo || {}
  const { lang } = options

  return {
    name: 'vuepress-theme-uzkk',

    plugins: [
      [require('./plugins/blog'), { lang }],
      '@vuepress/nprogress',
      '@vuepress/back-to-top',
      '@vuepress/search',
      ['medium-zoom', {
        selector: '.content img:not(.no-medium-zoom)',
      }],
      'dehydrate',
      'pangu',
      'mathjax',
      'serve',
      'smooth-scroll',
      [require('@vuepress/plugin-register-components'), {
        componentsDir: resolve(__dirname, 'global'),
      }]
    ],

    alias: {
      '@theme-uzkk': resolve(__dirname),
      '@uzkk/components': resolve(__dirname, 'components'),
    },

    globalUIComponents: 'Iconfont',

    enhanceAppFiles: resolve(__dirname, 'enhanceApp.js'),

    chainWebpack (config, isServer) {
      config.resolve.extensions.merge(['.ts', '.vue', '.yaml', '.yml'])

      config.module
        .rule('yaml')
        .test(/\.ya?ml$/)
        .use('js-yaml-loader')
        .loader('js-yaml-loader')

      if (context.siteConfig.evergreen) {
        config.module
          .rule('js')
          .test(/\.js$/)
          .exclude
            .add(file => !file.startsWith(resolve(__dirname)))
            .end()
          .use('cache-loader')
          .loader('cache-loader')
          .options({
            cacheDirectory: context.cacheDirectory,
            cacheIdentifier: context.cacheIdentifier,
          })
          .end()
          .use('babel-loader')
          .loader('babel-loader')
          .options({
            babelrc: false,
            configFile: false,
            presets: [
              require.resolve('@vue/babel-preset-jsx'),
            ],
          })
      }
    },

    additionalPages () {
      const pages = []
      if (!context.pages.some(p => p.path === '/')) {
        pages.push({
          permalink: '/',
          frontmatter: {
            title: lang.home,
            layout: 'Home',
          },
        })
      }

      pages.push({
        permalink: '/posts/',
        frontmatter: {
          title: lang.posts,
          layout: 'Posts',
        },
      })

      return pages
    },
  }
}
