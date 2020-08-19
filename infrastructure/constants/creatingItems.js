import { DocumentType } from "~/infrastructure/constants/documentType.js";
import { taskElements } from "~/infrastructure/constants/taskType.js";
import { createTask } from "~/infrastructure/services/taskService.js";
import { createDocument } from "~/infrastructure/services/documentService.js";

export default function(context) {
  async function create(context, params) {
    const { documentTypeGuid, documentId } = await createDocument(
      context,
      params
    );
    const route = `/paper-work/detail/${documentTypeGuid}/${documentId}`;
    const replaceOldRoute =
      context.$store.getters[`documents/${documentId}/isNew`];
    toRouter(context, { route, replaceOldRoute });
  }

  const paperWorkDocumentBtns = Object.values(
    new DocumentCreateButton(context)
      .withMethodCreate(create)
      .filterPaperWorkDocument()
  );
  const financialArchiveDocumentBtns = Object.values(
    new DocumentCreateButton(context)
      .withMethodCreate(create)
      .filterFinancialArchive()
  );
  const contractDocumentBtns = Object.values(
    new DocumentCreateButton(context).withMethodCreate(create).filterContract()
  );
  return [
    {
      text: context.$t("createItemDialog.recordManagementGroup"),
      icon: "file",
      items: paperWorkDocumentBtns
    },
    {
      text: context.$t("createItemDialog.taskGroup"),
      icon: "selectall",
      items: TaskButtons(context)
    },

    {
      text: context.$t("createItemDialog.accountingDocumentsGroup"),
      // icon: financialArchiveIcon,
      items: financialArchiveDocumentBtns,
      visible:
        context.$store.getters["permissions/isResponsibleFinansicalArchive"]
    },
    {
      text: context.$t("createItemDialog.contractualDocumentsGroup"),
      // icon: contractIcon,
      items: contractDocumentBtns,
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
  const taskTypes = taskElements(context);

  for (let taskType in taskTypes) {
    taskTypes[+taskType].create = async context => {
      const { taskId } = await createTask(context, {
        taskType: +taskType
      });
      const route = `/task/detail/${+taskType}/${taskId}`;
      const replaceOldRoute = context.$store.getters[`tasks/${taskId}/isNew`];
      toRouter(context, { route, replaceOldRoute });
    };
  }
  return Object.values(taskTypes);
}

export class DocumentCreateButton extends DocumentType {
  withMethodCreate(method) {
    for (let documentType in this.documentTypes) {
      this.documentTypes[documentType].create = context => {
        console.log(+documentType);
        method(context, { documentType: +documentType });
      };
    }
    return this;
  }
}
