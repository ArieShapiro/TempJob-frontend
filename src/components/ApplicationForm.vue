<template>
  <div class="application-form animated fadeIn">
    <h3 class="fill-in">Fill in your details to apply:</h3>
    <input v-model="applicationFullName" type="text" @click="stopPropo" placeholder="Your full name" required>
    <input v-model="applicationEmail" type="text" @click="stopPropo" placeholder="Your email" required>
    <input v-model="aboutYourself" class="about-yourself" type="text" @click="stopPropo" placeholder="About youself, your experience, relavant links..." required>
    <button class="upload-cv-btn" @click="uploadCV">Upload your CV<i class="fas fa-file-upload cv-icon"></i></button>  
    <button @click="submitApplication" class="apply-btn">Submit Application</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["job"],

    data() {
    return {
      applicationFullName: "",
      applicationEmail: "",
      aboutYourself: "",
    };
  },
  methods:{
    stopPropo($event) {
      $event.stopPropagation();
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
        appliedFor: this.job
      };

      //create an object with the details of the employer that owns this job
      //(get employers request, find job owner, update his profile by deleting and posting new)
      var profileData;
      const BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "/employers"
          : "http://localhost:8000/employers";
      axios
        .get(`${BASE_URL}`)
        .then(res => {
          res.data.forEach(employer => {
            employer.offeredJobs.forEach(job => {
              if (job.id === this.job) {
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
                      .then(() => {
                        swal(
                          "Your application for this job was submitted successfuly!",
                          "",
                          "success"
                        );
                      })
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
    _makeId(length = 5) {
      var text = "";
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }
  }
    
}
</script>

<style lang="scss" scoped>

</style>
