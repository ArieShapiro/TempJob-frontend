<template>
  <section>
    <div class="sign-up-form">
        <h1>Sign Up </h1><small>(as an employer. If you are looking for a job, you don't need to sign up)</small>
        <input v-model="email" type="email" placeholder="Email">
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
      password: ""
    };
  },
  methods: {
    updateTempData(newData) {
      this.$store.commit({ type: "updateTempData", newData });
    },
    signUp() {
      var newData = ["newSignUp", this.email, this.password];
      //updating tempData in the store with the value 'newSignIn'
      this.updateTempData(newData);
      //rederecting to myProfile page
      this.$router.push("/my-profile");

      /*
      var loggedInStatus = this.loggedInStatusQuery;
      loggedInStatus = JSON.parse(JSON.stringify(loggedInStatus));
      loggedInStatus = this.user;
      //updating loggedIn Status
      this.$store.commit({
        type: "updateLoggenInStatuss",
        newStatus: loggedInStatus
      });
 */
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
  margin: 40px auto;
  max-width: 350px;
  border: 1px solid gray;
  height: auto;

  display: flex;
  flex-direction: column;
  padding: 20px;
}
.sign-up-form input {
  margin: 10px;
  height: 35px;
}
.sign-up-form button {
  width: 110px;
  -ms-flex-item-align: center;
  align-self: center;
  /* border-radius: 5px; */
  /* background-color: #0caa41; */
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
</style>
