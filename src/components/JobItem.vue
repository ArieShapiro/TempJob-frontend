<template>
    <section class="rendered-job">
        <div v-if="job" @click="descriptionToggle">
            <div><h1>{{ job.title }}</h1></div>
            <div class="company-location">
                <div><h2>{{ job.company }}  - </h2></div>
                <div><h2 class="loc">{{ job.location }}</h2></div>
            </div>
            <div>{{ job.createdAt }}</div>
            <div v-if="isOpen">
                <div class="description">{{ job.description}}</div>
                <div v-if="isApplicationFormOpened" class="application-form">
                    <input v-model="applicationFullName" type="text" @click="stopPropo" placeholder="Your full name">
                    <input v-model="applicationEmail" type="text" @click="stopPropo" placeholder="Your email">
                    <input v-model="aboutYourself" class="about-yourself" type="text" @click="stopPropo" placeholder="About youself, your experience, relavant links...">
                    <button class="upload-cv-btn" @click="uploadCV">Upload your CV<i class="fas fa-file-upload cv-icon"></i></button>  
                    <button @click="submitApplication">Submit Application</button>
                </div>
                <button v-if="!isApplicationFormOpened" @click="apply">Apply</button>
            </div>
        </div>
    </section>    
</template>

<script>
import axios from "axios";

export default {
  props: ["job"],
  data() {
    return {
      isApplicationFormOpened: false,
      isOpen: false,
      applicationFullName: "",
      applicationEmail: "",
      aboutYourself: "",
      jobData: this.job
    };
  },
  methods: {
    descriptionToggle() {
      this.isOpen = !this.isOpen;
    },

    apply($event) {
      $event.stopPropagation();
      this.isApplicationFormOpened = true;
    },

    uploadCV($event) {
      $event.stopPropagation();
    },

    submitApplication($event) {
      $event.stopPropagation();

      //create application object
      var application = {
        name: this.applicationFullName,
        email: this.applicationEmail,
        aboutYourself: this.aboutYourself,
        appliedFor: this.jobData.id
      };

      //create an object with the details of the employer that owns this job
      //(get employers request, find job owner, update his profile by deleting and posting new)
      var profileData;
      const BASE_URL = (process.env.NODE_ENV !== 'development' ) ? '/employers' : 'http://localhost:8000/employers'
      axios
        .get(`${BASE_URL}`)
        .then(res => {
          res.data.forEach(employer => {
            employer.offeredJobs.forEach(job => {
              if (job.id === this.job.id) {
                profileData = JSON.parse(JSON.stringify(employer));
                //delete _id, otherwise the DB doesn't accept it
                delete profileData._id;

                //update the applicants of the object
                profileData.applicants.push(application);
                profileData.id = this._makeId();

                axios
                  .post(`${BASE_URL}`, profileData)
                  .then(res => {
                    var id = employer.id;
                    axios
                      .delete(`${BASE_URL}?id=${id}`)
                      .then()
                      .catch();
                  })
                  .catch();
              }
            });
          });
        })
        .catch();

      this.isOpen = false;
      this.$router.push("/");
    },

    stopPropo($event) {
      $event.stopPropagation();
    },

    _makeId(length = 5) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }
  },
  computed: {
    loggedInProfileDataQuery() {
      return this.$store.getters.loggedInProfileDataQuery;
    }
  },
  created() {}
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
.loc {
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
  min-width: 250px;
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
  width: 400px;
  height: 100px;
}
</style>


