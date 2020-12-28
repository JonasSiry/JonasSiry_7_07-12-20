// La page de gestion de profil.

<template>
  <div id="profilpage">
    <div id="headerhome">
      <router-link to="/home" id="backhome">Accueil</router-link>
      <div id="logout" @click="logoutUser">Se déconnecter</div>
    </div>
    <div id="userdata">
      <form name="form" id="form" novalidate>
        <p>Mettre à jour son compte</p>
        <span id="accountupdated" v-if="changed">Compte mis à jour !</span>
        <span id="errorprofil" v-else-if="error">{{ error }}</span>
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
        <span id="delete" @click="popup = true">Supprimer mon compte</span>
      </form>
    </div>

    <popupSuppression
      :question="'Supprimer mon compte ?'"
      :infirmation="'Non j\'ai changé d\'avis'"
      :confirmation="'Supprimer mon compte'"
      :action="deleteUser"
      :show="popup"
      @close="popup = false"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import popupSuppression from "@/components/popupSuppression.vue";
export default {
  name: "UserData",
  components: {
    popupSuppression,
  },
  data: function () {
    return {
      changed: false,
      popup: false,
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
      let check = this.checkError(this.inputs, (this.inputs[3].value.length > 0));
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
  margin-bottom: 2rem;
}

#accountupdated {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: $colormain;
}

#errorprofil {
  color: rgb(177, 21, 21);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  #backhome {
    margin-bottom: 1rem;
  }
}
</style>