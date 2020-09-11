import { HubConnectionBuilder, LogLevel, HttpTransportType, } from "@microsoft/signalr";
import dataApi from "~/static/dataApi";

export default ({ app }, inject) => {
  async function connectAll() {
    const connection = new HubConnectionBuilder()
      .withUrl(dataApi.hubs.assignmentHub, {
        transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling | HttpTransportType.ServerSentEvents,
        accessTokenFactory: () => app.store.getters["oidc/oidcAccessToken"]
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    await connection.start().catch(function (err) {
      return console.error(err.toString());
    });

    console.log("connected");

    connection.on("AssignmentCreated", (assignmentId, assignmentType, subject) => {
      console.log(assignmentId, assignmentType, subject);
      app.store.commit("notificationHub/SET_ASSIGNMENT_NOTIFICATION", { assignmentId, assignmentType, subject })
    });
  }


  inject("hubs", { connectAll })


};
