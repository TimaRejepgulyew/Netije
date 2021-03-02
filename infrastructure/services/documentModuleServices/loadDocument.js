import dataApi from "~/static/dataApi";
import { documentModules } from "~/infrastructure/services/documentService.js";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";
import DocumentTemplateStoreFactory from "~/infrastructure/factory/documentTemplateStoreFactory.js";
export default async function(context, { documentId, documentTypeGuid }) {
  switch (documentTypeGuid) {
    case DocumentTypeGuid.DocumentTemplate:
      return await loadDocumentTemplate(context, {
        documentId,
        documentTypeGuid
      });
    case DocumentTypeGuid.DynamicDocument:
      return await loadDynamicDocument(context, {
        documentId,
        documentTypeGuid
      });

    default:
      return await load(context, { documentId, documentTypeGuid });
  }
}

export async function load(context, { documentTypeGuid, documentId }) {
  if (!documentModules.hasModule(documentId)) {
    const { data } = await context.$axios.get(
      `${dataApi.documentModule.GetDocumentById}${documentId}`
    );
    const store = DocumentTemplateStoreFactory.createStore(documentTypeGuid);
    documentModules.registerDocumentModule(context, documentId, store);
    loadDocumentToStore(context, documentId, data);
    context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
  }
  if (context.$store.getters[`documents/${documentId}/isNew`] === false) {
    context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  }
  return { documentId, documentTypeGuid };
}

export async function loadDynamicDocument(
  context,
  { documentId, documentTypeGuid }
) {
  await load(context, { documentId, documentTypeGuid });
  const dynamicDocumentTypeId =
    context.$store.getters[`documents/${documentId}/document`]
      .dynamicDocumentTypeId;
  await DynamicTypeControler.generateStore(context, dynamicDocumentTypeId);
  return { documentId, documentTypeGuid };
}
export async function loadDocumentTemplate(
  context,
  { documentTypeGuid, documentId }
) {
  if (!documentModules.hasModule(documentId)) {
    const store = DocumentTemplateStoreFactory.createStore(documentTypeGuid);
    documentModules.registerDocumentModule(context, documentId, store);

    const { data } = await context.$axios.get(
      `${dataApi.documentTemplate.GetDocumentById}${documentId}`
    );

    loadDocumentToStore(context, documentId, data);
    context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
  }
  if (!context.$store.getters[`documents/${documentId}/isNew`]) {
    context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  }
  return { documentId, documentTypeGuid };
}

export function loadDocumentToStore(context, documentId, payload) {
  context.$store.commit(`documents/${documentId}/SET_DOCUMENT`, payload);
}
