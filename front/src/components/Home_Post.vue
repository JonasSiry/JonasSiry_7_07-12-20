<template>
  <div id="signuplogin">
    <div id="headerhome">
      <router-link to="/profil" id="profil">Mon profil</router-link>
      <div id="logout" @click="logoutUser">
        Se déconnecter
      </div>
    </div>
    <div id="nav">
      <router-link to="/home">Accueil</router-link>
      <router-link to="/post">Nouveau Post</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapActions(["logoutUser"]),
  },
};
</script>

<style lang="scss">
$colormain: #05387a;

#headerhome {
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
  border-radius: 50px;
  #profil {
    text-decoration: none;
    color: $colormain;
    cursor: pointer;
  }
  #logout {
    text-decoration: none;
    color: $colormain;
    cursor: pointer;
  }
}
</style>