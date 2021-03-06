import Iconfont from './layouts/components/Iconfont'

export default ({ Vue }) => {
  Vue.prototype.$uzkk = Vue.$uzkk = {}

  Vue.component('Iconfont', Iconfont)

  Vue.mixin({
    computed: {
      $layout () {
        const layout = this.$page.frontmatter.layout
        if (layout && (this.$vuepress.getLayoutAsyncComponent(layout) || this.$vuepress.getVueComponent(layout))) {
          return layout
        }
  
        if (!this.$page.path) {
          return 'NotFound'
        }
  
        return 'Home'
      },
    },
  })

  Vue.prototype.$getAuthorName = function (contrib) {
    const author = this.$themeConfig.authors.find(a => a.name === contrib)
    if (author) {
      return author.nickname
    } else {
      return contrib
    }
  }
}
