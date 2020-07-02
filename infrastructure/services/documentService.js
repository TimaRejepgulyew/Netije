import dataApi from "~/static/dataApi";
import { saveAs } from "file-saver";
import DocumentType from "~/infrastructure/constants/documentType.js";
import {
  lifeCycleStateStoreType1,
  lifeCycleStateStoreType2,
  lifeCycleStateStoreContract,
  lifeCycleStateStoreIncomingInvoice
} from "~/infrastructure/constants/lifeCycleState.js";
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
export function generateLifeCycleItemState(context, documentTypeGuid) {
  switch (documentTypeGuid) {
    case DocumentType.IncomingLetter:
    case DocumentType.OutgoingLetter:
      return lifeCycleStateStoreType1(context);
    case DocumentType.Order:
    case DocumentType.CompanyDirective:
    case DocumentType.SimpleDocument:
    case DocumentType.Addendum:
    case DocumentType.Memo:
    case DocumentType.PowerOfAttorney:
    case DocumentType.ContractStatement:
    case DocumentType.Waybill:
    case DocumentType.UniversalTransferDocument:
      return lifeCycleStateStoreType2(context);
    case DocumentType.IncomingTaxInvoice:
    case DocumentType.OutgoingTaxInvoice:
      return lifeCycleStateStoreType3(context);
    case DocumentType.Contract:
    case DocumentType.SupAgreement:
      return lifeCycleStateStoreContract(context);
    case DocumentType.IncomingInvoice:
      return lifeCycleStateStoreIncomingInvoice(context);
  }
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
