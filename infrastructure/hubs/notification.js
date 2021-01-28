import dataApi from "~/static/dataApi";
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";

let context

function setTitle(titleName, count) {
  if (titleName) {
    document.title = `(${count})  ${titleName}`
  } else {
    document.title = `netije`
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
  connection.on("AssignmentCreated", (id, type, subject) => {
    app.$notify(subject, id, context)
  })
  connection.on("AssignmentCounterUpdated", array => {
    app.store.commit("notificationHub/ASSIGNMENT_COUNTER_UPDATE", array);
    if (array.length) {
      let count = array.map((el) => {
        return el.count
      }).reduce((accumulator, currentValue) => accumulator + currentValue)
      setTitle(context.$t('notificationMessage'), count)
    } else {
      setTitle()
    }
  });

  function connectHub(contxt) {
    context = contxt
    if (process.env.NODE_ENV === "production") {
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
