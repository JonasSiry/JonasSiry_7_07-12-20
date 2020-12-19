<template>
  <div id="app">
    <div id="grouplogo">
      <img alt="Groupomania logo" src="./assets/logo.svg" />
    </div>

    <router-view></router-view>

    <footer>
      <h2>Le réseau social Groupomania !</h2>
    </footer>
  </div>
</template>



<script>
export default {
  name: "Base",
};
</script>



<style lang="scss">
$colormain: #05387a;

#app {
  letter-spacing: 1px;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: rgb(228, 234, 243);
  & #grouplogo {
    width: 100%;
    background: lighten($colormain, 10%);
    margin-bottom: 3rem;
    & img {
      width: 30rem;
      padding-top: 3rem;
      padding-bottom: 3rem;
    }
  }
  & footer {
    margin-top: 3rem;
    width: 100%;
    background: lighten($colormain, 10%);
    & h2 {
      color: white;
      padding-top: 3rem;
      padding-bottom: 3rem;
      font-size: 3rem;
      font-weight: 500;
    }
  }
}
</style>