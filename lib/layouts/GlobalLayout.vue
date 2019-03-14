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

