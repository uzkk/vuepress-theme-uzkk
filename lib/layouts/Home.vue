<template>
  <div class="home">
    <PostsList class="section" />
  </div>
</template>

<script>
import PostsList from './components/PostsList'

export default {
  name: 'Home',

  components: {
    PostsList,
  },
}
</script>
