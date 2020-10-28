import { HubConnectionBuilder, LogLevel, HttpTransportType, } from "@microsoft/signalr";
import dataApi from "~/static/dataApi";

export default ({ app }, inject) => {
  function connectAll() {
    const connection = new HubConnectionBuilder()
      .withUrl(dataApi.hubs.assignmentHub, {
        transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling,
        accessTokenFactory: () => app.store.getters["oidc/oidcAccessToken"]
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    connection.on("AssignmentCounterUpdated", (array) => {
      app.store.commit("notificationHub/ASSIGNMENT_COUNTER_UPDATE", array)
    });
    connection.start().then((e) => {
    }).catch(function (err) {
      return console.error(err.toString());
    });




  }


  inject("hubs", { connectAll })


};
