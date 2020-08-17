import DocumentType from "~/infrastructure/constants/documentType.js";
import { taskElements } from "~/infrastructure/constants/taskType.js";

import { createTask } from "~/infrastructure/services/taskService.js";
import { createDocument } from "~/infrastructure/services/documentService.js";

export default function(context) {
  CreateDocumentButton().init(context);
  return [
    {
      text: context.$t("createItemDialog.recordManagementGroup"),
      icon: "file",
      items: CreateDocumentButton()
        .init(context)
        .getPaperWorkDocument()
    },
    {
      text: context.$t("createItemDialog.taskGroup"),
      icon: "selectall",
      items: TaskButtons(context)
    },

    {
      text: context.$t("createItemDialog.accountingDocumentsGroup"),
      icon: financialArchiveIcon,
      items: CreateDocumentButton.init(context).getFinancialArchive(),
      visible:
        context.$store.getters["permissions/isResponsibleFinansicalArchive"]
    },
    {
      text: context.$t("createItemDialog.contractualDocumentsGroup"),
      icon: contractIcon,
      items: CreateDocumentButton.init(context).getContractDocument(),
      visible: context.$store.getters["permissions/isResponsibleForContracts"]
    }
  ];
}

function toRouter(context, { replaceOldRoute, route }) {
  if (replaceOldRoute) {
    context.$router.replace(route);
  } else {
    context.$router.push(route);
  }
}
function TaskButtons(context) {
  const taskTypeBtn = taskElements(context);
  for (let item in taskTypeBtn) {
    taskTypeBtn[item].create = async function(params) {
      const { taskId, taskType } = await createTask(context, {
        taskType: +item,
        ...params
      });
      const route = `/task/detail/${taskType}/${taskId}`;
      const replaceOldRoute = context.$store.getters[`tasks/${taskId}/isNew`];
      toRouter(context, { route, replaceOldRoute });
    };
  }
  return Object.values(taskTypeBtn(context));
}
function documentBtn(context) {
  async function create(context) {
    const { documentTypeGuid, documentId } = await createDocument(context);
    const route = `/paper-work/detail/${documentTypeGuid}/${documentId}`;
    const replaceOldRoute =
      context.$store.getters[`documents/${documentId}/isNew`];
    toRouter(context, { route, replaceOldRoute });
  }
  const documentTypes = documentTypes(context);
  for (let documentType in documentTypes) {
    documentTypes[documentType].create = async context => {
      return await create(context);
    };
  }
  return 
}
export class CreateDocumentButton extends DocumentType {
  init(context) {
    async function create(context) {
      const { documentTypeGuid, documentId } = await createDocument(context);
      const route = `/paper-work/detail/${documentTypeGuid}/${documentId}`;
      const replaceOldRoute =
        context.$store.getters[`dcoments/${documentId}/isNew`];
      toRouter(context, { route, replaceOldRoute });
    }
    super.init(context);
    for (let documentType in this.documentTypes) {
      this.documentTypes[documentType] = create;
    }
    return;
  }
}
