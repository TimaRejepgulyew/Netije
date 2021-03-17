import StoreModule from "~/infrastructure/services/StoreModule.js"
import * as dynamicDocumentsStoreTemplate from "~/components/document-module/dynamic-document/infrastructure/storeTemplate/dynamic-documents.js";

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
        context.$store.commit(`dynamicDocumentComponents/${documentType}/REMOVE_ELEMENT`, elementId)
    }
    static changeElement(context, documentType, newElement) {
        context.$store.commit(`dynamicDocumentComponents/${documentType}/CHANGE_ELEMENT`, newElement)
    }
    static addNewElement(context, documentType, elementId) {
        const newItem = {
            id: DynamicTypeControler.generateId(),
            ...defaultElement
        }
        if (elementId) {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/INSERT_UNDER_ELEMENT`, { id: elementId, payload: newItem })
        } else {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/ADD_NEW_ELEMENT`, newItem)
        }
    }
    static async generateStore(context, documentType, isNewDocument = false) {
        if (!dynamicTypeStoreModule.hasModule(documentType)) {
            dynamicTypeStoreModule.registerModule(context, documentType);
            if (documentType !== "create") {
                await context.$store.dispatch(`dynamicDocumentComponents/${documentType}/get_dynamic_type_by_id`, documentType)
            }
        }
        if (isNewDocument) {
            console.log(context.$store.commit(`dynamicDocumentComponents/${documentType}/INCREMENT_OVERLAYS`));
            context.$store.commit(`dynamicDocumentComponents/${documentType}/INCREMENT_OVERLAYS`)
        }
    }
    static removeStore(context, documentType) {
        let overlay = context.$store.getters[`dynamicDocumentComponents/${documentType}/overlays`]
        console.log(overlay)
        if (overlay === 1) {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/CLEAN_STATE`)
            dynamicTypeStoreModule.unregisterModule(context, documentType);
        } else {
            context.$store.commit(`dynamicDocumentComponents/${documentType}/DECREMENT_OVERLAYS`)
        }
    }
    static async saveType(context, documentType) {
        if (documentType === "create") {
            await context.$store.dispatch(`dynamicDocumentComponents/${documentType}/create_dynamic_type`)
        } else {
            await context.$store.dispatch(`dynamicDocumentComponents/${documentType}/change_dynamic_type`, documentType)
        }
    }
    static checkDataField(context, documentType) {
        context.$store.commit(`dynamicDocumentComponents/${documentType}/CHECK_DATA_FIELD`)
    }
    static async removeType(context, documentType) {
        await context.$store.dispatch(`dynamicDocumentComponents/${documentType}/remove_dynamic_type`, documentType)
    }

}

export default DynamicTypeControler