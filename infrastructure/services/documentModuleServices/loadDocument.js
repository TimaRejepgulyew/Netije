import dataApi from "~/static/dataApi";
import documentKindService from "~/infrastructure/services/documentKind.js";
import { documentModules } from "~/infrastructure/services/documentService.js";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";

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
    documentModules.setStoreTemplate(documentTypeGuid);
    documentModules.registerModule(context, documentId);

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

    // const data = {
    //   document: {
    //     params: [
    //       { name: "wdawdaw", value: "value.test" },
    //       { name: "Test", value: "value.test" },
    //       { name: "best", value: "value.test" },
    //       { name: "gest", value: "value.test" },
    //       { name: "mwast", value: "value.test" },
    //       { name: "fest", value: "value.test" }
    //     ],
    //     id: 1,
    //     name: "Test",
    //     note: "note",
    //     documentKindId: null,
    //     documentType: null,
    //     documentTypeId: null,
    //     documentTypeGuid: 17,
    //     businessUnitId: null,
    //     departmentId: null
    //   },
    //   isNew: false,
    //   isDataChanged: false,
    //   canUpdate: true,
    //   canDelete: true,
    //   canRegister: false,
    //   isRegistered: false,
    //   skipRouteHandling: true,
    //   overlays: null
    // };
    loadDocumentToStore(context, documentId, data);
    context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
  }
  if (!context.$store.getters[`documents/${documentId}/isNew`]) {
    context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
  }
  return { documentId, documentTypeGuid };
}

export function loadDocumentToStore(context, documentId, payload) {
  payload.document.documentKind = documentKindService.emptyDocumentKind();
  context.$store.commit(
    `documents/${documentId}/IS_REGISTERED`,
    payload.document.registrationState
  );
  context.$store.commit(`documents/${documentId}/SET_DOCUMENT`, payload);
}
