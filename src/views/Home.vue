<template>
  <section class="home">
    <Filtering class="filtering"></Filtering>
    <RenderedJobs></RenderedJobs>
    <i @click="scrollToTop" class="fas fa-angle-double-up animated bounceIn" id="myBtn"></i>
  </section>
</template>

<script>
// @ is an alias to /src
import Filtering from "../components/Filtering.vue";
import RenderedJobs from "../components/RenderedJobs.vue";

export default {
  name: "home",
  components: {
    Filtering,
    RenderedJobs
  },
  methods: {
    scrollToTop() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(this.scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll / 5);
      }
    }
  },
  created() {}
};
</script>

<style lang="scss">
.fa-angle-double-up {
  border: 1px black;
  height: 26px;
  width: 26px;
  padding: 12px;
  border-radius: 50%;
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: #0caa41;;
  color: white;
  position: fixed;
  bottom: 3%;
  left: 78%;
  text-align: center;
  font-size: 1.5em;
  visibility: hidden;

  @media (max-width: 770px) {
    visibility: visible;
  }
}

/*Pure CSS without SASS:*/
.home {
  background-color: #eaeaea;
}

.items-title {
  text-shadow: 2px 2px #1b8a2b;
}
body {
  color: #37133b;
}
* {
  font-family: Nunito, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue,
    Helvetica, Arial, sans-serif;
  margin: 0;
  text-decoration: none;
  color: black;
}
h1 {
  text-align: center;
}
</style>

