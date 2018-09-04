<template>
  <section>
    <div class="sign-up-form">
        <h1>Sign Up </h1><small>(as an employer. If you are looking for a job, you don't need to sign up)</small>
        <p v-if="errEmail">Please type a valid email</p>
        <input v-model="email" type="email" placeholder="Email">
        <p v-if="errPassword">The password should contain at least 6 characters</p>
        <input v-model="password" type="password" placeholder="Password">
        <button @click="signUp">Sign Up</button>   
    </div>    
  </section>
</template>

<script>
import { bus } from "../main.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      errEmail: false,
      errPassword: false
    };
  },
  methods: {
    updateTempData(newData) {
      this.$store.commit({ type: "updateTempData", newData });
    },
    signUp() {
      if (!this.email.includes("@") || !this.email.includes(".")) {
        this.errEmail = true;
        if (this.password.length < 6) {
          this.errPassword = true;
        }
        return;
      }
      if (this.password.length < 6) {
        this.errPassword = true;
        return;
      }
      var newData = ["newSignUp", this.email, this.password];
      //updating tempData in the store with the value 'newSignIn'
      this.updateTempData(newData);
      //rederecting to myProfile page
      this.$router.push("/my-profile");
    }
  },
  computed: {
    loggedInStatusQuery() {
      //returning the loggedIn Satatus
      return this.$store.getters.loggedInStatusQuery;
    }
  },
  created() {
    //console.log("Sign up is created!!!");
  },
  watch: {}
};
</script>

<style>
.sign-up-form {
  margin: 125px auto;
  max-width: 350px;
  border: 1px solid gray;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.sign-up-form p {
  color: red;
  text-align: center;
}
.sign-up-form small {
  text-align: center;
}
.sign-up-form input {
  margin: 10px;
  height: 35px;
}
.sign-up-form button {
  width: 110px;
  -ms-flex-item-align: center;
  align-self: center;
  background-color: #0caa41;
  color: white;
  border: none;
  border-radius: 2px;
  font-size: 17px;
  padding: 0 20px;
  height: 40px;
  margin: 10px;
}
.sign-up-form select {
  width: 100px;
  align-self: center;
  height: 30px;
  margin: 10px;
}
.sign-up-form button:hover {
  background-color: #0c5525;
}

@media (max-width: 500px) {
  .sign-up-form {
    margin: 10%;
  }
}
</style>
