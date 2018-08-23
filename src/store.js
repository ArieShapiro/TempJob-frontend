import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { bus } from "./main.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //just a temporary storage
    tempData: '',
    loggedIn: '',
    loggedInProfileData: '',
  },
  mutations: {
    //update logged-in status
    updateLoggenInStatus: (state, { newLoggedIn }) => {
      state.loggedIn = newLoggedIn;
      
    },
    //update tempData
    updateTempData: (state, { newData }) => {
      
      state.tempData = newData;
    },
    //update loggedInProfileData
    updateLoggedInProfileData: (state, { profileData }) => {
      state.loggedInProfileData = profileData;
    }
    /*
    key: {
      jobs: 'tempJobJobs',
      employers: 'tempJobEmployers'
    },*/

    /*
      addJob: (state, { newJob }) => {
        state.jobs.push(newJob);
  
      },
    addEmployer: (state, { newEmployer }) => {
      state.employers.push(newEmployer);

    },

    addApplicant: (state, { newApplicant }) => {
      state.applicants.push(newApplicant);
    },

    updateEmployer: (state, { newProfile, id }) => {
      var currProfile = state.employers.find(function (employer) {
        return employer.id === id;
      });
      var currIdx = state.employers.indexOf(currProfile);
      state.employers[currIdx] = newProfile;
    }
    */
  },
  getters: {
    tempDataQuery: state => {
      return state.tempData;
    },

    loggedInStatusQuery: state => {
      return state.loggedIn;
    },

    loggedInProfileDataQuery: state => {
      return state.loggedInProfileData;    
    },


    /*
            jobsQuery: state => {
              return state.jobs;
            },
    //returns employers from local storage
    loadEmployersFromStorage: state => {
      return JSON.parse(localStorage.getItem(state.key.employers));
    },
    //returns jobs from local storage
    loadJobsFromStorage: state => {
      return JSON.parse(localStorage.getItem(state.key.jobs));
    },
    */
  },
  actions: {
    /*
    loadJobsFromDB: context => {
      console.log('sending request...')
      axios.get('http://localhost:4000/jobs').then(res => {
        console.log(res)
        return res;
      }).catch(err => {
        console.log(err)
      })
    }*/
  },
  created() {
    //console.log('Store is created!!!')
  },
})
