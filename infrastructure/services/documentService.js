import dataApi from "~/static/dataApi";
import { saveAs } from "file-saver";
import lifeCycleStore from "~/infrastructure/constants/lifeCycleStore.js";
export default {
  async uploadVersion(document, file, context) {
    return await upload(document, file, context);
  },
  previewVersion(versionId, document, context) {
    preview(
      `${dataApi.paperWork.PreviewVersion}${document.documentTypeGuid}/${document.id}/${versionId}`,
      context
    );
  },
  previewDocument(document, context) {
    preview(
      `${dataApi.paperWork.PreviewLastVersion}${document.documentTypeGuid}/${document.id}`,
      context
    );
  },
  downloadDocument(document, context) {
    download(
      `${dataApi.paperWork.DownloadLastVersion}${document.documentTypeGuid}/${document.id}`,
      document,
      context
    );
  },
  downloadVersion(document, version, context) {
    download(
      `${dataApi.paperWork.DownloadVersion}${document.documentTypeGuid}/${document.id}/${version.id}`,
      version,
      context
    );
  }
};
export function genereteLifeCycleItem(context, documentTypeGuid) {
  const store = lifeCycleStore(context);
  console.log(documentTypeGuid);
  return store.get(documentTypeGuid);
}

const preview = (endpoint, context) => {
  context.$awn.async(
    context.$axios
      .get(endpoint, {
        responseType: "blob"
      })
      .then(response => {
        var x = screen.width * 0.25;
        var offset = screen.height * 0.2;
        let params = `height=${screen.height - offset},width=${screen.width *
          0.5},left=${x},top=${50}`;
        window.open(URL.createObjectURL(response.data), "Preview", params);
      }),
    e => {},
    e => context.$awn.alert()
  );
};
const upload = async (document, file, context) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("documentId", document.id);

  return await context.$axios.post(
    dataApi.paperWork.CreateVersionFromFile + document.documentTypeGuid,
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
