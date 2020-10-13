import { HubConnectionBuilder, LogLevel, HttpTransportType, } from "@microsoft/signalr";
export default function (app) {
    const connection = new HubConnectionBuilder()
        .withUrl("http://192.168.4.179:8080/SignalR")
        // .withAutomaticReconnect(0)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build()
    async function tryConnect() {
        try {
            await connection.start();
            return true;
        } catch {
            console.log("connection failed")
            return false;
        }
    }
    async function scanDocument(params) {
        try {
            await connection.invoke("startScan", params);
            return true;
        } catch {
            console.log("connection failed")
            return false;
        }
    }
    async function generatePdf(files) {
        try {
            await connection.invoke("generatePdf", files);
            return true;
        } catch {
            console.log("connection failed")
            return false;
        }
    }
    async function deletePageById(pageId) {
        try {
            await connection.invoke("deletePageById", pageId);
            return true;
        } catch {
            console.log("connection failed")
            return false;
        }
    }
    function stopConnection() {
         connection.stop()
    }
    function onUpdateDeviceInfo(handler) {
        connection.on("updateDeviceInfo", handler)
    }
    function onScanCompleted(handler) {
        connection.on("scanCompleted", handler)
    }
    function onFileGenerated(handler) {
        connection.on("fileGenerated", handler)
    }
    onUpdateDeviceInfo((device) => {
        console.log("device", device);
        app.store.dispatch("scanner/setDevices", device)
    })
    onScanCompleted((document) => {
        console.log(document, "scan Completed");
        app.store.dispatch("scanner/setPage", document)
        app.store.commit("scanner/TOGGLE_LOADING",)
    })
    onFileGenerated((file) => {
        app.store.dispatch("scanner/setFile", file)
        app.store.commit("scanner/TOGGLE_LOADING",)
    })
    return {
        tryConnect,
        scanDocument,
        generatePdf,
        deletePageById,
        stopConnection
    }

}