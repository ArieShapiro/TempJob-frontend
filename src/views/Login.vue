<template>
  <section>
    <div class="login-form">
      <h1>Login</h1>
      <p
        v-if="accessDenied"
        class="access-denied"
      >Email or password are incorrect. Please try again.</p>
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <button @click="login">Login</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { bus } from "../main.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      accessDenied: null,
      userProfile: null
    };
  },
  methods: {
    updateLoggenInStatus(newLoggedIn) {
      this.$store.commit({ type: "updateLoggenInStatus", newLoggedIn });
    },
    login() {
      const BASE_URL = (process.env.NODE_ENV !== 'development' ) ? '/employers' : 'http://localhost:8000/employers';
      axios.get(`${BASE_URL}`).then(res => {
        var userFound = null;
        var userName = null;
        res.data.forEach(user => {
          if (user.email === this.email && user.password === this.password) {
            userFound = true;
            userName = user.name;
            this.userProfile = user;
            this.updateLoggedInProfileData(user);

            //proceed successful Login
            //handle Navbar: Logout button, Hello + userName(through updating loggeIn status)
            this.updateLoggenInStatus(userName);
            bus.$emit("someoneLoggedIn", userName);

            this.$router.push("/");
          }
        });

        //Login denied
        this.accessDenied = true;
        this.email = "";
        this.password = "";
      });
    },

    updateLoggedInProfileData(profileData) {
      this.$store.commit({ type: "updateLoggedInProfileData", profileData });
    }
  },

  computed: {
    loggedInProfileDataQuery() {
      return this.$store.getters.loggedInProfileDataQuery;
    }
  }
};
</script>

<style>
.login-form {
  margin: 125px auto;
  max-width: 350px;
  border: 1px solid gray;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 160px;
}
.login-form input {
  margin: 10px;
  height: 35px;
}
.login-form button {
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

.login-form button:hover {
  background-color: #0c5525;
}
.access-denied {
  color: red;
}

@media (max-width: 500px){
  .login-form{
    margin: 10%;
        margin-top: 150px;
  }
}
</style>


