<template>
  <div class="home">
    <Home />
    <div v-if="posts.length > 0">
      <div class="getposts" v-for="post in posts" :key="post.id">
        <div class="post">
          <router-link :to="'/post/' + post.id">
            <div class="title">
              {{ post.title }}
            </div>
            <img
              class="imagepost"
              v-if="post.imageUrl"
              :src="getImageUrl(post.imageUrl)"
            />
            <div class="desc">
              {{ shortDescription(post.description) }}
            </div>
          </router-link>
        </div>
      </div>
      <div>
        <font-awesome-icon
          v-if="posts.length < postsCount"
          @click="fetchPosts(posts.length)"
          icon="plus-circle"
        />
      </div>
    </div>
    <div v-else>
      <div class="empty">Il n'y a pas encore de posts !</div>
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
    ...mapState(["posts", "postsCount"]),
    ...mapGetters(["getImageUrl"]),
    shortDescription: () => (description) => {
      return description.length > 200
        ? description.slice(0, 200) + "..."
        : description;
    },
  },
  async created() {
    let page = parseInt(this.$route.query.page);
    let offset = page ? (page - 1) * 5 : 0;
    this.fetchPosts(offset);
  },
};
</script>

<style lang="scss">
$colormain: #05387a;

.getposts {
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .post {
    border: 3px solid $colormain;
    margin-bottom: 2rem;
    color: $colormain;
    background: white;
    width: 40rem;
    & a {
      text-decoration: none !important;
      color: #05387a;
    }
    & .imagepost {
      border: 3px solid $colormain;
    }
    & .title {
      color: darken($colormain, 10%);
      font-size: 2.5rem;
      margin-bottom: 1rem;
      margin-top: 1rem;
      padding: 0 7px 0 7px;
    }
    & .desc {
      margin-top: 1rem;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      text-align: justify;
      padding: 0 7px 0 7px;
    }
  }
}

.empty {
  font-size: 2rem;
  color: $colormain;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .getposts {
    flex-direction:row;
  .post {
    width:100%;
  }}
}
</style>