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

      connection.on("AssignmentCreated", (assignmentId, assignmentType, subject) => {
        console.log(assignmentId, assignmentType, subject);
        app.store.commit("notificationHub/SET_ASSIGNMENT_NOTIFICATION", { assignmentId, assignmentType, subject })
      });
     connection.start().then((e)=>{
      console.log("connected");
    }).catch(function (err) {
      return console.error(err.toString());
    });

 

    
  }


  inject("hubs", { connectAll })


};
