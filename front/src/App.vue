// La page principale qui est relié au fichier html via main.js, normalement elle s'appelle app,
// mais j'étais jeune alors je l'ai rename.

<template>
  <div id="app">
    <div id="grouplogo">
      <img alt="Groupomania logo" src="./assets/logo.svg" />
    </div>
    <div id="content-wrap">
      <router-view></router-view>
    </div>
    <footer>
      <h1>Le réseau social Groupomania !</h1>
    </footer>
  </div>
</template>



<script>
export default {
  name: "App",
};
</script>



<style lang="scss">
$colormain: #05387a;
body {
  border: 0;
  margin: 0;
  padding: 0;
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
      & h1 {
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
@media (max-width: 768px) {
  body {
    & #app {
      & #grouplogo {
        & img {
          width: 80%;
        }
      }
    }
  }
}
</style>