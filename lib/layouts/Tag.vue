<template>
  <div class="tag">
    <PostsList
      class="main-div"
      :posts="$tag.posts"
    />
  </div>
</template>

<script>
import PostsList from './components/PostsList'

export default {
  name: 'Tag',

  components: {
    PostsList,
  },
}
</script>
