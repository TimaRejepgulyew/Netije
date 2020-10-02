import { HubConnectionBuilder, LogLevel, HttpTransportType, } from "@microsoft/signalr";
export default function (app) {
    const connection = new HubConnectionBuilder()
        .withUrl("http://192.168.4.179:8080/SignalR")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build()
    // connection.on("UpdateDeviceInfo"(devices => {
    // }));

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
            await connection.invoke("scanDocument", params);
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
    function onUpdateDeviceInfo(handler) {
        connection.on("UpdateDeviceInfo", handler)
    }
    function onDocumentScannered(handler) {
        connection.on("DocumentScannered", handler)
    }
    function onFileGenerated(handler) {
        connection.on("FileGenerated", handler)
    }
    onUpdateDeviceInfo((device) => {
        console.log("device", device);
        app.dispatch("scanner/setDevice", device)
    })
    onDocumentScannered((document) => {
        app.dispatch("scanner/setPage", document)
    })
    onFileGenerated((file) => {
        app.dispatch("scanner/setFile", file)
    })
    return {
        tryConnect,
        scanDocument,
        generatePdf,
        deletePageById,
    }

}