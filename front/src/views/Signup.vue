<template>
  <div class="data">
    <div v-if="sending"><Spinner /></div>
    <div v-else>
      <Signup />
      <form name="form" id="form" novalidate>
        <span class="erroremail">{{ error }}</span>
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
          <button type="submit" id="submit" @click="validateAndSend">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Signup from "@/components/Signup_Login.vue";
import Spinner from "@/components/Spinner.vue";

export default {
  name: "UserData",
  components: {
    Signup,
    Spinner,
  },
  data: function () {
    return {
      sending: false,
      error: "",
      inputs: [
        {
          id: "firstName",
          value: "",
          error: "",
          type: "text",
          placeholder: "Jonas",
          name: "Prénom",
        },
        {
          id: "lastName",
          value: "",
          error: "",
          type: "text",
          placeholder: "Siry",
          name: "Nom de famille",
        },
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
        },
      ],
    };
  },
  methods: {
    validateAndSend() {
      let check = this.checkError(this.inputs);
      if (!check) {
        let formData = {};
        this.inputs.forEach((i) => {
          formData[i.id] = i.value;
        });
        this.sending = true;
        this.signup(formData)
          .then(() => {
            this.loginUser({
              email: this.inputs[2].value,
              password: this.inputs[3].value,
            });
          })

          .catch((e) => {
            this.sending = false;
            this.error = e.response.data.message;
          });
      }
    },
    ...mapActions(["loginUser", "signup"]),
  },
  computed: {
    ...mapGetters(["checkError"]),
  },
};
</script>

<style lang="scss">
$colormain: #05387a;

#form {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  & .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    &:after {
      content: "";
      display: block;
      padding-top: 0.5rem;
      margin: 0 auto;
      width: 2em;
      border-bottom: 3px solid $colormain;
    }
    & input {
      width: 20rem;
      height: 1.5rem;
      border: 2px solid $colormain;
      &:focus {
        outline: none;
      }
    }
    & .error {
      color: rgb(177, 21, 21);
      font-weight: bold;
      font-size: 1rem;
    }
  }
  & .erroremail {
    color: rgb(177, 21, 21);
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  & .submit {
    & button {
      width: 12rem;
      background-color: $colormain;
      border-radius: 50px;
      height: 3rem;
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      letter-spacing: 1px;
      font-family: "Roboto", cursive, arial, sans-serif;
      border: 2px solid $colormain;
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>