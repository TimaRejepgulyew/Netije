import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";
export default function(app) {
  const connection = new HubConnectionBuilder()
    .withUrl("http://192.168.4.152:8886/SignalR")
    // .withUrl("http://localhost:8886/SignalR")
    // .withAutomaticReconnect(0)
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  async function sendUserId(userId) {
    console.log(userId);
    try {
      await connection.start();
      const serverUrl =
        process.env.NODE_ENV === "production"
          ? document.location.origin
          : process.env.serverUrl;
      await connection.invoke("notification", userId, serverUrl);
      stopConnection();
      return true;
    } catch {
      return false;
    }
  }
  return sendUserId;
}
