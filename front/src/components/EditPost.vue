<template>
  <form name="form" id="form" novalidate>
    <p>Modifier le post</p>
    <span v-if="error" class="error">{{ error }}</span>

    <div class="form">
      <label>Titre</label>
      <input class="title" v-model="post.title" />
    </div>
    <div class="form">
      <label>Description</label>
      <textarea class="description" v-model="post.description" />
    </div>
    <div class="form">
      <img
        class="imagepost"
        v-if="post.imageUrl"
        :src="getImageUrl(post.imageUrl)"
      />
    </div>
    <buttonUploadFile v-model="newImage" />

    <div class="submit">
      <button type="button" id="submit" @click="submitEditPost">Editer</button>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import buttonUploadFile from "@/components/buttonUploadFile.vue";

export default {
  name: "EditPost",
  components: {
    buttonUploadFile,
  },
  props: {
    post: Object,
  },
  data: function () {
    return {
      newImage: null,
      error: "",
    };
  },
  methods: {
    submitEditPost() {
      var formData = new FormData();
      if (this.newImage) formData.append("image", this.newImage);
      formData.append("title", this.post.title);
      formData.append("description", this.post.description);
      this.editPost({ id: this.post.id, form: formData })
        .then(() => {
          this.$router.push("/post/" + this.post.id);
        })
        .catch((e) => {
          this.error = e.response.data.message;
        });
    },
    ...mapActions(["editPost"]),
  },
  computed: {
    ...mapGetters(["getImageUrl"]),
  },
};
</script>

<style lang="scss">
$colormain: #05387a;
#form {
  & p {
    color: $colormain;
    font-size: 2.5rem;
    font-weight: bold;
  }
  & .imagepost {
    border: 2px solid $colormain;
  }
  & .description {
    font-size: 1.3rem;
    width: 20rem;
    height: 10rem;
    font-family: "Roboto", Arial;
    border: 2px solid $colormain;
    &:focus {
      outline: none;
    }
  }
  & .title {
    font-size:1.5rem;
  }
}
</style>