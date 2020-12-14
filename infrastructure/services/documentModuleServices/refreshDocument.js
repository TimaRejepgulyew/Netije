import dataApi from "~/static/dataApi";
import { loadDocumentToStore } from "./loadDocument.js";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
export default async function(context, { documentTypeGuid, documentId }) {
  let requiestApi;
  switch (documentTypeGuid) {
    case DocumentTypeGuid.DocumentTemplate:
      requiestApi = `${dataApi.documentTemplate.GetDocumentById}${documentId}`;
      break;
    default:
      requiestApi = `${dataApi.documentModule.GetDocumentById}${documentTypeGuid}/${documentId}`;
      break;
  }
  refresh(context, documentId, requiestApi);
}
export async function refresh(context, documentId, requiestApi) {
  let { data } = await context.$axios.get(requiestApi);
  loadDocumentToStore(context, documentId, data);
  context.$store.commit(`documents/${documentId}/SET_IS_NEW`, false);
  context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
}
