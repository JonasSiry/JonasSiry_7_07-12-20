<template>
  <div class="home">
    <Home />
    <a id="post">
      <img id="image" />
      <div id="title"></div>
      <div id="description"></div>
    </a>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Home from "@/components/Home_Post.vue";
export default {
  name: "getPost",
  components: {
    Home,
  },
  methods: {
    getPost() {
      let posts = this.getData();
      posts.forEach((post) => {
        let postLink = document.getElementById("post");
        postLink.setAttribute("href", "Home?id=" + post.id);

        let image = document.getElementById("image");
        image.setAttribute("src", post.picture);

        let title = document.getElementById("title");
        title.textContent = post.title;

        let description = document.getElementById("description");
        description.textContent = post.description;
      });
    },
  },
  ...mapActions(["getData"]),
};
</script>

<style lang="scss">
$colormain: #05387a;

#post {
  display: flex;
  flex-direction: column;
  border: 3px solid $colormain;
  & #image {
    height: 30rem;
    width: auto;
  }
  & #title {
    font-size: 2rem;
  }
  & #description {
    font-size: 1.5rem;
  }
}
</style>