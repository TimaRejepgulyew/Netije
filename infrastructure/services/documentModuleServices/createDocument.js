import { loadDocumentToStore } from "./loadDocument.js";
import dataApi from "~/static/dataApi";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import { documentModules } from "~/infrastructure/services/documentService.js";
import DocumentTemplateStoreFactory from "~/infrastructure/factory/documentTemplateStoreFactory.js";
import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";
import { GenerateApi } from "~/infrastructure/services/documentApi.js";
export default async function (context, params) {
  switch (params.documentTypeGuid) {
    case DocumentTypeGuid.DocumentTemplate:
      return await createDocumentTemplate(context);
    case DocumentTypeGuid.DynamicDocument:
      return await createDynamicDocument(context, params);
    default:
      return await createDocument(context, params);
  }
}

export async function createDocument(context, params) {
  console.log("docApi", GenerateApi(params.documentTypeGuid));
  // DocumentApi(params.documentTypeGuid)
  const { data } = await context.$axios.post(GenerateApi(params.documentTypeGuid), { leadingDocumentId: 0 });
  const { id: documentId, documentTypeGuid } = data.document;
  const store = DocumentTemplateStoreFactory.createStore(
    params.documentTypeGuid
  );
  documentModules.registerDocumentModule(context, documentId, store);
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
  const store = DocumentTemplateStoreFactory.createStore(documentTypeGuid);
  documentModules.registerDocumentModule(context, documentId, store);
  loadDocumentToStore(context, documentId, data);
  return { documentId, documentTypeGuid };
}
export async function createDynamicDocument(context, params) {
  const { documentId, documentTypeGuid } = await createDocument(
    context,
    params
  );
  await DynamicTypeControler.generateStore(context, params.documentTypeId, true);
  return { documentId, documentTypeGuid };
}

export async function createLeadingDocument(context, params) {
  const { documentId, documentTypeGuid } = await createDocument(
    context,
    params
  );
  return { documentId, documentTypeGuid };
}
