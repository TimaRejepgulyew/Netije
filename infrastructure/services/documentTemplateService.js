import dataApi from "~/static/dataApi";
import StoreModule from "~/infrastructure/services/StoreModule.js";
import docmentKindService from "~/infrastructure/services/documentKind.js";
export const documentModules = new StoreModule({
    moduleName: "documents",
    storeTemplate: []
});
export function loadDocument(context, documentId, payload) {
    payload.document.documentKind = docmentKindService.emptyDocumentKind();
    context.$store.commit(`documents/${documentId}/SET_DOCUMENT`, payload);
}
export async function load(context, { documentId }) {
    if (!documentModules.hasModule(documentId)) {
        documentModules.registerModule(context, documentId);
        const data = {
            id: documentId,
            name: "DocumentTemplate name",
            documentKindfId: 6,
            documentType: 2,
            businessUnitId: 1,
            departmentId: 1,
            canUpdate: true,
            note: "Adawdawdawdawdaw",
            params: {
                name: "Tima"
            }
        }
        // const { data } = await context.$axios.get(
        //     `${dataApi.documentTemplate.GetById}${documentId}`
        // );
        loadDocument(context, documentId, data);
        context.$store.commit(`documents/${documentId}/DATA_CHANGED`, false);
    }
    if (!context.$store.getters[`documents/${documentId}/isNew`]) {
        context.$store.commit(`documents/${documentId}/INCREMENT_OVERLAYS`);
    }
}

export async function refresh(context, { documentId }) {
    const { data } = await context.$axios.get(
        `${dataApi.documentTemplate.GetById}${documentId}`
    );
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