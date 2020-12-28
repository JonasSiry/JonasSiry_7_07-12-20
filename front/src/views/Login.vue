// La page de connexion.

<template>
  <div class="data">
    <div v-if="sending"><Spinner /></div>
    <div v-else>
      <Signup />
      <form name="form" id="form" @submit.prevent="loginUser" novalidate>
        <div class="errorid">
          <span v-if="this.$route.query.timeOut">Votre session a expiré !</span>
          {{ loginError }}
        </div>
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
          <button type="submit" id="submit">Se connecter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Signup from "@/components/Signup_Login.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "Login",
  components: {
    Signup,
    Spinner,
  },
  data: function () {
    return {
      sending: false,
      loginError: "",
      inputs: [
        {
          id: "email",
          value: "",
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
          autocomplete: "off",
        },
      ],
    };
  },
  methods: {
    async loginUser() {
      this.sending = true;
      this.loginError = "";
      await this.$store
        .dispatch("loginUser", {
          email: this.inputs[0].value,
          password: this.inputs[1].value,
        })
        .then((response) => {
          if (!response) {
            this.loginError = "Veuillez vérifier vos identifiants !";
            this.sending = false;
          }
        });
    },
  },
};
</script>

<style lang="scss">
.errorid {
  color: rgb(177, 21, 21);
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
</style>