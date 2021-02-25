import StoreModule from "~/infrastructure/services/StoreModule.js"
import * as dynamicDocumentsStoreTemplate from "~/components/document-module/dynamic-document/infrastructure/storeTemplate/dynamic-documents.js";
import dataApi from "~/static/dataApi";

const dynamicTypeStoreModule = new StoreModule({
    moduleName: "dynamicDocumentComponents",
    storeTemplate: dynamicDocumentsStoreTemplate
});

const defaultElement = {
    dataField: "",
    colSpan: 2,
    isRequired: false,
    translationRu: "Новое поле",
    translationTk: "Taze",
    editorType: "dxTextBox"
}


class DynamicTypeControler {
    static getElements(context, documentType) {
        return context.$store.getters[`dynamicDocumentComponents/${documentType}/getAllElements`]
    }
    static generateId() {
        let date = new Date().getDate()
        let seconds = new Date().getSeconds()
        let randomNumber = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1
        return date + seconds + randomNumber
    }
    static getElementById(context, documentType, elementId) {
        return context.$store.getters[`dynamicDocumentComponents/${documentType}/getElementById`](elementId)
    }
    static removeElement(context, documentType, elementId) {
        context.$store.commit(`dynamicDocumentComponents/${documentType}/RemoveElement`, elementId)
    }
    static changeElement(context, documentType, newElement) {
        context.$store.commit(`dynamicDocumentComponents/${documentType}/ChangeElement`, newElement)
    }
    static addNewElement(context, documentType, elementId) {
        const newItem = {
            id: DynamicTypeControler.generateId(),
            ...defaultElement
        }
        if (elementId) {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/IntroduceElement`, { id: elementId, payload: newItem })
        } else {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/AddNewElement`, newItem)
        }
    }
    static async generateStore(context, documentType) {
        let overlay = context.$store.getters[`dynamicDocumentComponents/${documentType}/overlays`]
        if (overlay) {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/IncrementOverlays`)
        } else {
            dynamicTypeStoreModule.registerModule(context, documentType);
            if (documentType !== "constructor") {
                await context.$store.dispatch(`dynamicDocumentComponents/${documentType}/get_dynamic_type`, documentType)
            }
        }
        return context.$store
    }
    static async loadDynamicTypeDocument(context, documentType) {
        const { data } = context.$axios.get(dataApi.dynamicDocument.documentType + "/" + documentType)
    }
    static removeStore(context, documentType) {
        let overlay = context.$store.getters[`dynamicDocumentComponents/${documentType}/overlays`]
        if (overlay === 1) {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/CleanState`)
            dynamicTypeStoreModule.unregisterModule(context, documentType);
        } else {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/DecrementOverlays`)
        }
    }
    static async saveType(context, storeId) {
        if (storeId === "constructor") {
            await context.$store.dispatch(`dynamicDocumentComponents/${storeId}/create_dynamic_type`)
        } else {
            await context.$store.dispatch(`dynamicDocumentComponents/${storeId}/change_dynamic_type`)
        }
    }
    static async removeType(context, storeId) {
        await context.$store.dispatch(`dynamicDocumentComponents/${storeId}/remove_dynamic_type`)
    }

}

export default DynamicTypeControler