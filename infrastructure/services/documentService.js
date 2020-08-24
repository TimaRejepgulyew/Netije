import dataApi from "~/static/dataApi";
import * as documentStoreTemplate from "~/infrastructure/storeTemplate/documentStore.js";
import StoreModule from "~/infrastructure/services/StoreModule.js";
import docmentKindService from "~/infrastructure/services/documentKind.js";
export const documentModules = new StoreModule({
  moduleName: "documents",
  storeTemplate: documentStoreTemplate
});
export function loadDocument(context, documentId, payload) {
  payload.document.documentKind = docmentKindService.emptyDocumentKind();
  context.$store.commit(
    `documents/${documentId}/IS_REGISTERED`,
    payload.document.registrationState
  );
  context.$store.commit(`documents/${documentId}/SET_DOCUMENT`, payload);
}
export async function createDocument(context, params) {
  const { data } = await context.$axios.post(
    dataApi.documentModule.Documents,
    params
  );
  const documentId = data.document.id;
  const documentTypeGuid = data.document.documentTypeGuid;
  await documentModules.registerModule(context, documentId);
  loadDocument(context, documentId, data);

  context.$store.commit(`documents/${documentId}/SET_IS_NEW`, true);
  context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  context.$store.commit(`documents/${documentId}/DATA_CHANGED`, true);
  context.$store.commit(`documents/${documentId}/SKIP_DESTROY`, true);
  context.$store.commit(`documents/${documentId}/SKIP_ROUTE_HANDLING`, true);
  return { documentId, documentTypeGuid };
}

export async function createLeadingDocument(context, params) {
  const { documentId, documentTypeGuid } = await createDocument(
    context,
    params
  );
  return { documentId, documentTypeGuid };
}
export async function load(
  context,
  { documentTypeGuid, documentId },
  refresh = "false"
) {
  if (!documentModules.hasModule(documentId)) {
    documentModules.registerModule(context, documentId);
    context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  }
  if (!documentModules.hasModule(documentId) || refresh) {
    const { data } = await context.$axios.get(
      `${dataApi.documentModule.GetDocumentById}${documentTypeGuid}/${documentId}`
    );
    context.$store.commit(`documents/${documentId}/SET_IS_NEW`, false);
    context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
    loadDocument(context, documentId, data);
  }
}
export function unload(context, documentId) {
  const overlays = context.$store.getters[`documents/${documentId}/overlays`];
  if (overlays === 0) {
    documentModules.unregisterModule(context, documentId);
  } else context.$store.commit(`documents/${documentId}/DECREMENT_OVERLAYS`);
}
