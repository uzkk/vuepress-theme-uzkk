<template>
  <div
    class="input"
    :class="{ focused, disabled }"
    :style="divStyle"
  >
    <i v-if="prefixIcon" :class="'icon-' + prefixIcon" class="prefix"/>
    <input
      :value="value"
      :type="type"
      :style="inputStyle"
      :tabindex="tabindex"
      :placeholder="placeholder"
      :class="{ round, invalid, inactive, monospace }"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.enter.stop="$emit('enter', $event)"
    />
    <i v-if="suffixIcon" :class="'icon-' + suffixIcon" class="suffix"/>
  </div>
</template>

<script>

import stringWidth from 'string-width'

export default {
  props: {
    prefixIcon: String,
    suffixIcon: String,
    placeholder: String,
    disabled: Boolean,
    inactive: Boolean,
    validate: Function,
    tabindex: Number,
    monospace: Boolean,
    value: [ String, Number ],
    type: { default: 'text' },
    round: { default: false },
    size: { default: 1 },
  },

  data: () => ({
    focused: false,
    invalid: false,
  }),

  computed: {
    divStyle() {
      return {
        width: this.monospace && this.inactive && !this.focused
          ? (stringWidth(this.value || this.placeholder) / 1.8 + 2.1) * this.size + 'em'
          : '100%',
      }
    },
    inputStyle() {
      return {
        fontSize: this.size + 'rem',
        paddingLeft: Boolean(this.prefixIcon) + 1 + 'em',
        paddingRight: Boolean(this.suffixIcon) + 1 + 'em',
      }
    },
  },

  methods: {
    onInput(event) {
      if (this.validate) {
        this.invalid = !this.validate(event.target.value)
      }
      this.$emit('input', event.target.value)
    },
    onFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    onBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },
  }
}

</script>

<style lang="stylus" scoped>

$bg4 = #dcdfe6
$fg4 = #c0c4cc

.input
  height 2em
  position relative
  transition 0.3s ease
  display inline-block
  background-color inherit

  > i.prefix, > i.suffix
    color $fg4
    top 50%
    position absolute
    margin-top -0.5em

  > i.prefix
    left 10px
  > i.suffix
    right 10px

  > input
    padding 0
    width 100%
    outline none
    font-size 1rem
    height inherit
    display inline-block
    border-radius 0.3em
    transition 0.3s ease
    box-sizing border-box
    -webkit-appearance none
    background-color inherit
    border 1px solid $bg4

    &.monospace
      font-weight bold
      font-family source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace
    &.round
      border-radius 1em
    &:hover
      border-color $fg4
    &:focus
      border-color $accentColor
    &:hover, &:focus
      background-color #ffffff
    &.inactive:not(:hover):not(:focus)
      border-color transparent
    &.invalid:not(.inactive)
      border-color $warningColor !important
    &::-webkit-input-placeholder
      color $fg4

</style>
