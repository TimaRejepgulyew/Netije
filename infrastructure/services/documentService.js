import dataApi from "~/static/dataApi";
import DocumentStoreTemplate from "~/infrastructure/services/DocumentStoreModule.js"
import docmentKindService from "~/infrastructure/services/documentKind.js";
export const documentModules = new DocumentStoreTemplate({
  moduleName: "documents",
});

export function loadDocument(context, documentId, payload) {
  payload.document.documentKind = docmentKindService.emptyDocumentKind();
  context.$store.commit(
    `documents/${documentId}/IS_REGISTERED`,
    payload.document.registrationState
  );
  context.$store.commit(`documents/${documentId}/SET_DOCUMENT`, payload);
}
export async function createDocumentTemplate() {
  const { data } = await context.$axios.post(
    dataApi.documentTemplate.createDocumentTemplate,
    params
  );
  const documentId = data.document.id;
  const documentTypeGuid = data.document.documentTypeGuid;
  documentModules.setStoreTemplate(documentTypeGuid)
  await documentModules.registerModule(context, documentId);
  loadDocument(context, documentId, data);
}
export async function createDocument(context, params) {
  const { data } = await context.$axios.post(
    dataApi.documentModule.Documents,
    params
  );
  const documentId = data.document.id;
  const documentTypeGuid = data.document.documentTypeGuid;
  documentModules.setStoreTemplate(documentTypeGuid)
  await documentModules.registerModule(context, documentId);
  loadDocument(context, documentId, data);

  context.$store.commit(`documents/${documentId}/SET_IS_NEW`, true);
  context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  context.$store.commit(`documents/${documentId}/DATA_CHANGED`, true);
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
export async function loadDocumentTemplate(context, { documentTypeGuid, documentId }) {
  if (!documentModules.hasModule(documentId)) {
    documentModules.setStoreTemplate(documentTypeGuid)
    documentModules.registerModule(context, documentId);

    // const { data } = await context.$axios.get(
    //   `${dataApi.documentTemplate.GetDocumentById}${documentId}`
    // );
    const data = {
      document: {
        id: 1,
        name: "Test",
        note: "note",
        documentKindId: null,
        documentType: null,
        documentTypeGuid: null,
        businessUnitId: null,
        departmentId: null
      },
      isNew: false,
      isDataChanged: false,
      canUpdate: true,
      canDelete: true,
      canRegister: false,
      isRegistered: false,
      skipRouteHandling: true,
      overlays: null
    }
    loadDocument(context, documentId, data);
    context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
  }
  if (!context.$store.getters[`documents/${documentId}/isNew`]) {
    context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  }
}
export async function load(context, { documentTypeGuid, documentId }) {

  if (!documentModules.hasModule(documentId)) {
    documentModules.setStoreTemplate(documentTypeGuid)
    documentModules.registerModule(context, documentId);

    const { data } = await context.$axios.get(
      `${dataApi.documentModule.GetDocumentById}${documentTypeGuid}/${documentId}`
    );
    loadDocument(context, documentId, data);
    context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
  }
  if (!context.$store.getters[`documents/${documentId}/isNew`]) {
    context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  }
}

export async function refresh(context, { documentTypeGuid, documentId }) {
  let requiestApi
  switch (documentTypeGuid) {
    //TODO right request Api and documentTypeGuid add constant
    case 20:
      requiestApi = `${dataApi.documentTemplate.GetDocumentById}${documentId}`
      break
    default:
      requiestApi = `${dataApi.documentModule.GetDocumentById}${documentTypeGuid}/${documentId}`
      break
  }
  let { data } = await context.$axios.get(requiestApi);
  context.$store.commit(`documents/${documentId}/SET_IS_NEW`, false);
  context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
  loadDocument(context, documentId, data);
}
export function unload(context, documentId) {
  const overlays = context.$store.getters[`documents/${documentId}/overlays`];
  if (overlays === 0) {
    documentModules.unregisterModule(context, documentId);
  } else context.$store.commit(`documents/${documentId}/DECREMENT_OVERLAYS`);
}
