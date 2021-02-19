import StoreModule from "~/infrastructure/services/StoreModule.js"
import * as dinamicDocumentsStoreTemplate from "~/components/document-module/dinamic-document/infrastructure/storeTemplate/dinamic-documents.js";
import BaseItem from "~/components/document-module/dinamic-document/infrastructure/models/items/BaseItem.js"

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
    static generateStore(context, documentType) {
        let overlay = context.$store.getters[`dinamicDocumentComponents/${documentType}/getOverlays`]
        if (overlay) {
            context.$store.commit(`dinamicDocumentComponents/${documentType}/IncrementOverlays`)
        } else {
            dinamicTypeStoreModule.registerModule(context, documentType);
        }
        return context.$store
    }
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
    static removeStore(context, documentType) {
        let overlay = context.$store.getters[`dinamicDocumentComponents/${documentType}/getOverlays`]
        if (overlay) {
            context.$store.commit(`dinamicDocumentComponents/${documentType}/DecrementOverlays`)
        } else {
            dinamicTypeStoreModule.unregisterModule(context, documentType);
        }
    }
    static addNewElement(context, documentType, elementId) {
        const newItem = {
            id: DinamicTypeControler.generateId(),
            ...defaultElement
        }
        if (elementId) {
            context.$store.commit(`dinamicDocumentComponents/${documentType}/IntroduceElement`, { elementId, payload: newItem })
        } else {
            context.$store.commit(`dinamicDocumentComponents/${documentType}/AddNewElement`, newItem)
        }
    }
    static renderForm(context, documentType) {
        context.$store.commit(`dinamicDocumentComponents/${documentType}/StartRerender`)
        setTimeout(() => {
            context.$store.commit(`dinamicDocumentComponents/${documentType}/StopRerender`)
        }, 1000)
    }
    // checkDataChanged() {
    //     this.isDataChanged = this.store.getters[`dinamicDocumentComponents/${this.id}/isDataChanged`]
    // }
    saveType(id) {
        if (this.id === "constructor") {
            this.store.dispatch(`dinamicDocumentComponents/${this.id}/create_dinamic_type`)
        } else {
            this.store.dispatch(`dinamicDocumentComponents/${this.id}/change_dinamic_type`, id)
        }
    }

}

export default DinamicTypeControler