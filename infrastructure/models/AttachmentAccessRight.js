import AttachmentAccessRightGuid from "~/infrastructure/constants/attachmentAccessRight.js"
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
export default class AttachmentAccessRight {
    constructor(context) {
        this.elements = generatorMapObj({
            Constant: AttachmentAccessRightGuid,
            translateName: "attachmentAccessRight.btns",
            context: context,
        });
    }
    filtering(allowTypes) {
        const filterObj = {};
        for (let element in this.elements) {
            for (let allowType of allowTypes) {
                if (+element === allowType) {
                    filterObj[element] = this.elements[element];
                }
            }
        }
        return filterObj;
    }
    getAll() {
        return this.elements;
    }
    getById(id) {
        return this.elements[id];
    }
}