<template>
  <div>
    <TheHeader />

    <main class="main">
      <TransitionFadeSlide>
        <component :is="layout" :key="$page.path" />
      </TransitionFadeSlide>
    </main>

    <TheFooter />
  </div>
</template>

<script>

import TransitionFadeSlide from '../components/TransitionFadeSlide.vue'
import TheHeader from '../components/TheHeader.vue'
import TheFooter from '../components/TheFooter.vue'

export default {
  components: {
    TransitionFadeSlide,
    TheHeader,
    TheFooter,
  },

  computed: {
    layout () {
      const layout = this.$page.frontmatter.layout
      if (layout && this.$vuepress.getLayoutAsyncComponent(layout)) {
        return layout
      }

      if (!this.$page.path) {
        return 'NotFound'
      }

      return 'Home'
    },
  },
}

</script>

<style lang="stylus" src="../styles/index.styl"/>

<style lang="stylus">

main
  margin 0 auto
  padding 0 1rem
  @media (min-width $MQWide)
    max-width (($MQWide + $MQNarrow) / 2)
  @media (min-width $MQNarrow) and (max-width $MQWide - 1px)
    max-width $MQNarrow
  @media (max-width $MQMobile - 1px)
    padding 0 0.5rem

</style>