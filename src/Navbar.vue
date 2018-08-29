<template>
  <section >
    <!--Mobile Burger Nav-->
    <div class="burger-nav">
      <div class="burger-and-logo">
        <i class="fas fa-bars hamburger" @click="openBurgerBar"></i>
        <div v-if="loggedInStatusQuery" @click="viewProfile" class="hellow-user-mobile">Hello {{ loggedInProfileDataQuery.name }}!</div>
        <div v-if="loggedInStatusQuery" @click="logout" class="logout-mobile"><i class="fas fa-power-off po"></i>Logout</div>
        <i class="fas fa-briefcase" style="margin-top: 8px; font-size: 1.5em" @click="goHome"></i>
      </div>
      <div class="responsive-bar-container opened">
        <router-link to="/"><div class="burger-nav-element" :class="{opened: isResponsiveBarOpened}" @click="openBurgerBar">Home</div></router-link>
        <router-link to="/about"><div class="burger-nav-element" :class="{opened: isResponsiveBarOpened}" @click="openBurgerBar">About</div></router-link>
        <router-link to="/contact"><div class="burger-nav-element" :class="{opened: isResponsiveBarOpened}" @click="openBurgerBar">Contact</div></router-link>
        <router-link to="/sign-up"><div class="burger-nav-element" :class="{opened: isResponsiveBarOpened}" @click="openBurgerBar">SignUp</div></router-link>
        <router-link to="/login"><div class="burger-nav-element" :class="{opened: isResponsiveBarOpened}" @click="openBurgerBar">Login</div></router-link>
      </div>
    </div>

    <!--Normal-->
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

export default {
  data() {
    return {
      isResponsiveBarOpened: false
    };
  },
  methods: {
    openBurgerBar() {
      this.isResponsiveBarOpened = !this.isResponsiveBarOpened;
    },
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
    loggedInStatusQuery: function() {}
  }
};
</script>

<style>
.burger-nav {
  display: none;
  height: 55px;
  width: 100%;
  background-color: #404040;
}
.hamburger {
  color: whitesmoke;
  margin: 8px;
  font-size: 210%;
  cursor: pointer;
}
.burger-and-logo {
  display: flex;
  justify-content: space-between;
}
.burger-nav-element {
  display: none;
  background-color: #505050;
  color: #fff;
  padding: 10px;
  border-bottom: 1px solid #fff;
  position: relative;
  z-index: 1;
}
.opened {
  display: block;
}
.burger-nav ul {
  padding: 0;
}
.responsive-bar-container div:hover {
  background-color: #0e0909 !important;
}

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

.hellow-user-mobile {
  color: white;
  margin: 10px 0px;
}
.logout-mobile {
  color: white;
  margin: 10px 0px;
}
.po {
  color: white;
  margin-right: 5px;
}

@media (max-width: 500px) {
  .navbar {
    display: none;
  }
  .burger-nav {
    display: block;
  }
  .hellow-user-mobile, .logout-mobile{
    margin: 18px 0px;
  }
  
}
</style>
