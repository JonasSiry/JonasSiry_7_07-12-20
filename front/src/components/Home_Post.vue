// Les menus de navigation sur les pages home/post/postid, etc...

<template>
  <div id="signuplogin">
    <div id="headerhome">
      <router-link to="/profil" id="profil">Mon profil</router-link>
      <div id="logout" @click="logoutUser">Se déconnecter</div>
    </div>
    <div id="nav">
      <router-link to="/home">Accueil</router-link>
      <router-link to="/post/create">Nouveau Post</router-link>
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
  flex-wrap:wrap;
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

@media (max-width: 768px) {
  #headerhome {
    flex-direction:column;
    & #profil {
      margin-bottom:1rem;
    }
  }
}
</style>