<template>
  <div class="category">
    <PostsList
      class="section"
      :posts="$category.posts"
    />
  </div>
</template>

<script>
import PostsList from './components/PostsList'

export default {
  name: 'Category',

  components: {
    PostsList,
  },
}
</script>
