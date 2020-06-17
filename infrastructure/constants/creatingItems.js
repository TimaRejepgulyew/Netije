import DocumentType from "~/infrastructure/constants/documentType.js";
import TaskType from "~/infrastructure/constants/taskType.js";
import documentChangeTracker from "~/infrastructure/services/documentChangeTracker.js";
import {
  createDocument,
  createTask
} from "~/infrastructure/services/create.js";
export default function (context) {
  return [
    {
      text: context.$t("shared.documents"),
      icon: "file",
      items: DocumentButtons(context)
    },
    {
      text: context.$t("menu.task"),
      icon: "selectall",
      items: TaskButtons(context)
    }
  ];
}

export function TaskButtons(context) {
  async function routeGenerator(taskType) {
    return `/task/detail/${taskType}`;
  }

  return [
    {
      icon: "plus",
      text: context.$t("translations.fields.createSimpleTask"),
      async create() {
        await createTask(context, {
          taskType: TaskType.SimpleTask
        });
        context.$router.push(`/task/detail/${TaskType.SimpleTask}`);
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createAcquaintanceTask"),
      async create() {
        await createTask(context, {
          taskType: TaskType.AcquaintanceTask
        });
        context.$router.push(`/task/detail/${TaskType.AcquaintanceTask}`);
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createActionItemExecutionTask"),
      async create() {
        await createTask(context, {
          taskType: TaskType.AcquaintanceTask
        });
        context.$router.push(
          `/task/detail/${TaskType.ActionItemExecutionTask}`
        );
      }
    }
  ];
}

const createDocumentRequest = async function (context, typeGuid) {
  var result = await documentChangeTracker.handleConfirm(context);
  if (!result)
    return;
  const replaceOldRoute = context.$store.getters["currentDocument/isNew"];
  await context.$store.dispatch("currentDocument/initNewDocument", { documentType: typeGuid })
  context.$store.commit("currentDocument/SKIP_DESTROY", true);
  context.$store.commit("currentDocument/SKIP_ROUTE_HANDLING", true);
  context.$store.commit("currentDocument/LOADED_FROM_URL", false);
  var documentId = context.$store.getters["currentDocument/document"].id;
  var route = `/paper-work/detail/${typeGuid}/${documentId}`;
  if (replaceOldRoute) {
    context.$router.replace(route);
  } else {
    context.$router.push(route);
  }
}


export function DocumentButtons(context) {
  return [
    {
      icon: "plus",
      text: context.$t("translations.headers.IncomingLetter"),
      async create() {
        await createDocumentRequest(context, DocumentType.IncomingLetter)
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.outgoingLetter"),
      async create() {
        await createDocumentRequest(context, DocumentType.OutgoingLetter)
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.order"),
      async create() {
        await createDocumentRequest(context, DocumentType.Order)
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.companyDirective"),
      async create() {
        await createDocumentRequest(context, DocumentType.CompanyDirective)

      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.simpleDocument"),
      async create() {
        await createDocumentRequest(context, DocumentType.SimpleDocument)

      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.addendum"),
      async create() {
        await createDocumentRequest(context, DocumentType.Addendum)

      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.memo"),
      async create() {
        await createDocumentRequest(context, DocumentType.Memo)

      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.powerOfAttorney"),
      async create() {
        await createDocumentRequest(context, DocumentType.PowerOfAttorney)

      }
    }
  ];
}
