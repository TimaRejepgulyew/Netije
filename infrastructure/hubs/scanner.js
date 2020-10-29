import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";
export default function(app) {
  const connection = new HubConnectionBuilder()
    .withUrl("http://192.168.4.170:8080/SignalR")
    // .withAutomaticReconnect(0)
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();
  async function tryConnect() {
    try {
      await connection.start();
      return true;
    } catch {
      console.log("connection failed");
      return false;
    }
  }
  async function scanDocument(params) {
    try {
      await connection.invoke("startScan", params);
      return true;
    } catch {
      console.log("connection failed");
      return false;
    }
  }
  async function generatePdf(files) {
    try {
      await connection.invoke("generatePdf", files);
      return true;
    } catch {
      console.log("connection failed");
      return false;
    }
  }
  function onError(handler) {
    connection.on("error", handler);
  }
  function stopConnection() {
    connection.stop();
  }
  function onUpdateDeviceInfo(handler) {
    connection.on("updateDeviceInfo", handler);
  }
  function onScanCompleted(handler) {
    connection.on("scanCompleted", handler);
  }
  function onFileGenerated(handler) {
    connection.on("fileGenerated", handler);
  }
  onUpdateDeviceInfo(device => {
    console.log("device", device);
    app.store.dispatch("scanner/setDevices", device);
  });
  onScanCompleted(document => {
    app.store.dispatch("scanner/setPage", document);
    app.store.commit("scanner/TOGGLE_LOADING");
  });
  onFileGenerated(file => {
    console.log(file, "scan Completed");
    app.store.dispatch("scanner/setFile", file);
  });
  onError(message => {
    app.store.dispatch("scanner/onError", message);
    console.log("error");
  });
  return {
    tryConnect,
    scanDocument,
    generatePdf,
    stopConnection
  };
}
