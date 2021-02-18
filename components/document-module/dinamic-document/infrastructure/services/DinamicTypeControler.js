import StoreModule from "~/infrastructure/services/StoreModule.js"
import * as dinamicDocumentsStoreTemplate from "~/components/document-module/dinamic-document/infrastructure/storeTemplate/dinamic-documents.js";
import Item from "~/components/document-module/dinamic-document/infrastructure/classes/Item.js"

const dinamicTypeStoreModule = new StoreModule({
    moduleName: "dinamicType",
    storeTemplate: dinamicDocumentsStoreTemplate
});

const defaultElement = {
    fieldName: "",
    colSpan: 2,
    isRequired: false,
    label: {
        text: "Новое поле",
        location: "left",
    },
    editorOptions: {},
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
        let overlay = context.$store.getters[`dinamicType/${this.id}/getOverlays`]
        if (overlay) {
            this.context.$store.commit(`dinamicType/${id}/IncrementOverlays`)
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
    checkDataChanged() {
        this.isDataChanged = this.store.getters[`dinamicType/${this.id}/isDataChanged`]
    }
    getElementById(id) {
        return this.store.getters[`dinamicType/${this.id}/getElementById`](id)
    }
    addNewElement(id) {
        const newItem = new Item(this.context, {
            id: DinamicTypeControler.generateId(),
            ...defaultElement
        })
        if (id) {
            this.store.commit(`dinamicType/${this.id}/IntroduceElement`, { id, payload: newItem })
        } else {
            this.store.commit(`dinamicType/${this.id}/AddNewElement`, newItem)
        }
        this.checkDataChanged()
    }
    changeElement(newElement) {
        this.store.commit(`dinamicType/${this.id}/ChangeElement`, newElement)
        this.checkDataChanged()
    }
    removeElement(id) {
        this.store.commit(`dinamicType/${this.id}/RemoveElement`, id)
        this.checkDataChanged()
    }
    saveType(id) {
        if (this.id === "constructor") {
            this.store.dispatch(`dinamicType/${this.id}/create_dinamic_type`)
        } else {
            this.store.dispatch(`dinamicType/${this.id}/change_dinamic_type`, id)
        }
        this.checkDataChanged()
    }
    removeStore() {
        let overlay = this.store.getters[`dinamicType/${this.id}/getOverlays`]
        if (overlay) {
            this.store.commit(`dinamicType/${this.id}/DecrementOverlays`)
        } else {
            dinamicTypeStoreModule.unregisterModule(this.context, this.id);
        }
    }
}


export default DinamicTypeControler