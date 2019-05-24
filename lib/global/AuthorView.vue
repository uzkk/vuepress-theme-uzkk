<template>
  <div class="author-view">
    <div class="avatar">
      <img class="no-medium-zoom" :src="author.avatar"/>
    </div><div class="info">
      <div class="nickname">{{ author.nickname || 'Anonymous' }}</div>
      <div class="description">{{ author.description }}</div>
      <div v-if="author.sns" class="sns">
        <template v-for="(item, name) of author.sns">
          <a
            class="sns-item"
            v-if="getSNSLink(item, name)"
            :key="name"
            :href="getSNSLink(item, name)"
            :title="item"
            target="_blank"
          >
            <i :class="'icon-' + name"/>
          </a>
          <i
            v-else
            class="sns-item"
            :title="item"
            :key="name"
            :class="'icon-' + name"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>

import IconSns from '../layouts/components/IconSns'
import { SNSLinkMap } from '../utils'

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

  methods: {
    getSNSLink (item, name) {
      return name in SNSLinkMap ? SNSLinkMap[name](item) : undefined
    },
  },
}

</script>

<style lang="stylus" scoped>

.author-view
  width 300px
  margin 0 0.5em 1em
  margin-inline-start 0
  display inline-block
  background #ffffff
  border-radius 0.5em
  user-select none
  transition 0.3s ease-in-out
  box-shadow 0 1px 4px 0 rgba(0, 0, 0, .1)

  &:hover
    box-shadow 0 2px 8px 0 rgba(0, 0, 0, .2)

.avatar
  display inline-block
  padding 0.5em
  border-right 1px solid rgba(0, 0, 0, .1)

img
  border-radius 50%
  width 75px
  height 75px

.info
  display inline-block
  padding 0.5em 0.8em
  vertical-align top

  .nickname
    font-weight bold

  .sns
    line-height 1
    margin-top 0.4em
    font-size 1.2em
    .sns-item:not(:first-child)
      margin-left 2px
    a
      text-decoration none
    i
      color #606266

</style>

