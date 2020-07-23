import dataApi from "~/static/dataApi";
import * as documentStoreTemplate from "~/infrastructure/storeTemplate/documentStore.js";
import StoreModule from "~/infrastructure/services/StoreModule.js";
import DocumentType from "~/infrastructure/constants/DcoumentType.js";
export const documentModules = new StoreModule({
  moduleName: "documents",
  storeTemplate: documentStoreTemplate
});

export async function createDocument(context, params) {
  const { data } = await context.$axios.post(dataApi.task.CreateTask, params);
  const documentId = data.document.id;
  const documentTypeGuid = data.document.documentTypeGuid;
  await documentModules.registerModule(context, documentId);
  context.$store.commit(`documents/${taskId}/SET_TASK`, data);
  context.$store.commit(`documents/${taskId}/SET_IS_DATA_CHANGED`, true);
  context.$store.commit(`documents/${taskId}/IS_NEW`, true);
  context.$store.commit(`documents/${taskId}/INCREMENT_OVERLAYS`);
  return { documentId, documentTypeGuid };
}

export async function createLeadingDocument(context, leadingDocumentId) {
  return await createTask(context, { leadingDocumentId });
}
export async function load(context, { documentTypeGuid, documentId }) {
  if (!documentModules.hasModule(documentId)) {
    const { data } = await context.$axios.get(
      `${dataApi.document.GetDocumentById}${documentTypeGuid}/${documentId}`
    );
    await documentModules.registerModule(context, documentId);
    context.$store.commit(`documents/${documentId}/SET_TASK`, data);
  }
  context.$store.commit(`documents/${taskId}/INCREMENT_OVERLAYS`);
}
export function unload(context, taskId) {
  const overlays = context.$store.getters[`documents/${taskId}/overlays`];
  if (!overlays) {
    documentModules.unregisterModule(context, taskId);
  } else context.$store.commit(`documents/${taskId}/DECREMENT_OVERLAYS`);
}
