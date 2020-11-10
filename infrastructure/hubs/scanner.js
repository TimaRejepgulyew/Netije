import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType
} from "@microsoft/signalr";
import { alert } from "devextreme/ui/dialog";
export default function(app) {
  const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:8886/SignalR")
    // .withAutomaticReconnect(0)
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();
  async function tryConnect() {
    try {
      await connection.start();
      return true;
    } catch {
      return false;
    }
  }
  async function getDeviceParams(name) {
    try {
      await connection.invoke("getDeviceParams", name);
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
  function printerParams(handler) {
    connection.on("printerParams", handler);
  }
  function onUpdateDeviceInfo(handler) {
    connection.on("UpdateDeviceInfo", handler);
  }
  function onScanCompleted(handler) {
    connection.on("scanCompleted", handler);
  }
  function onFileGenerated(handler) {
    connection.on("fileGenerated", handler);
  }
  onUpdateDeviceInfo(devices => {
    console.log("device", devices);
    app.store.dispatch("scanner/setDevices", devices);
  });
  onScanCompleted(document => {
    app.store.dispatch("scanner/setPage", document);
    app.store.commit("scanner/CLOSE_LOADING");
  });
  onFileGenerated(file => {
    console.log(file, "scan Completed");
    app.store.dispatch("scanner/setFile", file);
  });
  onError(message => {
    app.store.dispatch("scanner/onError", message);
    console.log("error");
  });
  printerParams(currentDevice => {
    app.store.dispatch("scanner/setCurrentDeviceParamsStore", currentDevice);
  });
  return {
    getDeviceParams,
    tryConnect,
    scanDocument,
    generatePdf,
    stopConnection
  };
}
