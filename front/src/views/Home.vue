<template>
  <div class="home">
    <Home />
    <div id="empty">Il n'y a pas encore de posts !</div>
    <div class="getposts" v-for="post in posts" :key="post.id">
      <router-link class="post" :to="'/post/' + post.id">
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
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Home from "@/components/Home_Post.vue";
export default {
  name: "getPost",
  components: {
    Home,
  },
  methods: {
    ...mapActions(["fetchPosts"]),
  },
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["getImageUrl"]),
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style lang="scss">
$colormain: #05387a;

.getposts {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  .post {
    display: flex;
    flex-direction: column;
    border: 3px solid $colormain;
    margin-bottom: 2rem;
    text-decoration: none;
    color: $colormain;
    background: white;
    & .imagepost {
      width: 15rem;
      height: auto;
      border-bottom: 3px solid $colormain;
    }
    & .title {
      color: darken($colormain, 10%);
      font-size: 2rem;
      text-decoration: underline;
      margin-bottom: 1rem;
      margin-top:1rem;
    }
    & .desc {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
}

#empty {
  font-size: 2rem;
  color: $colormain;
  margin-bottom:2rem;
}
</style>