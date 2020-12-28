// La page de création de posts.

<template>
  <div class="home">
    <Home />
    <form name="form" id="form" novalidate>
      <div class="form">
        <div id="errorpost">{{ error }}</div>
        <label>Titre</label>
        <input
          type="text"
          id="title"
          v-model="title"
          placeholder="Titre"
          name="Titre"
          required:true
        />
      </div>

      <div class="form">
        <label>Description</label>
        <textarea class="description" v-model="description"
        placeholder="Description" name="Description" required: true/>
      </div>

      <buttonUploadFile v-model="file" />

      <div class="submit">
        <button type="button" id="submit" @click="uploadPost">Poster</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import buttonUploadFile from "@/components/buttonUploadFile.vue";
import Home from "@/components/Home_Post.vue";
export default {
  name: "PostCreate",
  components: {
    Home,
    buttonUploadFile,
  },
  data: function () {
    return {
      error: "",
      title: "",
      description: "",
      file: null,
      imageLabel: "Choisissez une image",
    };
  },
  methods: {
    uploadPost() {
      var formData = new FormData();
      formData.append("image", this.file);
      formData.append("title", this.title);
      formData.append("description", this.description);
      if (this.title && this.description != "") {
        this.createPost(formData)
          .then(() => {
            this.$router.push("/home");
          })
          .catch((e) => {
            this.error = e.response.data.message;
          });
      } else {
        this.error = "Votre post doit contenir un titre et une description !";
      }
    },
    ...mapActions(["createPost"]),
  },
};
</script>

<style lang="scss">
$colormain: #05387a;

#form {
  & #title {
    font-size: 1.3rem;
    width: 20rem;
    height: 1.5rem;
    border: 2px solid $colormain;
    &:focus {
      outline: none;
    }
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
}
#cross {
  color: rgb(177, 21, 21);
  font-size: 2rem;
  cursor: pointer;
  margin-top: 0.2rem;
}

#errorpost {
  color: rgb(177, 21, 21);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>