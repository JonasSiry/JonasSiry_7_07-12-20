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
        <textarea id="description" v-model="description"
        placeholder="Description" name="Description" required: true/>
      </div>

      <div class="form">
        <input type="file" name="file" id="file" @change="updateFile" />
        <label for="file">{{ imageLabel }}</label>
        <span v-if="file"
          ><font-awesome-icon icon="times-circle" @click="deleteFile"
        /></span>
      </div>
      <div class="submit">
        <button type="button" id="submit" @click="uploadPost">Poster</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Home from "@/components/Home_Post.vue";
export default {
  name: "Post",
  components: {
    Home,
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
    updateFile(e) {
      if (!e.target.files.length) {
        return;
      }
      this.file = e.target.files[0];
      this.imageLabel = this.file.name;
    },
    deleteFile() {
      this.file = null;
      this.imageLabel = "Choisissez une image";
    },
    uploadPost() {
      var formData = new FormData();
      formData.append("image", this.file);
      formData.append("title", this.title);
      formData.append("description", this.description);
      this.createPost(formData)
        .then(() => {
          this.$router.push("home");
        })
        .catch((e) => {
          this.error = e.response.data.message;
        });
    },
    ...mapActions(["createPost"]),
  },
};
</script>

<style lang="scss">
$colormain: #05387a;

#form {
  & #file {
    position: absolute;
    z-index: -1;
  }
  & #file + label {
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    background-color: lighten($colormain, 40%);
    padding: 1rem;
    border-radius: 50px;
    cursor: pointer;
  }

  &#file:focus + label,
  #file + label:hover {
    background-color: lighten($colormain, 20%);
  }

  & #title {
    font-size: 1.3rem;
    width: 20rem;
    height: 1.5rem;
    border: 2px solid $colormain;
    &:focus {
      outline: none;
    }
  }
  & #description {
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
</style>