import BaseItem from "~/components/document-module/dinamic-document/infrastructure/models/items/BaseItem.js"



function ParseItems(context, items) {
    return items.map((item) => {
        let newItem = new BaseItem(context, item)
        return newItem
    })

}

export default ParseItems