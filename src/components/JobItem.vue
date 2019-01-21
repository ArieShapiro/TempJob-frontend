<template>
    <section class="rendered-job">

        <div  @click="descriptionToggle">
            <div><h1 class="job-title">{{ job.title }}</h1></div>

            <div class="company-location">
                <div><h2>{{ job.company }}  <span>-</span> </h2></div>
                <div><h2 class="job-loc">{{ job.location }}</h2></div>
            </div>

            <div>{{ job.createdAt }}</div>

            <div v-if="isOpen" class="animated fadeIn" :class="{fadeOut: fadeOut}">
              <div class="description">{{ job.description}}</div>
              <ApplicationForm v-if="isApplicationFormOpened" :job="job.id"></ApplicationForm>
              <button v-if="!isApplicationFormOpened" @click="apply">Apply</button>
            </div>

        </div>
        
    </section>    
</template>

<script>
import axios from "axios";
import { bus } from "../main.js";
import ApplicationForm from './ApplicationForm';

export default {
  props: ["job"],
  components: {
    ApplicationForm
  },
  data() {
    return {
      fadeOut: false,
      isApplicationFormOpened: false,
      isOpen: false,
    };
  },
  methods: {
    descriptionToggle() {

      if (!this.isOpen) {
        // bus.$emit("openJobCardClicked");
      }

      if (this.isOpen) {
        this.fadeOut = !this.fadeOut;
        setTimeout(() => {
          this.isOpen = !this.isOpen;
          this.fadeOut = !this.fadeOut;
        }, 500);
        return;
      }

      this.isOpen = !this.isOpen;
    },

    apply($event) {
      $event.stopPropagation();
      this.isApplicationFormOpened = true;
    },

    
  },

  computed: {
    loggedInProfileDataQuery() {
      return this.$store.getters.loggedInProfileDataQuery;
    }
  },

  created() {
    bus.$on("openJobCardClicked", () => {
      this.isOpen = false;
    });
  }
};
</script>

<style>
.rendered-job {
  width: 100%;
  text-align: center;
}
.description {
  text-align: justify;
  height: auto;
  text-indent: 20px;
}
.rendered-job button {
  margin-top: 15px;
  background-color: #0caa41;
  color: white;
  border: none;
  border-radius: 2px;
  font-size: 17px;
  padding: 10px 20px;
}
.rendered-job button:hover {
  background-color: #0c5525;
}
.rendered-job div {
  margin: 10px;
}
.company-location {
  display: flex;
  justify-content: center;
  font-size: 0.8em;
}
.job-loc {
  font-weight: normal;
  color: #7f7f7f;
}
.application-form {
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
}
.application-form input {
  margin: 10px auto;
  min-width: 313px;
  height: 30px;
}
.application-form button {
  margin: 10px 50px;
}
.cv-icon {
  color: white;
  margin-left: 20px;
}
input.about-yourself {
  width: 313px;
  height: 100px;
}

/* Media Queries  */

@media (max-width: 600px) {
  .job-title {
    font-size: 20px;
  }
  .company-location h2 {
    font-size: 15px;
  }
  .rendered-job button {
    width: 100%;
    height: 35px;
  }
  .fill-in {
    font-size: 15px;
    margin-top: 30px;
  }
  .rendered-job button {
    width: 100%;
    height: 35px;
    margin: 5px 0px;
    padding-top: 6px;
  }

  input.about-yourself {
    width: auto;
  }
}

@media (max-width: 440px) {
  .company-location span {
    display: none;
  }
  .company-location {
    flex-direction: column;
  }
  .description {
    font-size: 10px;
  }
}
@media (max-width: 430px) {
  .job-title {
    font-size: 15px;
  }
  .company-location h2 {
    font-size: 10px;
    margin: 3%;
  }
  .application-form input {
    margin: 10px auto;
    height: 30px;
    min-width: 0;
    width: 200px !important;
  }

  .rendered-job button {
    width: 95%;
    height: 35px;
    margin: 5px 0px;
    margin-left: 5px;
  }
  .fill-in {
    font-size: 15px;
    margin-top: 30px;
  }

  input.about-yourself {
    width: auto;
    height: 150px;
  }
  .rendered-job div {
    margin: 0;
  }
}
</style>


