import DocumentType from "~/infrastructure/constants/documentType.js";
import TaskType from "~/infrastructure/constants/taskType.js";
import documentChangeTracker from "~/infrastructure/services/documentChangeTracker.js";
export default function(context) {
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
export const createTaskRequest = async function(context, params) {
  const replaceOldRoute = context.$store.getters["currentTask/isNew"];
  await context.$store.dispatch("currentTask/initTask", params);
  const taskId = context.$store.getters["currentTask/task"].id;
  const route = `/task/detail/${params.taskType}/${taskId}`;
  if (replaceOldRoute) {
    context.$router.replace(route);
  } else {
    context.$router.push(route);
  }
};
export function TaskButtons(context) {
  return [
    {
      icon: "plus",
      text: context.$t("translations.fields.createSimpleTask"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.SimpleTask,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createAcquaintanceTask"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.AcquaintanceTask,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createActionItemExecutionTask"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.ActionItemExecutionTask,
          ...params
        });
      }
    }
  ];
}

export const createDocumentRequest = async function(context, params) {
  var result = await documentChangeTracker.handleConfirm(context);
  if (!result) return;
  const replaceOldRoute = context.$store.getters["currentDocument/isNew"];
  await context.$store.dispatch("currentDocument/initNewDocument", params);
  context.$store.commit("currentDocument/SKIP_DESTROY", true);
  context.$store.commit("currentDocument/SKIP_ROUTE_HANDLING", true);
  context.$store.commit("currentDocument/LOADED_FROM_URL", false);
  var documentId = context.$store.getters["currentDocument/document"].id;
  const route = `/paper-work/detail/${params.documentType}/${documentId}`;
  if (replaceOldRoute) {
    context.$router.replace(route);
  } else {
    context.$router.push(route);
  }
};

export function DocumentButtons(context) {
  return [
    {
      icon: "plus",
      text: context.$t("translations.headers.IncomingLetter"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.IncomingLetter,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.outgoingLetter"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.OutgoingLetter,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.order"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Order,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.companyDirective"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.CompanyDirective,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.simpleDocument"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.SimpleDocument,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.addendum"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Addendum,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.memo"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Memo,
          ...params
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.powerOfAttorney"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.PowerOfAttorney,
          ...params
        });
      }
    }
  ];
}
