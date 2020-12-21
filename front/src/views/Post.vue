<template>
  <div class="home">
    <Home />
    <router-view :post="post"></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Home from "@/components/Home_Post.vue";
export default {
  name: "PostCreate",
  components: {
    Home,
  },
  props: {
    id: Number,
  },
  computed: {
    ...mapGetters(["getPostById"]),
    post: function () {
      return this.getPostById(this.id) ?? {};
    },
  },
  methods: {
    ...mapActions(["fetchPost"]),
  },
  created() {
    this.fetchPost(this.id).catch(() => this.router.push("/Home"));
  },
};
</script>

<style lang="scss">
</style>