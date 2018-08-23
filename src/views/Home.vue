<template>
  <section class="home">
    <Filtering class="filtering"></Filtering>
    <RenderedJobs></RenderedJobs>
        
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
    RenderedJobs,
    
  },
  created(){
    
  }
};
</script>

<style>

.items-title {
  text-shadow: 2px 2px #1b8a2b;
}
body {
  
  color: #37133b;
}
* {
  font-family: Nunito,-apple-system,BlinkMacSystemFont,Roboto,Helvetica Neue,Helvetica,Arial,sans-serif;
  margin: 0;
  text-decoration: none;
  color: black;  
}
h1{
  text-align: center;
}


</style>

