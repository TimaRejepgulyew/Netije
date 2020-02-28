<template>
  <div class="container">
    <div>
      <div class="form-group">
        <form>
          <div>
            <label for="userName">Your Name</label>
            <input type="text" name="Name" id="userName" v-model="userName" />
          </div>
          <div>
            <label for="userMessage">Message</label>
            <input
              type="text"
              name="Message"
              id="userMessage"
              v-model="userMessage"
            />
          </div>
          <button v-on:click="submitCard" type="button">Submit</button>
        </form>
        <ul
          v-for="(item, index) in messages"
          v-bind:key="index + 'itemMessage'"
        >
          <li><b>Name: </b>{{ item.id }}</li>
          <li><b>Message: </b>{{ item.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { HubConnectionBuilder, LogLevel, HttpTransportType } from "@aspnet/signalr";
// import dataApi from "~/static/dataApi";
export default {
  data() {
    return {
      userName: "",
      userMessage: "",
      connection: "",
      messages: []
    };
  },
  methods: {
    submitCard() {
      this.$notifications.regionsNotification("TEST")
        // this.connection
        //   .invoke("SendMessage")
        //   .catch(function(err) {
        //     return console.log(err);
        //   });

    }
  },
  created() {

   
    //TODO: Посмотреть как правильно сконфигурировать webSockets
    // this.connection = new HubConnectionBuilder()
    //   .withUrl("https://localhost:5001/chathub", {
    //     accessTokenFactory: () => this.$store.getters["oidc/oidcAccessToken"]
    //   })
    //   .configureLogging(LogLevel.Information)
    //   .build();

    // this.connection.start().then((res) =>{
    //   console.log(res);
    // }).catch(function(err) {
    //   return console.error(err.toString());
    // }); 
  },
  mounted() {
    var ar = this.$notifications.getNotification();
    console.log(ar);
    // var thisVue = this;
    // thisVue.connection.on("GetData", function(data) {
    //   // console.log(data)
    //   thisVue.messages.push({ data });
    //   console.log(thisVue.messages)
    // });
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
