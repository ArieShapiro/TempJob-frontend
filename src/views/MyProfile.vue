<template>
    <section>      
        <!--Sign Up Form-->
        <div v-if="tempDataQuery[0] === 'newSignUp'" class="employer-sing-up-form">
          <h2>Please complete your profile:</h2>
            <div class="avatar-and-btn-container">
                <div class="avatar"></div>   
                <button class="upload-image">Upload Image</button>     
            </div>
            <input v-model="name" type="text" placeholder="Full name">
            <input v-model="phone" type="text" placeholder="Phone number">
            <input v-model="email" type="email" placeholder="Email">
            <input v-model="password" type="password" placeholder="Password">
            <input v-model="company" class="company" type="text" placeholder="Company">
            <input v-model="about" class="about" type="text" placeholder="About">
            <!--New Job Form-->
            <div v-if="newJobFormOpened" class="added-jobs added-job">                
                <h2>New Job:</h2>
                <input v-model="title" type="title" placeholder="Title"><br>
                <input v-model="location" type="location" placeholder="Location"><br>
                <input v-model="description" class="description" type="description" placeholder="Description">                
                <br>
            </div>
            <button v-if="!newJobFormOpened" @click="addJobButtonClicked">Post New Job</button>     
            <!--*************-->
            <button @click="submitEmployer">Submit</button>   
        </div>
        <!--Edit Form-->
        <div v-if="editProfile" class="edit-form">
            <h1>My Profile</h1>
            <div class="avatar-and-btn-container">
                <div class="avatar"></div>   
                <button class="upload-image">Upload Image</button>     
            </div>
            <button @click="editClicked" class="edit-btn">Edit Profile</button>
            <p v-if="nonEdit" class="non-edit">Full Name: {{name}}</p>
            <input v-else v-model="name" type="text" placeholder="Full name">
            <p v-if="nonEdit" class="non-edit">Phone number: {{this.phone}}</p>
            <input v-else v-model="phone" type="text" placeholder="Phone number">
            <p v-if="nonEdit" class="non-edit">Email: {{this.email}}</p>
            <input v-else v-model="email" type="email" placeholder="Email">
            <div v-if="nonEdit" class="non-edit">
                <p>Password:<p v-for="(bullet,idx) in passLength" :key="idx">*</p>
            </div>
            <input v-else v-model="password" type="password" placeholder="Password">
            <p v-if="nonEdit" class="non-edit">Company: {{company}}</p>
            <input v-else v-model="company" class="company" type="text" placeholder="Company">
            <p v-if="nonEdit" class="non-edit">About: {{about}}</p>
            <input v-else v-model="about" class="about" type="text" placeholder="About">
            <div class="jobs-and-applicants">
                <div class="my-jobs">
                <h3>My Jobs:</h3>
                <ul v-if="loggedInProfileDataQuery.offeredJobs">
                    <li v-for="(job, idx) in loggedInProfileDataQuery.offeredJobs" :key="idx">
                        <h4>{{job.title}}</h4>
                        <button class="del-btn" @click="deleteJob(job.id, loggedInProfileDataQuery.id)"><i class="fas fa-trash-alt"></i></button>
                        <h4> {{job.company}}</h4>
                        <h4> {{job.location}}</h4>
                        <p> {{job.description}}</p>
                    </li>
                </ul>
                </div>
                <div class="my-applicants">
                  <h3>Applications for my job</h3>
                  <ul v-if="loggedInProfileDataQuery.applicants">
                    <li v-for="(applicant, idx) in loggedInProfileDataQuery.applicants" :key="idx">
                      <h4>{{applicant.name}}</h4>
                      <button class="del-btn" @click="deleteApplicant(applicant.id, loggedInProfileDataQuery.id)"><i class="fas fa-trash-alt"></i></button>
                      <h4> {{applicant.email}}</h4>
                      <p> {{applicant.aboutYourself}}</p>
                      <p> {{applicant.appliedFor}}</p>  
                    </li>
                  </ul>
                </div>
            </div>            
            <!--New Job Form-->
            <div v-if="newJobFormOpened" class="added-jobs added-job">                
                <h2>New Job:</h2>
                <input v-model="title" type="title" placeholder="Title"><br>
                <input v-model="location" type="location" placeholder="Location"><br>
                <input v-model="description" class="description" type="description" placeholder="Description">                
                <br>
            </div>
            <button v-if="!newJobFormOpened" @click="addJobButtonClicked">Post New Job</button>     
            <!--*************-->
            <button v-if="!nonEdit" @click="updateEmployer">Save Changes</button> 
        </div>
    </section>    
</template>

<script>
import axios from "axios";
import { bus } from "../main.js";

export default {
  data() {
    return {
      nonEdit: false,
      passLength: [],
      editProfile: false,
      isNewSignIn: false,
      newJobFormOpened: false,
      buttonsDisplayed: true,
      employerDisplayed: false,
      /*New employer properties*/
      name: "",
      phone: "",
      email: "",
      image: "",
      password: "",
      company: "",
      about: "",
      /*New job properties */
      title: "",
      location: "",
      description: "",

      newJob: ""
    };
  },
  methods: {
    deleteApplicant(applicantId, employerId) {},

    deleteJob(jobId, employerId) {
      swal({
        title: "Are you sure you want to delete this job?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          //delete the job from DB
          var BASE_URL =
            process.env.NODE_ENV !== "development"
              ? "/jobs"
              : "http://localhost:8000/jobs";
          axios
            .delete(`${BASE_URL}?id=${jobId}`)
            .then(res => {})
            .catch(err => {});

          //configure new offeredJobs array for this Employer
          var currEmployer = JSON.parse(
            JSON.stringify(this.loggedInProfileDataQuery)
          );
          var idx;
          currEmployer.offeredJobs.forEach(job => {
            if (job.id === jobId) idx = currEmployer.offeredJobs.indexOf(job);
          });

          currEmployer.offeredJobs.splice(idx, 1);

          //updating Employer in the DB, with one job less (by deleting and posting a new one)
          BASE_URL =
            process.env.NODE_ENV !== "development"
              ? "/employers"
              : "http://localhost:8000/employers";
          axios
            .delete(`${BASE_URL}?id=${employerId}`)
            .then(() => {
              axios
                .post(`${BASE_URL}`, currEmployer)
                .then(res => {
                  this.updateLoggedInProfileData(res.data);
                  swal("Poof! Your job has been deleted!", {
                    icon: "success"
                  });
                })
                .catch(err => {});
            })
            .catch(err => {});
        } else {
          swal("Your job is safe!");
        }
      });
    },

    editClicked() {
      this.nonEdit = false;
    },

    addJobButtonClicked() {
      this.newJobFormOpened = true;
      this.nonEdit = false;
    },

    submitEmployer() {
      //add new Job to the DB
      if (this.newJobFormOpened) {
        this.newJob = {
          title: this.title,
          createdAt: "",
          location: this.location,
          company: this.company,
          description: this.description,
          jobTypeIcon: "",
          //create an additional id for the job
          id: this._makeId()
        };

        //post new Job
        var BASE_URL =
          process.env.NODE_ENV !== "development"
            ? "/jobs"
            : "http://localhost:8000/jobs";
        axios
          .post(`${BASE_URL}`, this.newJob)
          .then(res => {
            //renders the new job right away to the home page
            bus.$emit("jobAddedToDB");
          })
          .catch(err => {});
      }
      //Add new employer to the DB
      var newEmployer = {
        name: this.name,
        company: this.company,
        rating: -1,
        phone: this.phone,
        email: this.email,
        about: this.about,
        offeredJobs: [],
        image: "",
        password: this.password,
        applicants: [],
        id: this._makeId()
      };
      if (this.newJobFormOpened) {
        newEmployer.offeredJobs.push(this.newJob);
      }
      //post new Employer
      BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "/employers"
          : "http://localhost:8000/employers";
      axios.post(`${BASE_URL}`, newEmployer).then(res => {
        swal("Your profile was created successfuly!", "", "success");
        this.updateLoggedInProfileData(res.data);
      });
      //handle Navbar: Logout button, Hello + userName(through updating loggeIn status)

      this.updateLoggenInStatus(this.name);
      bus.$emit("someoneLoggedIn", this.name);
      this.$router.push("/");
    },

    updateEmployer() {
      if (this.newJobFormOpened) {
        //create job object
        this.newJob = {
          title: this.title,
          location: this.location,
          description: this.description,
          id: this._makeId(),
          company: this.company
        };

        //post request to the server to add job the jobs DB
        var BASE_URL =
          process.env.NODE_ENV !== "development"
            ? "/jobs"
            : "http://localhost:8000/jobs";
        axios
          .post(`${BASE_URL}`, this.newJob)
          .then(res => {})
          .catch(err => {});
      }
      //create an object with current employer details
      var profileData = {
        offeredJobs: this.loggedInProfileDataQuery.offeredJobs,
        applicants: this.loggedInProfileDataQuery.applicants,
        name: this.name,
        company: this.company,
        rating: this.loggedInProfileDataQuery.rating,
        phone: this.phone,
        email: this.email,
        about: this.about,
        image: this.loggedInProfileDataQuery.image,
        password: this.password,
        id: this._makeId()
      };
      //update the offered jobs of the object
      if (this.newJobFormOpened) profileData.offeredJobs.push(this.newJob);

      //request to the server - to delete and post Employer profile
      var id = this.loggedInProfileDataQuery.id;
      BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "/employers"
          : "http://localhost:8000/employers";
      axios
        .delete(`${BASE_URL}?id=${id}`)
        .then()
        .catch();

      axios
        .post(`${BASE_URL}`, profileData)
        .then(res => {
          this.updateLoggedInProfileData(res.data);
        })
        .catch();

      bus.$emit("jobAddedToDB");
      this.$router.push("/");
    },

    updateLoggenInStatus(newLoggedIn) {
      this.$store.commit({ type: "updateLoggenInStatus", newLoggedIn });
    },

    updateLoggedInProfileData(profileData) {
      this.$store.commit({ type: "updateLoggedInProfileData", profileData });
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
    tempDataQuery() {
      return this.$store.getters.tempDataQuery;
    },

    loggedInStatusQuery() {
      return this.$store.getters.loggedInStatusQuery;
    },

    loggedInProfileDataQuery() {
      return this.$store.getters.loggedInProfileDataQuery;
    }
  },
  watch: {},
  created() {
    for (var i = 0; i < this.password.length; i++) {
      this.passLength.push("*");
    }
    if (this.tempDataQuery === "view/edit profile!") {
      this.editProfile = true;
      this.nonEdit = true;
      //get cuurent logged in profile data from the store
      this.name = this.loggedInProfileDataQuery.name;
      this.phone = this.loggedInProfileDataQuery.phone;
      this.email = this.loggedInProfileDataQuery.email;
      this.password = this.loggedInProfileDataQuery.password;
      this.company = this.loggedInProfileDataQuery.company;
      this.about = this.loggedInProfileDataQuery.about;
    } else {
      this.email = this.tempDataQuery[1];
      this.password = this.tempDataQuery[2];
    }
  }
};
</script>

<style>
.edit-form p {
  text-indent: 10px;
  text-align: justify;
}
li {
  list-style-type: none;
}
.choose-status {
  margin: 20px;
}
.choose-status button {
  margin: 10px;
}
.employer-sing-up-form {
  margin: 40px auto;
  max-width: 350px;
  border: 1px solid gray;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.employer-sing-up-form input {
  margin: 10px;
}
.edit-form input {
  margin: 10px;
}
.added-jobs {
  padding: 0;
  margin: 10px;
  text-align: start;
}
.added-job {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  border: 1px solid #999;
  padding: 10px;
  margin-bottom: 10px;
}
.employer-sing-up-form button,
.edit-form button {
  align-self: center;
  background-color: #0caa41;
  color: white;
  border: none;
  border-radius: 2px;
  font-size: 17px;
  padding: 0 20px;
  height: 40px;
  margin: 10px;
  width: 100%;
}
.edit-btn {
  background-color: #0097a7 !important;
}
.edit-btn:hover {
  background-color: #11535a !important;
}
.del-btn:hover {
  background-color: #ed0b0b !important;
}

.employer-sing-up-form button:hover,
.edit-form button:hover {
  background-color: #0c5525;
}
.avatar {
  background-image: url(/img/avatar.2ec5fa7b.png);
  height: 88px;
  width: 101px;
  border: 2px solid #999;
  border-radius: 12px;
  background-size: 100px auto;
  margin: 20px auto;
}
.avatar-and-btn-container {
}
.avatar-and-btn-container button {
  margin: 10px auto;
  width: 100%;
}
.about,
.about-me {
  height: 100px;
}
.added-job h2 {
  text-align: center;
}
.gender {
  width: 70px;
  margin: 10px;
}
.age {
  width: 40px;
}
.i-know {
  height: 50px;
}
.p1 {
  padding-right: 200px;
}
.p2 {
  padding-right: 140px;
}
.p3 {
  padding-right: 125px;
}
.edit-form {
  margin: 80px auto;
  max-width: 645px;
  border: 1px solid gray;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.non-edit {
  margin: 10px;
}
.edit-form h3 {
  margin: 10px auto;
  text-align: center;
}
.my-jobs p {
  
}
.my-jobs button {
  background-color: #e8664c;
  height: 30px;
  
}
.jobs-and-applicants {
  display: flex;
}
.edit-form h4 {
    text-align: center;
}

@media (max-width: 800px) {
  .edit-form {
    margin: 10%;
  }
  .edit-form h1 {
    font-size: 1.5em;
  }
  .avatar {
    height: 50px;
    width: 50px;
  }
  .upload-image {
    font-size: 14px !important;
    width: 100%;
    margin: auto;
  }
  .avatar-and-btn-container button {
    width: 100%;
    margin: auto;
  }
  .edit-btn,
  .del-btn {
    width: 100%;
    height: 30px;
  }
  .avatar-and-btn-container {
    display: inline;
  }
  .jobs-and-applicants {
    display: initial;
  }
  .edit-form h3 {
    margin: 10px auto;
    text-align: center;
  }
  li {
  }
  .my-jobs h4 {
    text-align: center;
  }
  .my-jobs p,
  h4 {
    text-align: justify;
    text-align-last: center;
    margin-bottom: 10px;
  }
  .my-jobs button {
    width: 100%;
  }
  .my-applicants ul,
  .my-jobs ul {
    padding: 0;
    margin: 20px;
  }
  .my-applicants .del-btn {
    height: 30px;
  }
}
</style>

