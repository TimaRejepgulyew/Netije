import dataApi from "~/static/dataApi";
import { saveAs } from "file-saver";

export default {
  previewVersion(version, context) {
    preview(dataApi.paperWork.PreviewVersion + version.id, context);
  },
  previewDocument(document, context) {
    preview(dataApi.paperWork.PreviewLastVersion + document.id, context);
  },
  downloadDocument(document, context) {
    download(
      `${dataApi.paperWork.DownloadLastVersion}${document.documentTypeGuid}/${document.id}`,
      document,
      context
    );
  },
  downloadVersion(document,version, context) {
    download(
      `${dataApi.paperWork.DownloadLastVersion}${document.documentTypeGuid}/${document.id}/${version.id}`,
      version,
      context
    );
  }
};

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
        saveAs(blob, `${obj.name}${obj.extension}`);
      })
  );
};
