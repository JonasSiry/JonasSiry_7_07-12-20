// La page qui réunit viewpost et editpost.

<template>
  <div class="home">
    <Home />
    <router-view :post="post" v-if="post"></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Home from "@/components/Home_Post.vue";
export default {
  name: "Post",
  components: {
    Home,
  },
  props: {
    id: Number,
  },
  computed: {
    ...mapGetters(["getPostById"]),
    post: function () {
      return this.getPostById(this.id);
    },
  },
  methods: {
    ...mapActions(["fetchPost"]),
  },
  watch: {
    id: function (newId, oldId) {
      this.fetchPost(newId).then(() => {
        if (!this.post) this.$router.push("/post/" + oldId);
      }); // Pour la navigation normale
    },
  },
  created() {
    this.fetchPost(this.id).then(() => {
      if (!this.post) this.$router.push("/home");
    }); // Pour f5
  },
};
</script>