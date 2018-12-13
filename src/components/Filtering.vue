<template>
  <section class="filter-container">
    <div class="search">
      <i class="fas fa-search"></i>
      <input
        v-model="searchInput"
        @input="filterBySubject()"
        type="text"
        placeholder="Job Title, Keywords or Company"
      >
    </div>
    <div class="search-field-button">
      <div class="search location">
        <input v-model="locationInput" type="text" placeholder="Location">
      </div>
      <button @click="filterByLocation()">Search</button>
    </div>
  </section>
</template>

<script>
import { bus } from "../main.js";

export default {
  data() {
    return {
      searchInput: "",
      locationInput: ""
    };
  },
  methods: {
    filterBySubject: function() {
      //passin through the eventBus the name of the event and a certain data
      bus.$emit("searchInputChanged", this.searchInput);
    },
    filterByLocation: function() {
      bus.$emit("searchByLocationLunched", this.locationInput);
    }
  },
  computed: {},
  watch: {
    searchInput: function() {}
  }
};
</script>

<style>
h1 {
  font-size: 2em;
  margin: 10px;
}
.filter-container {
  margin: 85px auto 20px;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 46px;
}
.filter-container button {
  background-color: #0caa41;
  color: white;
  border: none;
  border-radius: 2px;
  font-size: 17px;
  padding: 0 20px;
}
.search-field-button button:hover {
  background-color: #0c5525;
}

.select {
  background-color: #94f080;
}
.search {
  border: 1px solid gray;
  padding: 10px;
  background-color: white;
}
.search:hover {
  border: 1px solid #7097e0;
}
.search i {
  color: #0caa41;
}
.search input {
  border: none;
  padding: 0 5px;
  font-size: 17px;
  width: 338px;
  color: black;
}
input:focus {
  outline: none;
}
.location {
  margin-right: 5px;
}

.search-field-button {
  display: flex;
}

/* Media Queries  */

/* Tablet */
@media (max-width: 1100px) {
  .search-field-button {
    display: none;
  }
}

@media (max-width: 613px) {
  .filter-container{
    margin-top: 60px;
  }
}






/* Mobile */
@media (max-width: 500px) {
  .search input {
    font-size: 14px;
    width: 200px;
  }
  .search i {
    margin-right: 3px;
  }
  .filter-container {
    margin-bottom: 77px;
    margin-top: 47px;
  }
}
</style>



