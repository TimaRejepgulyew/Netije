import dataApi from "~/static/dataApi";
import { saveAs } from "file-saver";

export default {
  async uploadVersion(document, file, context, fileName) {
    return await upload(document, file, context, fileName);
  },
  async previewVersion(context, { documetnId, versionId }) {
    return await preview(
      `${dataApi.documentEditor.loadVersion}/${documetnId}/${versionId}`,
      context
    );
  },
  async previewDocument(context, { documentId }) {
    return await preview(
      `${dataApi.documentEditor.loadDocument}/${documentId}`,
      context
    );
  },
  downloadDocument(document, context) {
    download(
      `${dataApi.documentModule.DownloadLastVersion}${document.documentTypeGuid}/${document.id}`,
      document,
      context
    );
  },
  downloadVersion(document, version, context) {
    download(
      `${dataApi.documentModule.DownloadVersion}${document.documentTypeGuid}/${document.id}/${version.id}`,
      version,
      context
    );
  }
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
const preview = async (endpoint, context) => {
  const { data } = await context.$axios.get(endpoint);
  return data;
};
const upload = async (document, file, context, fileName) => {
  let formData = new FormData();
  formData.append("file", file, fileName);
  formData.append("documentId", document.id);
  return await context.$axios.post(
    dataApi.documentModule.CreateVersionFromFile + document.documentTypeGuid,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
};
const download = (endpoint, obj, context) => {
  context.$awn.async(
    context.$axios
      .get(endpoint, {
        responseType: "blob"
      })
      .then(response => {
        var blob = new Blob([response.data], {
          type: `data:${response.data.type}`
        });
        saveAs(blob, `${obj.name}${obj.extension.toLowerCase()}`);
      })
  );
};
