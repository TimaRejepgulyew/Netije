import TaskType from "../constants/taskType";
import DocumentType from "~/infrastructure/constants/documentType.js";
export default {
  generateTaskDetailRoute(taskType, taskId) {
    switch (taskType) {
      case TaskType.SimpleTask:
        return `/task/simple/${taskId}`;
      case TaskType.AcquaintanceTask:
        return `/task/acquaintance/${taskId}`;
      case TaskType.ActionItemExecutionTask:
        return `/task/action-item-execution/${taskId}`;
      default:
        throw "unknown task type";
    }
  },
  // generateDocumentDetailRoute(typeGuid, documentId) {
  //   return `/paper-work/detail/${typeGuid}/${documentId}`;
  // },
  // generateRouteByTypeGuid(typeGuid) {
  //   switch (typeGuid) {
  //     case DocumentType.IncommingDocument:
  //       return "incomming-letter";
  //     case DocumentType.OutgoingDocument:
  //       return "outgoing-letter";
  //     case DocumentType.Order:
  //       return "order";
  //     case DocumentType.CompanyDirective:
  //       return "company-directive";
  //     case DocumentType.SimpleDocument:
  //       return "simple-document";
  //     case DocumentType.Addendum:
  //       return "addendum";
  //     case DocumentType.Memo:
  //       return "memo";
  //     case DocumentType.PowerOfAttorney:
  //       return "power-of-attorney";
  //   }
  // }
};
