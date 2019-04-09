<template>
  <label :class="{ focused, disabled, checked: label === model }">
    <span class="radio">
      <span class="inner"></span>
      <input type="radio" :disabled="disabled" :value="label" v-model="model">
    </span>
    <span class="label" v-if="$slots.default || label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>

export default {
  props: {
    value: {},
    label: {},
    disabled: Boolean,
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  data: () => ({
    focused: false,
  }),

  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
    },
  },
}

</script>

<style lang="stylus" scoped>

label
  color #606266
  cursor pointer
  user-select none
  display inline-block
  transition 0.3s ease
  line-height 1em

  > .radio
    outline 0
    line-height 1em

    > span
      vertical-align bottom
      position relative
      display inline-block
      box-sizing border-box
      transition 0.3s ease
      background-color #ffffff
      border 0.07em solid #dcdfe6
      border-radius 100%
      width 1em
      height 1em

    > span::after
      content ""
      width 0.3em
      height 0.3em
      left 50%
      top 50%
      position: absolute
      border-radius 100%
      background-color #ffffff
      transform translate(-50%, -50%) scale(0)
      transition transform .15s ease-in

    > input
      position absolute
      opacity 0
      outline 0
      margin 0
      width 0
      height 0
      z-index -1

  > .label
    line-height 1em
    margin-left 0.2em
    vertical-align baseline

  &:hover > .radio > span
    border-color #409eff

  &.checked > .radio > span
    background-color #409EFF
    border-color #409EFF

    &::after
      transform translate(-50%, -50%) scale(1)

  &.checked
    color #409EFF

</style>
