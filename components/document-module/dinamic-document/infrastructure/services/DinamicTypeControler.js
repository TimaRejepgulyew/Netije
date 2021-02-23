import StoreModule from "~/infrastructure/services/StoreModule.js"
import * as dinamicDocumentsStoreTemplate from "~/components/document-module/dinamic-document/infrastructure/storeTemplate/dinamic-documents.js";

const dinamicTypeStoreModule = new StoreModule({
    moduleName: "dinamicDocumentComponents",
    storeTemplate: dinamicDocumentsStoreTemplate
});

const defaultElement = {
    dataField: "",
    colSpan: 2,
    isRequired: false,
    translationRu: "Новое поле",
    translationTk: "Taze",
    editorType: "dxTextBox"
}


class DinamicTypeControler {
    static getElements(context, documentType) {
        return context.$store.getters[`dinamicDocumentComponents/${documentType}/getAllElements`]
    }
    static generateId() {
        let date = new Date().getDate()
        let seconds = new Date().getSeconds()
        let randomNumber = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1
        return date + seconds + randomNumber
    }
    static getElementById(context, documentType, elementId) {
        return context.$store.getters[`dinamicDocumentComponents/${documentType}/getElementById`](elementId)
    }
    static removeElement(context, documentType, elementId) {
        context.$store.commit(`dinamicDocumentComponents/${documentType}/RemoveElement`, elementId)
    }
    static changeElement(context, documentType, newElement) {
        context.$store.commit(`dinamicDocumentComponents/${documentType}/ChangeElement`, newElement)
    }
    static addNewElement(context, documentType, elementId) {
        const newItem = {
            id: DinamicTypeControler.generateId(),
            ...defaultElement
        }
        if (elementId) {
            context.$store.commit(`dinamicDocumentComponents/${documentType}/IntroduceElement`, { id: elementId, payload: newItem })
        } else {
            context.$store.commit(`dinamicDocumentComponents/${documentType}/AddNewElement`, newItem)
        }
    }
    static async generateStore(context, documentType) {
        let overlay = context.$store.getters[`dinamicDocumentComponents/${documentType}/overlays`]
        if (overlay) {
            console.log("overlay", overlay);
            context.$store.commit(`dinamicDocumentComponents/${documentType}/IncrementOverlays`)
        } else {
            dinamicTypeStoreModule.registerModule(context, documentType);
            if (documentType !== "constructor") {
                await context.$store.dispatch(`dinamicDocumentComponents/${documentType}/get_dinamic_type`, documentType)
            }
        }
        return context.$store
    }
    static removeStore(context, documentType) {
        let overlay = context.$store.getters[`dinamicDocumentComponents/${documentType}/overlays`]
        if (overlay === 1) {
            dinamicTypeStoreModule.unregisterModule(context, documentType);
        } else {
            console.log("overlay", overlay);
            context.$store.commit(`dinamicDocumentComponents/${documentType}/DecrementOverlays`)
        }
    }
    static async saveType(context, storeId) {
        if (storeId === "constructor") {
            await context.$store.dispatch(`dinamicDocumentComponents/${storeId}/create_dinamic_type`)
        } else {
            await context.$store.dispatch(`dinamicDocumentComponents/${storeId}/change_dinamic_type`)
        }
    }
    static async removeType(context, storeId) {
        await context.$store.dispatch(`dinamicDocumentComponents/${storeId}/remove_dinamic_type`)
    }

}

export default DinamicTypeControler