import DocumentCreateBtn from "~/infrastructure/models/DocumentCreateBtn.js";
import { taskElements } from "~/infrastructure/constants/taskType.js";
import { createTask } from "~/infrastructure/services/taskService.js";
import { createDocument } from "~/infrastructure/services/documentService.js";
import financialArchiveIcon from "~/static/icons/document-type/financial-archive.svg";
import contractIcon from "~/static/icons/document-type/contract.svg";
import toRouter from "~/infrastructure/services/toRouterDetail.js";
export default function(context) {
  async function create(context, params) {
    const { documentTypeGuid, documentId } = await createDocument(
      context,
      params
    );
    const route = `/document-module/detail/${documentTypeGuid}/${documentId}`;
    const replaceOldRoute =
      context.$store.getters[`documents/${documentId}/isNew`];
    toRouter(context, { route, replaceOldRoute });
  }

  const paperWorkDocumentBtns = Object.values(
    new DocumentCreateBtn(context)
      .withMethodCreate(create)
      .filterPaperWorkDocument()
  );
  const financialArchiveDocumentBtns = Object.values(
    new DocumentCreateBtn(context)
      .withMethodCreate(create)
      .filterFinancialArchive()
  );
  const contractDocumentBtns = Object.values(
    new DocumentCreateBtn(context).withMethodCreate(create).filterContract()
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
      icon: financialArchiveIcon,
      items: financialArchiveDocumentBtns,
      visible:
        context.$store.getters["permissions/isResponsibleFinansicalArchive"]
    },
    {
      text: context.$t("createItemDialog.contractualDocumentsGroup"),
      icon: contractIcon,
      items: contractDocumentBtns,
      visible: context.$store.getters["permissions/isResponsibleForContracts"]
    }
  ];
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
