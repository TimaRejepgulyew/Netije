import StoreModule from "~/infrastructure/services/StoreModule.js"
import * as dinamicDocumentsStoreTemplate from "~/components/document-module/dinamic-document/infrastructure/storeTemplate/dinamic-documents.js";
import BaseItem from "~/components/document-module/dinamic-document/infrastructure/models/items/BaseItem.js"

const dinamicTypeStoreModule = new StoreModule({
    moduleName: "dinamicType",
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
    constructor(context, id) {
        this.context = context
        this.id = id ? id : "constructor"
        this.store = DinamicTypeControler.generateStore(this.context, this.id)
        this.elements = DinamicTypeControler.getElements(this.store, this.id)
        this.isDataChanged = false
    }
    static generateStore(context, id) {
        let overlay = context.$store.getters[`dinamicType/${id}/getOverlays`]
        if (overlay) {
            context.$store.commit(`dinamicType/${id}/IncrementOverlays`)
        } else {
            dinamicTypeStoreModule.registerModule(context, id);
        }
        return context.$store

    }
    static getElements(store, id) {
        return store.getters[`dinamicType/${id}/getAllElements`]
    }
    static generateId() {
        let date = new Date().getDate()
        let seconds = new Date().getSeconds()
        let randomNumber = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1
        return date + seconds + randomNumber
    }
    static getElementById(context, storeId, elementId) {
        return context.$store.getters[`dinamicType/${storeId}/getElementById`](elementId)
    }
    static removeElement(context, storeId, elementId) {
        console.log("context", context);
        console.log("storeId", storeId);
        console.log("elementId", elementId);
        context.$store.commit(`dinamicType/${storeId}/RemoveElement`, elementId)
    }
    static changeElement(context, storeId, newElement) {
        context.$store.commit(`dinamicType/${storeId}/ChangeElement`, newElement)
    }
    static removeStore(context, storeId) {
        let overlay = context.$store.getters[`dinamicType/${storeId}/getOverlays`]
        if (overlay) {
            context.$store.commit(`dinamicType/${storeId}/DecrementOverlays`)
        } else {
            dinamicTypeStoreModule.unregisterModule(context, storeId);
        }
    }
    checkDataChanged() {
        this.isDataChanged = this.store.getters[`dinamicType/${this.id}/isDataChanged`]
    }
    static addNewElement(context, storeId, elementId) {
        const newItem = {
            id: DinamicTypeControler.generateId(),
            ...defaultElement
        }
        if (elementId) {
            context.$store.commit(`dinamicType/${storeId}/IntroduceElement`, { elementId, payload: newItem })
        } else {
            context.$store.commit(`dinamicType/${storeId}/AddNewElement`, newItem)
        }
        // checkDataChanged()
    }
    saveType(id) {
        if (this.id === "constructor") {
            this.store.dispatch(`dinamicType/${this.id}/create_dinamic_type`)
        } else {
            this.store.dispatch(`dinamicType/${this.id}/change_dinamic_type`, id)
        }
        this.checkDataChanged()
    }

}

export default DinamicTypeControler