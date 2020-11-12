import dataApi from "~/static/dataApi";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";
export default function(app) {
  const connection = new HubConnectionBuilder()
    .withUrl(dataApi.hubs.assignmentHub, {
      //   transport: HttpTransportType.LongPolling,
      accessTokenFactory: () => app.store.getters["oidc/oidcAccessToken"]
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("AssignmentCounterUpdated", array => {
    app.store.commit("notificationHub/ASSIGNMENT_COUNTER_UPDATE", array);
  });
  function connectHub() {
    if (process.env.NODE_ENV === "production") {
      connection
        .start()
        .then(e => {})
        .catch(function(err) {
          return console.error(err.toString());
        });
    }
  }
  return {
    connectHub
  };
}
