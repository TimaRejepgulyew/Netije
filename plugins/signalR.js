import { HubConnectionBuilder, LogLevel, HttpTransportType, } from "@microsoft/signalr";
import dataApi from "~/static/dataApi";

export default ({ app }, inject) => {
   function connectAll() {
    const connection = new HubConnectionBuilder()
      .withUrl(dataApi.hubs.assignmentHub, {
        transport:   HttpTransportType.LongPolling ,
        accessTokenFactory: () => app.store.getters["oidc/oidcAccessToken"]
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

      connection.on("AssignmentCounterUpdated", (count,query) => {
        console.log(count,query);
        app.store.commit("notificationHub/ASSIGNMENT_COUNTER_UPDATE", { count,query })
      });
     connection.start().then((e)=>{
      console.log("connected");
    }).catch(function (err) {
      return console.error(err.toString());
    });

 

    
  }


  inject("hubs", { connectAll })


};
