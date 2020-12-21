<template>
  <div id="profilpage">
    <div id="headerhome">
      <router-link to="/home" id="backhome">Accueil</router-link>
      <div id="logout" @click="logoutUser">Se déconnecter</div>
    </div>
    <div id="userdata">
      <form name="form" id="form" novalidate>
        <p>Mettre à jour son compte</p>
        <span v-if="changed">Compte mis &agrave; jour</span>
        <span v-else-if="error">{{ error }}</span>
        <div class="form" v-for="input in inputs" :key="input.id">
          <label>{{ input.name }}</label>
          <span class="error">{{ input.error }}</span>
          <input
            v-model="input.value"
            :type="input.type"
            :id="input.id"
            :placeholder="input.placeholder"
            required
          />
        </div>
        <div class="submit">
          <button type="submit" id="submit" @click="updateUser">
            Mettre à jour
          </button>
        </div>
        <a id="delete" href="#popup1">Supprimer mon compte</a>
      </form>
    </div>

    <div id="popup1" class="overlay">
      <div class="popup">
        <div id="confirmation">Supprimer mon compte ?</div>
        <div class="content">
          <a class="popupno" href="#">Non j'ai changé d'avis</a>
          <a class="popupyes" @click="deleteUser">Supprimer mon compte</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "UserData",
  data: function () {
    return {
      changed: false,
      error: "",
      inputs: [
        {
          id: "firstName",
          value: this.$store.state.user.firstName,
          error: "",
          type: "text",
          placeholder: "Jonas",
          name: "Prénom",
        },
        {
          id: "lastName",
          value: this.$store.state.user.lastName,
          error: "",
          type: "text",
          placeholder: "Siry",
          name: "Nom de famille",
        },
        {
          id: "email",
          value: this.$store.state.user.email,
          error: "",
          type: "text",
          placeholder: "mon.email@email.fr",
          name: "Email",
        },
        {
          id: "password",
          value: "",
          error: "",
          type: "password",
          placeholder: "Monmotdepassesecret",
          name: "Mot de passe",
        },
      ],
    };
  },
  methods: {
    deleteUser() {
      this.editUser({ id: this.user.id, edit: "delete", form: {} }).then(() => {
        this.SET_USER(null);
        this.logoutUser();
      });
    },
    updateUser() {
      let check = this.checkError(this.inputs, false);
      this.changed = false;
      this.error = "";

      if (!check) {
        let form = {};
        this.inputs.forEach((i) => {
          form[i.id] = i.value;
        });
        if (form.password == "") {
          delete form.password;
        }
        this.editUser({ id: this.user.id, edit: "put", form })
          .then(() => {
            this.changed = true;
            this.SET_USER({ id: this.user.id, ...form });
          })
          .catch((e) => {
            this.error = e.response.data.message;
          });
      }
    },
    ...mapActions(["logoutUser", "editUser", "logoutUser"]),
    ...mapMutations(["SET_USER"]),
  },
  computed: {
    ...mapGetters(["checkError"]),
    ...mapState(["user"]),
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
  #backhome {
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

#form {
  p {
    font-size: 3rem;
    font-weight: bold;
    color: darken($colormain, 10%);
    margin-bottom: 3rem;
  }
}

#delete {
  color: $colormain;
  margin-top: 10rem;
  cursor: pointer;
  margin-bottom:2rem;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  visibility: hidden;
  opacity: 0;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
  & #confirmation {
    margin-top: 0;
    color: #333;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
.popup .content {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  & a {
    text-decoration: none;
    cursor: pointer;
    color: $colormain;
  }
  & .popupyes {
    color: rgb(177, 21, 21);
    margin-top:2rem;
  }
}
</style>