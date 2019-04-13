<template>
  <div>
    <PageHeader v-if="$frontmatter.header !== false"/>

    <main class="main-container">
      <FadeSlideTransition>
        <component :is="$layout" :key="$page.path" />
      </FadeSlideTransition>
    </main>

    <PageFooter v-if="$frontmatter.footer !== false"/>
  </div>
</template>

<script>

import '../fonts/index.css'
import FadeSlideTransition from '../transitions/FadeSlide'
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'

export default {
  components: {
    FadeSlideTransition,
    PageHeader,
    PageFooter,
  },
}

</script>

<style lang="stylus" src="../styles/index.styl"/>

<style lang="stylus">

.main-container
  margin 0 auto
  padding 0 1rem
  @media (min-width $MQWide)
    max-width (($MQWide + $MQNarrow) / 2)
  @media (min-width $MQNarrow) and (max-width $MQWide - 1px)
    max-width $MQNarrow
  @media (max-width $MQMobile - 1px)
    padding 0 0.5rem

</style>