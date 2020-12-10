import { loadDocumentToStore } from "./loadDocument.js";
import dataApi from "~/static/dataApi";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import { documentModules } from "~/infrastructure/services/documentService.js";
export default async function(context, params) {
  console.log(params);
  switch (params.documentTypeGuid) {
    case DocumentTypeGuid.DocumentTemplate:
      return await createDocumentTemplate(context);
      break;
    default:
      return await createDocument(context, params);
      break;
  }
}

export async function createDocument(context, params) {
  const { data } = await context.$axios.post(
    dataApi.documentModule.Documents,
    params
  );
  const { id: documentId, documentTypeGuid } = data.document;
  documentModules.setStoreTemplate(documentTypeGuid);
  await documentModules.registerModule(context, documentId);
  loadDocumentToStore(context, documentId, data);

  context.$store.commit(`documents/${documentId}/SET_IS_NEW`, true);
  context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  context.$store.commit(`documents/${documentId}/DATA_CHANGED`, true);
  context.$store.commit(`documents/${documentId}/SKIP_ROUTE_HANDLING`, true);
  return { documentId, documentTypeGuid };
}

export async function createDocumentTemplate(context) {
  const { data } = await context.$axios.post(
    dataApi.documentTemplate.Documents,
    {}
  );

  const { id: documentId, documentTypeGuid } = data.document;
  data.document.parameters = [];
  documentModules.setStoreTemplate(documentTypeGuid);
  await documentModules.registerModule(context, documentId);
  loadDocumentToStore(context, documentId, data);
  return { documentId, documentTypeGuid };
}

export async function createLeadingDocument(context, params) {
  const { documentId, documentTypeGuid, name } = await createDocument(
    context,
    params
  );
  return { documentId, documentTypeGuid };
}
