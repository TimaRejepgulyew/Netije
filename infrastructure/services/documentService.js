import load from "~/infrastructure/services/documentModuleServices/loadDocument.js";
import save from "~/infrastructure/services/documentModuleServices/saveDocument.js";
import refresh from "~/infrastructure/services/documentModuleServices/refreshDocument.js";
import createDocument, {
  createLeadingDocument
} from "~/infrastructure/services/documentModuleServices/createDocument.js";
import DocumentStoreTemplate from "~/infrastructure/services/DocumentStoreModule.js";
export const documentModules = new DocumentStoreTemplate({
  moduleName: "documents"
});

function unload(context, documentId) {
  const overlays = context.$store.getters[`documents/${documentId}/overlays`];
  if (overlays === 0) {
    context.$store.commit(`documents/${documentId}/CLEAN_STATE`);

    documentModules.unregisterModule(context, documentId);
  } else context.$store.commit(`documents/${documentId}/DECREMENT_OVERLAYS`);
}

export { load, save, refresh, createDocument, createLeadingDocument, unload };
