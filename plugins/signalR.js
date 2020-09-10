import { HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr";
import dataApi from "~/static/dataApi";

export default ({ app },) => {
  console.log("connecting")

  const connection = new HubConnectionBuilder()
    .withUrl(dataApi.assignmentHub, {
      transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling | HttpTransportType.ServerSentEvents,
      accessTokenFactory: () => app.store.getters["oidc/oidcAccessToken"]
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build()
  
  connection
    .start()
    .then(res => {
      console.log("connected");
    })
    .catch(function (err) {
      return console.error(err.toString());
    });
  connection.on("AssignmentCreated", function (assignmentId, assignmentType, subject) {
    console.log(assignmentId, assignmentType, subject);
  });




};
