<template>
  <div class="collapse-view">
    <div class="collapse-header" @click="onClickHeader" v-if="hasHeader">
      <slot name="header-open" v-if="isOpen">
        <slot name="header"/>
      </slot>
      <slot name="header-closed" v-else>
        <slot name="header"/>
      </slot>
    </div>
    <collapse-transition>
      <div class="collapse-content" v-show="isOpen">
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
  }),

  components: {
    CollapseTransition,
  },
  
  computed: {
    hasHeader () {
      return this.$slots.header
        || this.$slots['header-open'] && this.isOpen
        || this.$slots['header-closed'] && !this.isOpen
    },
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
  },
}

</script>

<style lang="stylus" scoped>

.collapse-view
  position relative

  > .collapse-header
    user-select none
    color #303133
    font-weight bold
    border none
    outline none
    cursor pointer
    position relative
    transition 0.3s ease

  > .collapse-content
    position relative
    transition 0.3s ease

    > :last-child
      margin-bottom 0

</style>
