import dataApi from "~/static/dataApi";
import { saveAs } from "file-saver";
export default {
  async importFileVersion(document, file, context, fileName) {
    return await importFile(document, file, context, fileName);
  },

  async exportVersionDocumentEditor(context, { versionId }) {
    return await exportFile(
      context,
      `${dataApi.documentEditor.loadVersion}${versionId}`
    );
  },

  async exportLastVersionDocumentEditor(context, { documentId }) {
    return await exportFile(
      context,
      `${dataApi.documentEditor.loadDocument}${documentId}`
    );
  },
  async exportFileVersion(context, { versionId }) {
    return exportFile(
      context,
      `dataApi.documentModule.ExportVersion${versionId}`
    );
  },

  async exportFileLastVersion(context, { documentId }) {
    return exportFile(
      context,
      `dataApi.documentModule.ExportLastVersion${documentId}`
    );
  },

  downloadLastVersion(context, document) {
    download(
      context,
      `${dataApi.documentModule.ExportLastVersion}${document.id}`,
      document
    );
  },

  downloadVersion(context, version) {
    download(
      context,
      `${dataApi.documentModule.ExportVersion}${version.id}`,
      version
    );
  }
};

const importFile = async (document, file, context, fileName) => {
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

const exportFile = async (context, endpoint) => {
  const { data } = await context.$axios.get(endpoint, { responseType: "blob" });
  return data;
};

const download = (context, endpoint, obj) => {
  context.$awn.asyncBlock(exportFile(context, endpoint), response => {
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
