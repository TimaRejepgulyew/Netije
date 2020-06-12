import DocumentType from "~/infrastructure/constants/documentType.js";
import TaskType from "~/infrastructure/constants/taskType.js";
import {
  createDocument,
  createTask
} from "~/infrastructure/services/create.js";
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

export function TaskButtons(context) {
  async function generateUrl(documentType) {
    context.$store.getters["currentdocument"];
    return `/task/create/${documentType}`;
  }

  return [
    {
      icon: "plus",
      text: context.$t("translations.fields.createSimpleTask"),
      path: generateUrl(TaskType.SimpleTask)
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createAcquaintanceTask"),
      path: generateUrl(TaskType.AcquaintanceTask)
    },
    {
      icon: "plus",
      text: context.$t("translations.fields.createActionItemExecutionTask"),
      path: generateUrl(TaskType.ActionItemExecutionTask)
    }
  ];
}

export function DocumentButtons(context) {
  return [
    {
      icon: "plus",
      text: context.$t("translations.headers.IncomingLetter"),
      async create() {
        createDocument(context, { documentType: DocumentType.IncomingLetter });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.outgoingLetter"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.OutgoingLetter
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.order"),
      async create() {
        await createDocument(context, { documentType: DocumentType.Order });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.companyDirective"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.CompanyDirective
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.simpleDocument"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.SimpleDocument
        });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.addendum"),
      async create() {
        await createDocument(context, { documentType: DocumentType.Addendum });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.memo"),
      async create() {
        await createDocument(context, { documentType: DocumentType.Memo });
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.powerOfAttorney"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.PowerOfAttorney
        });
      }
    }
  ];
}
