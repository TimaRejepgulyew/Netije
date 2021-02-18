class Item {
    constructor(context, options) {
        this.id = options.id;
        this.colSpan = options.colSpan;
        this.dataField = options.dataField;
        this.isRequired = options.isRequired;
        this.editorType = options.editorType;
        this.label = options.label;
        // this.context = context
        this.editorOptions = {
            onFocusIn: () => {
                context.$emit("onFocusField", this.id);
            },
        }
    }
}

export default Item