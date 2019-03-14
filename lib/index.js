const { resolve } = require('path')
const mergeable = require('vuepress-mergeable')

module.exports = mergeable(({ lang }, context) => ({
  name: 'vuepress-theme-meteorlxy',

  plugins: [
    [require('./plugins/blog'), { lang }],
    '@vuepress/plugin-nprogress',
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/search',
    'vuepress-plugin-smooth-scroll',
    ['@vuepress/plugin-container', { type: 'tip' }],
    ['@vuepress/plugin-container', { type: 'warning' }],
    ['@vuepress/plugin-container', { type: 'danger' }],
  ],

  globalUIComponents: 'Iconfont',

  enhanceAppFiles: [
    resolve(__dirname, 'enhanceApp.js'),
  ],

  chainWebpack (config, isServer) {
    if (isServer === false) {
      config.node.set('Buffer', false)
    }

    if (context.siteConfig.evergreen) {
      config.module
        .rule('js')
        .test(/\.js$/)
        .exclude.add(filePath => {
          if (filePath.startsWith(resolve(__dirname))) {
            return false
          }
          return true
        }).end()
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

  ready () {
    context.addPage({
      permalink: '/',
      frontmatter: {
        title: lang.home,
        layout: 'Home',
      },
    })

    context.addPage({
      permalink: '/posts/',
      frontmatter: {
        title: lang.posts,
        layout: 'Posts',
      },
    })
  },
}), {}, {
  comments: {},
  personalInfo: {},
  lang: require('./langs/en-US'),
})
