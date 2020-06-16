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

export function DocumentButtons(context) {
  function routeGenerator(typeGuid) {
    return `/paper-work/detail/${typeGuid}`;
  }
  return [
    {
      icon: "plus",
      text: context.$t("translations.headers.IncomingLetter"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.IncomingLetter
        });
        context.$router.push(routeGenerator(DocumentType.IncomingLetter));
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.outgoingLetter"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.OutgoingLetter
        });
        context.$router.push(routeGenerator(DocumentType.OutgoingLetter));
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.order"),
      async create() {
        await createDocument(context, { documentType: DocumentType.Order });
        context.$router.push(routeGenerator(DocumentType.Order));
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.companyDirective"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.CompanyDirective
        });
        context.$router.push(routeGenerator(DocumentType.CompanyDirective));
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.simpleDocument"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.SimpleDocument
        });
        context.$router.push(routeGenerator(DocumentType.SimpleDocument));
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.addendum"),
      async create() {
        await createDocument(context, { documentType: DocumentType.Addendum });
        context.$router.push(routeGenerator(DocumentType.Addendum));
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.memo"),
      async create() {
        await createDocument(context, { documentType: DocumentType.Memo });
        context.$router.push(routeGenerator(DocumentType.Memo));
      }
    },
    {
      icon: "plus",
      text: context.$t("translations.headers.powerOfAttorney"),
      async create() {
        await createDocument(context, {
          documentType: DocumentType.PowerOfAttorney
        });
        context.$router.push(routeGenerator(DocumentType.PowerOfAttorney));
      }
    }
  ];
}
