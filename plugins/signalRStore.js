import { HubConnectionBuilder, LogLevel } from "@aspnet/signalr";
import dataApi from "~/static/dataApi";

export default ({ app }, inject) => {
  var connection = "";
  function connectionSignalR() {
    connection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/regions", {
        accessTokenFactory: () => app.store.getters["oidc/oidcAccessToken"]
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection
      .start()
      .then(res => {
      })
      .catch(function(err) {
        return console.error(err.toString());
      });
  }

  function RegionsNotification(message) {
    connection.invoke("SendTaskClient", message).catch(function(err) {
      return console.log(err);
    });
  }

  function GetNotification() {
    connectionSignalR();
    console.log("This is GetNotification")
    connection.on("Task", function(data) {
      console.log(data);
      return data;
    });
  }
  let obj = {
    regionsNotification: RegionsNotification,
    getNotification: GetNotification
  };
  inject("notifications", obj);
};
