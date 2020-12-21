import dataApi from "~/static/dataApi";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";

function setTitle(titleName, count) {
  if (titleName) {
    document.title = `(${count})  ${titleName}`
  } else {
    document.title = `Netije`
  }
}

export default function (app) {
  const connection = new HubConnectionBuilder()
    .withUrl(dataApi.hubs.assignmentHub, {
      // transport: HttpTransportType.LongPolling,
      accessTokenFactory: () => app.store.getters["oidc/oidcAccessToken"]
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("AssignmentCounterUpdated", array => {
    app.store.commit("notificationHub/ASSIGNMENT_COUNTER_UPDATE", array);
    if (array.length) {
      let count = array.map((el) => {
        return el.count
      }).reduce((accumulator, currentValue) => accumulator + currentValue)
      setTitle("Входящ уведомление", count)
      app.$notify("Входящие уведомления", "Входящие уведомления", params)
    } else {
      setTitle()
    }
  });
  function connectHub() {
    if (process.env.NODE_ENV !== "production") {
      connection
        .start()
        .then(e => { })
        .catch(function (err) {
          return console.error(err.toString());
        });
    }
  }
  return {
    connectHub
  };
}
