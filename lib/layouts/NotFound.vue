<template>
  <div class="main-div not-found">
    <h1>404 Not Found</h1>

    <p>{{ $themeConfig.lang.notFound }}</p>
  </div>
</template>

<script>
export default {
  created () {
  },
}
</script>

<style lang="stylus" scoped>

.not-found
  text-align center

</style>
