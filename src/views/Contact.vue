<template>
  <section>
    <h1>Contact Us!</h1>
    <div class="contact-icons">
      <div class="phone">
        <i class="fas fa-mobile-alt i"></i>
        <h5>
          Call us at
          04-8325877
        </h5>
      </div>
      <div class="adress">
        <i class="fas fa-map-marker-alt i"></i>
        <h5>4 Habonim St.</h5>
        <h5>Ramat Gan, Israel</h5>
      </div>
      <div class="email">
        <i class="fas fa-envelope i"></i>
        <h5>Email us at</h5>
        <h5>aryehshapiro@gmail.com</h5>
      </div>
    </div>
    <div class="contact-form">
      <input class="name-input" type="text" placeholder="Name">
      <input class="email-input" type="email" placeholder="Email">
      <input class="message-input" type="text" placeholder="Message">
      <button disabled="disabled">Send</button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {}
};
</script>


<style scoped>
h1 {
  text-align: center;
  margin: 120px 0 5px;
  color: #0caa41;
}
.contact-icons {
  display: flex;
  justify-content: center;
}
.contact-icons div {
  margin: 20px;
}
.contact-icons h5 {
  color: #0caa41;
}
.i {
  font-size: xx-large;
}
.phone,
.adress,
.email {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px !important;
}
.phone i {
  color: teal;
  cursor: pointer;
}
.phone i:hover {
  color: #18b3b3;
  cursor: pointer;
}
.adress i {
  color: #ea4335;
  cursor: pointer;
}
.adress i:hover {
  color: #eaa099;
  cursor: pointer;
}
.email i {
  color: #234eb4;
  cursor: pointer;
}
.email i:hover {
  color: #7d94cb;
  cursor: pointer;
}
.contact-form {
  margin: 10px auto;
  max-width: 350px;
  border: 1px solid gray;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 200px;
}
.contact-form input {
  margin: 10px;
  height: 35px;
}
.contact-form button {
  width: 110px;
  -ms-flex-item-align: center;
  align-self: center;
  /* border-radius: 5px; */
  /* background-color: #0caa41; */
  background-color: #0caa41;
  color: white;
  border: none;
  border-radius: 2px;
  font-size: 17px;
  padding: 0 20px;
  height: 40px;
  margin: 10px;
}
.name-input {
  height: 30px;
}
.email-input {
  height: 30px;
}
.contact-form .message-input {
  height: 100px;
}

@media (max-width: 700px) {
  .contact-icons h5 {
    display: none;
  }
  .contact-icons {
    display: flex;
    justify-content: center;
  }
}
@media (max-width: 500px) {
  .contact-form {
    max-width: 70%;
  }
}
</style>

