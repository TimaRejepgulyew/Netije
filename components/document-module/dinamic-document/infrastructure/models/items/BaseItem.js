class BaseItem {
    constructor(context, options) {
        this.id = options.id;
        this.colSpan = options.colSpan;
        this.dataField = options.dataField;
        this.isRequired = options.isRequired;
        this.editorType = options.editorType;
        this.label = BaseItem.generateLabel(context, { ru: options.translationRu, tk: options.translationTk });
        this.editorOptions = {
            onFocusIn() {
                context.$emit("onFocusField", options.id)
            }
        }
    }
    static generateLabel(context, label) {
        const lab = {
            text: "",
            location: "left",
        }
        if (context.$i18n.loadedLanguages[0] === "ru") {
            lab.text = label.ru
        } else {
            lab.text = label.tk
        }
        return lab
    }
}

export default BaseItem