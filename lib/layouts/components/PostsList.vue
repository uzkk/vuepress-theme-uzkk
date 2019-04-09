<template>
  <FadeSlideTransition
    tag="div"
    class="posts-list"
    direction="x"
    group
  >
    <PostsListItem
      v-for="post in listPosts"
      :key="post.path"
      :post="post"
    />
  </FadeSlideTransition>
</template>

<script>
import FadeSlideTransition from '../../transitions/FadeSlide'
import PostsListItem from './PostsListItem'

export default {
  name: 'PostsList',

  components: {
    FadeSlideTransition,
    PostsListItem,
  },

  props: {
    posts: {
      type: Array,
      required: false,
      default: null,
    },
  },

  computed: {
    listPosts () {
      return this.posts || this.$posts
    },
  },
}
</script>
