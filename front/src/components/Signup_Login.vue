<template>
  <div id="signuplogin">
    <div id="nav">
      <router-link to="/signup">S'inscrire</router-link>
      <router-link to="/login">Se connecter</router-link>
    </div>

    <router-view />
  </div>
</template>



<script>
export default {
  name: "Signup",
};
</script>



<style lang="scss">
$colormain: #05387a;

#nav {
  font-size: 3rem;
  margin-bottom: 3rem;
  a {
    font-weight: bold;
    color: lighten($colormain, 40%);
    margin-right: 2rem;
    margin-left: 2rem;
    text-decoration: none;
    &.router-link-exact-active {
      color: $colormain;
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  #nav {
    display:flex;
    flex-direction:column;
    &nth:child(1) {
      margin-bottom:1rem;
    }
  }
}
</style>