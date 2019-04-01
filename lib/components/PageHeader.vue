<template>
  <header
    class="header"
    :style="headerStyle"
  >
    <TheHeaderNavbar />
    <TheHeaderBanner :key="$route.path" v-if="hasBanner">
      <slot>
        <h1>
          {{ $page.frontmatter.title || $page.title || $site.title || '' }}
        </h1>
      </slot>
    </TheHeaderBanner>
  </header>
</template>

<script>
import FadeSlideTransition from '../transitions/FadeSlide.vue'
import TheHeaderNavbar from './TheHeaderNavbar.vue'
import TheHeaderBanner from './TheHeaderBanner.vue'

export default {
  name: 'TheHeader',

  components: {
    TheHeaderNavbar,
    TheHeaderBanner,
  },

  computed: {
    background () {
      return this.$site.themeConfig.headerBackground || {}
    },

    headerStyle () {
      const { thumbnail } = this.$frontmatter
      return thumbnail ? {
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-attachment': 'scroll',
        'background-image': `url(${thumbnail})`,
      } : {}
    },

    hasBanner () {
      return typeof this.$frontmatter.header === 'object'
        ? this.$frontmatter.header.banner
        : true
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '~@theme/styles/variables'

.header
  background-color transparent
  transition all 0.5s ease-in-out
</style>
