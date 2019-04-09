<template>
  <div class="collapse-view" :class="{ header: $slots.header, closed: isClosed }">
    <div class="slot-header" @click="onClickHeader" v-if="$slots.header">
      <slot name="header"/>
    </div>
    <collapse-transition
      @before-enter="beforeEnter" @after-enter="afterEnter"
      @before-leave="beforeLeave" @after-leave="afterLeave">
      <div class="collpase-content" v-show="isOpen">
        <slot/>
      </div>
    </collapse-transition>
  </div>
</template>

<script>

import CollapseTransition from '../transitions/Collapse'

function isBoolean (value) {
  return value === true || value === false
}

export default {
  props: {
    open: Boolean,
    initial: String,
  },

  data: () => ({
    isOpen: true,
    isClosed: false,
  }),

  components: {
    CollapseTransition,
  },

  created () {
    if (this.initial) {
      this.isOpen = this.initial === 'open'
      this.onClickHeader = () => this.isOpen = !this.isOpen
    } else {
      this.isOpen = this.open
      this.onClickHeader = () => this.$emit('toggle', event)
      this.$watch('open', value => {
        if (isBoolean(value) && value ^ this.isOpen) this.isOpen = value
      })
    }
    this.isClosed = !this.isOpen
  },

  methods: {
    beforeEnter () {
      this.$emit('before-update')
      this.isClosed = false
    },
    afterEnter () {
      this.$emit('after-update')
    },
    beforeLeave () {
      this.$emit('before-update')
    },
    afterLeave () {
      this.isClosed = true
      this.$emit('after-update')
    },
  },
}

</script>

<style lang="stylus" scoped>

.collapse-view
  position relative

  > .slot-header
    user-select none
    color #303133
    font-weight bold
    border none
    outline none
    cursor pointer
    position relative
    transition 0.3s ease

  > .collpase-content
    position relative
    transition 0.3s ease

    > :last-child
      margin-bottom 0

  &.closed:not(.header)
    border-bottom none

</style>