<template>
  <section>
    <!--Mobile Burger Nav-->
    <div class="nav-cmp">
      <div class="burger-nav">
        <div class="burger-and-logo">
          <div class="site-logo">
            <i class="fas fa-briefcase" style="margin-top: 8px; font-size: 1.5em" @click="goHome"></i>
            <h2 @click="goHome">Temp Job</h2>
          </div>

          <div
            v-if="loggedInStatusQuery"
            @click="viewProfile"
            class="hellow-user-mobile"
          >Hello {{ loggedInProfileDataQuery.name }}!</div>
          <div v-if="loggedInStatusQuery" @click="logout" class="logout-mobile">
            <i class="fas fa-power-off po"></i>
          </div>

          <i v-if="burger" class="fas fa-bars hamburger" @click="toggleNavbar"></i>
          <i v-if="xIcon" class="far fa-times-circle hamburger" @click="toggleNavbar"></i>
        </div>

        <div class="responsive-bar-container animated" :class="{fadeIn: true, fadeOut: false}">
          <router-link to="/">
            <div
              class="burger-nav-element"
              :class="{opened: isResponsiveBarOpened}"
              @click="toggleNavbar"
            >Home</div>
          </router-link>
          <router-link to="/about">
            <div
              class="burger-nav-element"
              :class="{opened: isResponsiveBarOpened}"
              @click="toggleNavbar"
            >About</div>
          </router-link>
          <router-link to="/contact">
            <div
              class="burger-nav-element"
              :class="{opened: isResponsiveBarOpened}"
              @click="toggleNavbar"
            >Contact</div>
          </router-link>
          <router-link to="/sign-up">
            <div
              class="burger-nav-element"
              :class="{opened: isResponsiveBarOpened}"
              @click="toggleNavbar"
            >SignUp</div>
          </router-link>
          <router-link to="/login">
            <div
              class="burger-nav-element"
              :class="{opened: isResponsiveBarOpened}"
              @click="toggleNavbar"
            >Login</div>
          </router-link>
        </div>
      </div>

      <!--Normal-->
      <div class="navbar nav-cmp">
        <i class="fas fa-briefcase home-icon" @click="goHome"></i>
        <router-link to="/" class="nav-element">Home</router-link>
        <router-link to="/about" class="nav-element">About</router-link>
        <router-link to="/contact" class="nav-element">Contact</router-link>
        <router-link v-if="!loggedInStatusQuery" to="/sign-up" class="nav-element">SignUp</router-link>
        <router-link v-if="!loggedInStatusQuery" to="/login" class="nav-element">Login</router-link>
        <div
          v-if="loggedInStatusQuery"
          @click="viewProfile"
          class="hellow-user"
        >Hello {{ loggedInProfileDataQuery.name }}!</div>
        <div v-if="loggedInStatusQuery" @click="logout" class="logout">
          <i class="fas fa-power-off"></i>
        </div>
        <div class="empty-nav-element nav-cmp"></div>
      </div>
    </div>

    <router-view/>
  </section>
</template>

<script>
import { bus } from "./main.js";
import swal from "sweetalert";

export default {
  data() {
    return {
      burger: true,
      xIcon: false,
      isResponsiveBarOpened: false,
      navGo: true
    };
  },
  methods: {
    toggleNavbar() {
      this.isResponsiveBarOpened = !this.isResponsiveBarOpened;
      this.burger = !this.burger;
      this.xIcon = !this.xIcon;
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
      swal("Bye, until next time :)", {
        buttons: false,
        timer: 4000
      });
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
html {
  background-color: #eaeaea;
}

.nav-cmp,
.nav-element,
.home-icon {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2);
}
.burger-nav {
  display: none;
  height: 65px;
  width: 100%;
  background-color: #404040;
}
.hamburger {
  color: whitesmoke;
  margin: 13px 18px;
  font-size: 2.5em;
  cursor: pointer;
}
.burger-and-logo {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 14px 10px 0 rgba(0, 0, 0, 0.2);
  height: 65px;
}
.burger-nav-element {
  display: none;
  background-color: #505050;
  color: #fff;
  padding: 10px;
  border-bottom: 1px solid #fff;
  position: relative;
  z-index: 1;
  text-align: center;
  
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
  font-variant: small-caps;
}
.navbar i {
  border-bottom: 1px solid #999;
  padding: 35px 40px;
  color: #404040;
  font-size: 2.5em;
}
.navbar div {
  width: -webkit-fill-available;
}
.nav-element {
  border-bottom: 1px solid #999;
  padding: 35px 40px;
  color: #404040;
  font-size: 1.2em;
}
.empty-nav-element {
  border-bottom: 1px solid #999;
  padding: 35px 40px;
  color: #404040;
}
.nav-element:hover {
  border-bottom: 1px solid #0caa41;
  color: #0caa41;
  box-shadow: 1px 1px 1px #0caa41;
  border-left: 1px solid #0caa41;
  border-right: 1px solid #0caa41;
  margin: -1px;
}
.fa-briefcase:before {
  content: "\f0b1";
  padding-right: 10px;
  color: #0caa41;
  font-size: 1.3em;
  position: relative;
  bottom: 28px;
  right: 31px;
  /* text-shadow: 4px 5px 4px #3d5649; */
}
.home-icon {
  padding: 35px 40px;
}
.fa-briefcase:hover {
  color: #629271;
  cursor: pointer;
}
.hellow-user {
  border-bottom: 1px solid #999;
  padding: 35px 0px;
  color: #404040;
  padding-left: 100px;
}
.logout {
  border-bottom: 1px solid #999;
  padding: 35px 100px;
  color: #404040;
}
.logout i {
  position: relative;
  bottom: 58px;
  font-size: 2.5em;
  padding-bottom: 18px;
}
.hellow-user:hover,
.logout:hover,
.fa-power-off:hover {
  cursor: pointer;
  color: #0caa41;
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
.site-logo {
  display: flex;
  margin: 5px 21px 21px 16px;
}
.site-logo h2 {
  font-family: "Dancing Script";
  color: #0caa41;
  font-size: 1.9em;
  padding-top: 8px;
}
.site-logo h2:hover {
  cursor: pointer;
}

/*Makes the navbar the same on all devises without messing up the code*/
@media (max-width: 1800px) {
  .fa-briefcase:before {
    font-size: 1.4em;
    position: static;
  }
  .navbar {
    display: none;
  }
  .burger-nav {
    display: block;
  }
  .hellow-user-mobile,
  .logout-mobile {
    margin: 18px 0px;
  }
  .logout-mobile {
    font-size: 1.7em;
    position: relative;
    bottom: 5px;
  }
  .hellow-user-mobile:hover {
    color: #0caa41;
    cursor: pointer;
  }
  .logout-mobile:hover {
    color: #0caa41;
    cursor: pointer;
  }
  .hellow-user-mobile:active {
    color: #0caa41;
  }
  .logout-mobile:active {
    color: #0caa41;
  }
  .fa-power-off:before {
    font-size: 1.3em;
  }
  .nav-cmp,
  .nav-element,
  .home-icon {
    height: 10px;
  }
}

@media (max-width: 613px) {
  .burger-and-logo,
  .burger-nav {
    height: 65px;
  }
  .hamburger {
    margin-top: 14px;
    font-size: 2em;
  }
  .site-logo {
    margin-top: 10px;
  }
  .fa-briefcase {
    display: none;
  }
  .site-logo h2{
    padding-top: 0;
  }
  
}
</style>
