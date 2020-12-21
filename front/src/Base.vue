<template>
  <div id="app">
    <div id="grouplogo">
      <img alt="Groupomania logo" src="./assets/logo.svg" />
    </div>
    <div id="content-wrap">
      <router-view></router-view>
    </div>
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
body {
  border: 0;
  margin: 0;
  padding: 0;
  & img {
    max-width: 25vw;
    max-height: 10vw;
  }
  & #app {
    letter-spacing: 1px;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: rgb(228, 234, 243);
    min-height: 100vh;
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
      width: 100%;
      background: lighten($colormain, 10%);
      & h2 {
        margin-top: 0;
        color: white;
        margin-bottom: 0;
        padding-top: 2rem;
        padding-bottom: 2rem;
        font-size: 2rem;
        font-weight: 500;
      }
    }
  }
}
</style>