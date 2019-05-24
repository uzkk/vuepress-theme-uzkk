<template>
  <header
    class="header"
    :style="headerStyle"
  >
    <HeaderNavbar />
    <HeaderBanner :key="$route.path" v-if="$frontmatter.banner !== false && $layout !== 'NotFound'">
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
      const { thumbnail, banner } = this.$frontmatter
      return thumbnail ? {
        backgroundImage: `url(${thumbnail})`,
      } : {
        border: 'none',
        marginBottom: banner === false ? '0.5rem' : '-1rem',
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
