<template>
  <div id="form">
    <input
      type="file"
      name="file"
      id="file"
      ref="inputFile"
      @change="updateFile"
    />
    <label for="file">{{ imageLabel }}</label>
    <span id="cross" v-if="file">
      <font-awesome-icon icon="times-circle" @click="deleteFile" />
    </span>
  </div>
</template>

<script>
export default {
  name: "buttonUploadFile",
  data: function () {
    return {
      imageLabel: "Choisissez une nouvelle image",
      file: false,
    };
  },
  methods: {
    updateFile(e) {
      if (!e.target.files.length) {
        return;
      }
      this.imageLabel = e.target.files[0].name;
      this.$emit("input", e.target.files[0]);
      this.file = true;
    },
    deleteFile() {
      this.imageLabel = "Choisissez une nouvelle image";
      this.$emit("input", null);
      this.file = false;
      this.$refs.inputFile.value = null;
    },
  },
};
</script>

<style lang="scss" scoped>
$colormain: #05387a;

#form {
  margin-bottom: 2rem;
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
}
#cross {
  color: rgb(177, 21, 21);
  font-size: 2rem;
  cursor: pointer;
  margin-top: 0.2rem;
}
</style>

