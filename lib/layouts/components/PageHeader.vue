<template>
  <header
    class="header"
    :style="headerStyle"
  >
    <HeaderNavbar />
    <HeaderBanner :key="$route.path" v-if="$layout !== 'NotFound'">
      <slot>
        <h1>
          {{ $frontmatter.title || $page.title || $site.title || '' }}
        </h1>
      </slot>
    </HeaderBanner>
  </header>
</template>

<script>

import FadeSlideTransition from '../../transitions/FadeSlide'
import HeaderNavbar from './HeaderNavbar'
import HeaderBanner from './HeaderBanner'

export default {
  components: {
    HeaderNavbar,
    HeaderBanner,
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
