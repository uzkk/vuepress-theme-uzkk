<template>
  <div class="author-view">
    <img class="no-medium-zoom" :src="author.avatar"/>
    <div class="info">
      <div class="nickname">{{ author.nickname || 'Anonymous' }}</div>
      <div class="description">{{ author.description }}</div>
      <div v-if="author.sns" class="info-card-footer">
        <section class="info-sns clearfix">
          <a
            v-for="(item, name) of sns"
            :key="name"
            :href="item"
            class="sns-link"
            target="_blank"
          >
          </a>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

import IconSns from '../layouts/components/IconSns'

const attrs = ['nickname', 'avatar', 'description', 'sns']

export default {
  components: { IconSns },

  props: ['name', ...attrs],

  computed: {
    author () {
      const author = this.$themeConfig.authors.find(({ name }) => name === this.name) || {}
      attrs.forEach((key) => {
        if (this[key]) {
          author[key] = this[key]
        }
      })
      return author
    },
  },
}

</script>

<style lang="stylus" scoped>

$bgColor = #f0f0f0

.author-view
  display inline-block
  background #ffffff
  border-radius 0.5em
  padding 0.5em
  user-select none
  transition 0.3s ease-in-out
  box-shadow 0 1px 4px 0 rgba(0, 0, 0, .1)

  &:hover
    box-shadow 0 2px 8px 0 rgba(0, 0, 0, .2)

img
  display inline-block
  border-radius 50%
  margin-right 0.5em
  width 75px
  height 75px

.info
  display inline-block

  .nickname
    font-weight bold

</style>

