import dataApi from "~/static/dataApi";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
export default function(app) {
  const connection = new HubConnectionBuilder()
    .withUrl(dataApi.hubs.UserOnline, {
      accessTokenFactory: () => app.store.getters["oidc/oidcAccessToken"]
    })
    .configureLogging(LogLevel.Information)
    .build();

  connection.on("EndSession", async () => {
    app.store.dispatch("oidc/signOutOidc");
  });

  async function connectHub() {
    if (process.env.NODE_ENV === "production") {
      try {
        await connection.start();
      } catch (err) {
        setTimeout(connectHub, 5000);
      }
    }
  }

  connection.onclose(connectHub);
  return {
    connectHub
  };
}
