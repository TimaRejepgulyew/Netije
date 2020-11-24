import DocumentSendActionGuid, {
  mapToTaskType
} from "~/infrastructure/constants/documentSendActionGuid.js";
import generatorMapObj from "~/infrastructure/services/generatorMapObj.js";
import * as documentSendActionGuidIcon from "~/static/icons/documentSendActionGuidIcon.js";
import { createTaskByDocument } from "~/infrastructure/services/taskService.js";
export default class DocumentSendAction {
  constructor(context) {
    this.elements = generatorMapObj({
      Constant: DocumentSendActionGuid,
      translateName: "documentSendAction.type",
      context: context,
      iconStores: documentSendActionGuidIcon
    });
  }
  init() {
    for (let element in this.elements) {
      this.elements[element].convertedToTaskTypeValue = mapToTaskType(
        this.elements[element].id
      );
      this.elements[element].create = async (
        context,
        params,
        listeners = []
      ) => {
        context.$popup.taskCard(
          context,
          {
            params: {
              ...params,
              taskType: this.elements[element].convertedToTaskTypeValue
            },
            handler: createTaskByDocument
          },
          {
            listeners: listeners
          }
        );
      };
    }
    return this;
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
