<template>
  <div class="post-container clearfix" :class="{ showAside }">
    <article class="post section">
      <Content
        :key="$page.path"
        class="post-content"
      />
    </article>

    <aside class="aside">
      <InfoCard class="section" />
      <PostMeta />
      <PostNavCard
        v-if="$page.type === 'post'"
        class="section"
      />
    </aside>
  </div>
</template>

<script>
import PostMeta from './components/PostMeta'
import PostNavCard from './components/PostNavCard'
import InfoCard from './components/InfoCard'

export default {
  name: 'Post',

  components: {
    PostMeta,
    PostNavCard,
    InfoCard,
  },

  computed: {
    showAside () {
      if (this.$page.frontmatter.aside !== undefined) {
        return this.$page.frontmatter.aside
      }
      return true
    },
  },
}
</script>

<style lang="stylus">

@require '~@theme/styles/variables'

.post-container
  position relative
  margin 1rem auto
  aside
    position relative

  @media (max-width $MQMobile - 1px)
    margin 0.5rem auto

  &:not(.showAside)
    article
      width 100%
    aside
      display none
      
  @media (max-width $MQMobile - 1px)
    article
      width 100%
    aside
      display none

  &.showAside
    @media (min-width $MQWide)
      article
        width 75%
      aside
        width 25%

    @media (max-width $MQWide - 1px) and (min-width $MQMobile)
      article
        width 70%
      aside
        width 30%

    @media (min-width $MQMobile)
      article
        float left
      aside
        float left
        padding-left 1rem

</style>
