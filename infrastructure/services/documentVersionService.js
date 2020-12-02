import dataApi from "~/static/dataApi";
import { saveAs } from "file-saver";
export default {
  async createVersionFromFile(document, file, context, fileName) {
    return await exportFile(document, file, context, fileName);
  },
  async createVersionFromSpreadSheet(context, document, file) {
    const payload = {
      jsonData: JSON.stringify(file.Workbook),
      saveType: 0,
      versionType: 5,
      fileName: `test.xlsx`,
      contentType: 6

    };
    return await exportFileAsJson(
      context,
      `${dataApi.spreadSheet.ExportDocument}?documentId=${document.id}`,
      payload
    );
  },
  async createVersionFromDocumentEditor(document, file, context, fileName) {
    return await exportFile(document, file, context, fileName);
  },
  async importVersionSpreadSheet(context, { versionId }) {
    return await importFileJson(
      context,
      `${dataApi.spreadSheet.ImportVersion}${versionId}`
    );
  },

  async importLastVersionSpreadSheet(context, { documentId }) {
    return await importFileJson(
      context,
      `${dataApi.spreadSheet.ImportDocument}${documentId}`
    );
  },

  async importVersionDocumentEditor(context, { versionId }) {
    return await importFileJson(
      context,
      `${dataApi.documentEditor.ImportVersion}${versionId}`
    );
  },

  async importLastVersionDocumentEditor(context, { documentId }) {
    return await importFileJson(
      context,
      `${dataApi.documentEditor.ImportDocument}${documentId}`
    );
  },
  async importFileVersion(context, { versionId }) {
    return importFile(
      context,
      `${dataApi.documentModule.ImportVersion}${versionId}`
    );
  },

  async importFileLastVersion(context, { documentId }) {
    return importFile(
      context,
      `${dataApi.documentModule.ImportLastVersion}${documentId}`
    );
  },

  downloadLastVersion(context, document) {
    download(
      context,
      `${dataApi.documentModule.ImportLastVersion}${document.id}`,
      document
    );
  },

  downloadVersion(context, version) {
    download(
      context,
      `${dataApi.documentModule.ImportVersion}${version.id}`,
      version
    );
  }
};
const exportFileAsJson = async (context, endPoint, file) => {
  return await context.$axios.post(endPoint, file);
};
const exportFile = async (document, file, context, fileName) => {
  let formData = new FormData();
  formData.append("file", file, fileName);
  formData.append("documentId", document.id);
  return await context.$axios.post(
    dataApi.documentModule.CreateVersionFromFile,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};

const importFileJson = async (context, endpoint) => {
  const { data } = await context.$axios.get(endpoint);
  return data;
};
const importFile = async (context, endpoint) => {
  const { data } = await context.$axios.get(endpoint, { responseType: "blob" });
  return data;
};

const download = (context, endpoint, obj) => {
  context.$awn.asyncBlock(importFile(context, endpoint), response => {
    const blob = new Blob([response], {
      type: `data:${response.type}`
    });
    saveAs(blob, `${obj.name}${obj.extension.toLowerCase()}`);
  });
};

export function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);
  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    var begin = sliceIndex * sliceSize;
    var end = Math.min(begin + sliceSize, bytesLength);
    var bytes = new Array(end - begin);
    for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
