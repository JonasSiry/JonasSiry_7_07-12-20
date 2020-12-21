<template>
  <div class="getposts">
    <div class="post">
      <img
        class="imagepost"
        v-if="post.imageUrl"
        :src="getImageUrl(post.imageUrl)"
      />
      <div class="title">
        {{ post.title }}
      </div>
      <div class="desc">
        {{ post.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ViewPost",
  props: {
    post: Object,
  },
  computed: {
    ...mapGetters(["getImageUrl"]),
  },
};
</script>

<style lang="scss">
</style>