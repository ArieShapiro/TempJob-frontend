<template>
    <section>
      <div v-if="throbber" class="throbber"><i class="fa fa-refresh fa-spin"></i></div>
        <ul>
            <li v-for="(job,idx) in displayFilteredJobs" :key="idx">
                <JobItem :job="job"></JobItem>
            </li>
        </ul>    
    </section>    
</template>

<script>
import { bus } from "../main.js";
import axios from "axios";
import JobItem from "./JobItem.vue";

export default {
  components: {
    JobItem
  },
  data() {
    return {
      jobs: [],
      jobsToDisplay: "",
      locationToDisplay: "",
      throbber: true
    };
  },
  methods: {},
  computed: {
    displayFilteredJobs: function() {
      if (!this.locationToDisplay) {
        var string = this.jobsToDisplay;
        var regexp = new RegExp(string, "gi");
        return this.jobs.filter(job => {
          return (
            job.title.match(regexp) ||
            job.company.match(regexp) ||
            job.location.match(regexp) ||
            job.description.match(regexp)
          );
        });
      } else {
        var string = this.locationToDisplay;
        var regexp = new RegExp(string, "gi");
        return this.jobs.filter(job => {
          return job.location.match(regexp);
        });
      }
    },
    //jobs from the store
    jobsQuery() {
      return this.$store.getters.jobsQuery;
    },
    //jobs from Local Storage
    loadJobsFromStorage() {
      return this.$store.getters.loadJobsFromStorage;
    }
  },
  created() {
    //listens to the event bus and getting in data parameter that was sent from the
    //event origin
    bus.$on("searchInputChanged", data => {
      this.jobsToDisplay = data;
    });
    bus.$on("searchByLocationLunched", data => {
      this.locationToDisplay = data;
    });
    //listens to home icon click, and resets filters
    bus.$on("homeIconClicked", () => {
      this.jobsToDisplay = "";
      this.locationToDisplay = "";
    });

    //listens to mew jobs that are being added to DB
    bus.$on("jobAddedToDB", () => {
      const BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "/jobs"
          : "http://localhost:8000/jobs";
      axios.get(`${BASE_URL}`).then(res => {
        this.jobs = res.data;
      });
    });
    //gets jobs from DB

    const BASE_URL =
      process.env.NODE_ENV !== "development"
        ? "/jobs"
        : "http://localhost:8000/jobs";
    axios.get(`${BASE_URL}`).then(res => {
      this.throbber = false;
      this.jobs = res.data;
    });
  }
};
</script>

<style scoped>
ul {
  padding: 50px;
}
li {
  list-style-type: none;
  margin: 20px auto;
  max-width: 1000px;
  border-bottom: 1px solid;
  padding: 5px;
  display: flex;
  justify-content: space-around;
}
.fa-refresh:before {
    content: "\f021";
    color: #0caa41;
}
.throbber{
  font-size: 4em;
  text-align: center;
}


@media (max-width: 500px) {
  ul {
    padding: 0 50px;
  }
}
</style>



