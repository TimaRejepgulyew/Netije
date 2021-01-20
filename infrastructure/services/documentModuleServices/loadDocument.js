import dataApi from "~/static/dataApi";
import documentKindService from "~/infrastructure/services/documentKind.js";
import { documentModules } from "~/infrastructure/services/documentService.js";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import DocumentTemplateStoreFactory from "~/infrastructure/factory/documentTemplateStoreFactory.js";
export default async function(context, { documentId, documentTypeGuid }) {
  switch (documentTypeGuid) {
    case DocumentTypeGuid.DocumentTemplate:
      return await loadDocumentTemplate(context, {
        documentId,
        documentTypeGuid
      });
      break;
    default:
      return await load(context, { documentId, documentTypeGuid });
      break;
  }
}

export async function load(context, { documentTypeGuid, documentId }) {
  if (!documentModules.hasModule(documentId)) {
    const { data } = await context.$axios.get(
      `${dataApi.documentModule.GetDocumentById}${documentTypeGuid}/${documentId}`
    );
    const store = DocumentTemplateStoreFactory.createStore(documentTypeGuid);
    documentModules.registerDocumentModule(context, documentId, store);
    loadDocumentToStore(context, documentId, data);
    context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
  }
  if (!context.$store.getters[`documents/${documentId}/isNew`]) {
    context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  }

  return { documentId, documentTypeGuid };
}

export async function loadDocumentTemplate(
  context,
  { documentTypeGuid, documentId }
) {
  if (!documentModules.hasModule(documentId)) {
    documentModules.setStoreTemplate(documentTypeGuid);
    documentModules.registerModule(context, documentId);

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
  context.$store.commit(
    `documents/${documentId}/IS_REGISTERED`,
    payload.document.registrationState
  );
  context.$store.commit(`documents/${documentId}/SET_DOCUMENT`, payload);
}
