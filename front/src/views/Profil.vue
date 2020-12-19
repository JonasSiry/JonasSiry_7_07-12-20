<template>
  <div id="profilpage">
    <div id="headerhome">
      <router-link to="/home" id="backhome">Accueil</router-link>
      <div id="logout" @click="logoutUser">Se déconnecter</div>
    </div>
    <div id="userdata">
      <form name="form" id="form" novalidate>
        <p>Mettre à jour son compte</p>
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
        <div id="delete" @click="deleteUser">Supprimer mon compte</div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "UserData",
  data: function () {
    return {
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
      if (!check) {
        let form = {};
        this.inputs.forEach((i) => {
          form[i.id] = i.value;
        });
        if (form.password == "") {
          delete form.password;
        }
        this.$store
          .dispatch("editUser", { id: this.user.id, edit: "put", form })
          .then(() => {
            this.SET_USER({ form });
            location.reload();
          })

          .catch((e) => {
            console.log(e.response);
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
}
</style>