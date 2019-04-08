<template>
  <div class="banner">
    <div class="container">
      <div class="center">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>

@require '~@theme/styles/variables'

.banner
  cursor default
  height $bannerHeight
  color #000
  .container
    height 100%
    display flex
    align-items center
    justify-content center
    .center
      z-index 19
      text-align center
      transition all 0.2s ease-in-out

</style>
