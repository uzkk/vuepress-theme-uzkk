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

import FadeSlideTransition from '../../transitions/FadeSlide'
import TheHeaderNavbar from './HeaderNavbar'
import TheHeaderBanner from './HeaderBanner'

export default {
  components: {
    TheHeaderNavbar,
    TheHeaderBanner,
  },

  computed: {
    headerStyle () {
      const { thumbnail } = this.$frontmatter
      return thumbnail ? {
        backgroundImage: `url(${thumbnail})`,
      } : {
        border: 'none',
        marginBottom: '-1rem',
      }
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
  background-size cover
  background-repeat no-repeat
  background-color transparent
  background-position center
  background-attachment scroll
  transition all 0.5s ease-in-out
  border-bottom 1px solid $borderColor

</style>
