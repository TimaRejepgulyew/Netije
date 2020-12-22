import load, {
  loadDocumentToStore
} from "~/infrastructure/services/documentModuleServices/loadDocument.js";
import save from "~/infrastructure/services/documentModuleServices/saveDocument.js";
import refresh from "~/infrastructure/services/documentModuleServices/refreshDocument.js";
import createDocument, {
  createLeadingDocument
} from "~/infrastructure/services/documentModuleServices/createDocument.js";
import DocumentStoreTemplate from "~/infrastructure/services/DocumentStoreModule.js";

const documentModules = new DocumentStoreTemplate({
  moduleName: "documents"
});

function unload(context, documentId) {
  const overlays = context.$store.getters[`documents/${documentId}/overlays`];
  if (overlays === 0) {
    context.$store.commit(`documents/${documentId}/CLEAN_STATE`);

    documentModules.unregisterModule(context, documentId);
  } else context.$store.commit(`documents/${documentId}/DECREMENT_OVERLAYS`);
}

export {
  documentModules,
  load,
  loadDocumentToStore,
  save,
  refresh,
  createDocument,
  createLeadingDocument,
  unload
};
