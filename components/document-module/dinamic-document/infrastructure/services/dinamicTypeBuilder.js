const defaultElement = {
    fieldName: "",
    colSpan: 2,
    isRequired: false,
    label: {
        text: "Новое поле",
        location: "left",
    },
    template: "",
    editorOptions: {
    },
    editorType: "dxTextBox"
}


class Item {
    constructor(context, options) {
        this.index = options.index;
        this.colSpan = options.colSpan;
        this.dataField = options.dataField;
        this.isRequired = options.isRequired;
        this.editorType = options.editorType;
        this.label = options.label;
        this.editorOptions = {
            onFocusIn: () => {
                this.onFocusIn();
            },
        }
    }
    onFocusIn() {
        context.$emit("onFocusField", this.index);
    }
}


class DocumentTypeBuilder {
    constructor(context) {
        this.context = context
        this.store = context.$store
        this.elements = DocumentTypeBuilder.getElements(this.store)
    }
    static getElements(store) {
        return store.getters["dinamic-documents/getAllElements"]
    }
    
}



export default DocumentTypeBuilder