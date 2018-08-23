<template>
  <section >
    <div class="navbar">
      <i class="fas fa-briefcase home-icon" @click="goHome"></i>
      <router-link to="/" class="nav-element"><span>Home</span></router-link> 
      <router-link to="/about" class="nav-element">About</router-link>
      <router-link to="/contact" class="nav-element">Contact</router-link> 
       
      <router-link v-if="!loggedInStatusQuery" to="/sign-up" class="nav-element">SignUp</router-link> 
      <router-link v-if="!loggedInStatusQuery" to="/login" class="nav-element">Login</router-link>
      <div v-if="loggedInStatusQuery" @click="viewProfile" class="hellow-user">Hello {{ loggedInProfileDataQuery.name }}!</div>
      <div v-if="loggedInStatusQuery" @click="logout" class="logout"><i class="fas fa-power-off"></i>Logout</div>
      <div class="empty-nav-element"></div>
    </div>
    <router-view/>
  </section>
</template>

<script>
import { bus } from "./main.js";
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push("/");
      bus.$emit("homeIconClicked");
    },
    viewProfile() {
      //redirected to view/edit profile
      this.updateTempData("view/edit profile!");
      this.$router.push("/my-profile");
    },
    logout() {
      this.updateLoggenInStatus("");
      this.updateLoggedInProfileData("");
      this.$router.push("/");
    },
    updateLoggedInProfileData(profileData) {
      this.$store.commit({ type: "updateLoggedInProfileData", profileData });
    },
    updateLoggenInStatus(newLoggedIn) {
      this.$store.commit({ type: "updateLoggenInStatus", newLoggedIn });
    },
    updateTempData(newData) {
      this.$store.commit({ type: "updateTempData", newData });
    }
  },
  computed: {
    loggedInStatusQuery() {
      return this.$store.getters.loggedInStatusQuery;
    },
    loggedInProfileDataQuery() {
      return this.$store.getters.loggedInProfileDataQuery;
    }
    /*
    loadJobsFromStorage() {
      return this.$store.getters.loadJobsFromStorage;
    }*/
  },
  created() {
    /*
    bus.$on("someoneLoggedIn", data => {
      this.loggedIn = data;
    this.$router.push("/");
    });
    */
  },
  watch: {
    loggedInStatusQuery: function() {
    }
  }
};
</script>

<style>
.navbar {
  display: flex;
  color: #404040;
  height: 35px;
  margin-top: 10px;
}
.navbar i {
  border-bottom: 1px solid #999;
  padding: 0 10px;
  color: #404040;
}
.navbar div {
  width: -webkit-fill-available;
}
.nav-element {
  border-bottom: 1px solid #999;
  padding: 0 10px;
  color: #404040;
}
.empty-nav-element {
  border-bottom: 1px solid #999;
  padding: 0 10px;
  color: #404040;
}
.nav-element:hover {
  border-bottom: 2px solid #0caa41;
  color: #0caa41;
}
.fa-briefcase:before {
  content: "\f0b1";
  padding-right: 10px;
  color: #0caa41;
  font-size: 1.5em;
}
.home-icon:hover {
  cursor: pointer;
}
.hellow-user {
  border-bottom: 1px solid #999;
  padding: 0 10px;
  color: #404040;
  padding-left: 100px;
}
.logout {
  border-bottom: 1px solid #999;
  padding: 0 10px;
  color: #404040;
}
.logout i {
  padding-bottom: 17px;
}
.hellow-user:hover,
.logout:hover {
  cursor: pointer;
}
</style>
