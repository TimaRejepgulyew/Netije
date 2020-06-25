import DocumentType from "~/infrastructure/constants/documentType.js";
import TaskType from "~/infrastructure/constants/taskType.js";
import documentChangeTracker from "~/infrastructure/services/documentChangeTracker.js";
import financialArchiveIcon from "~/static/icons/financial-archive.svg";
import contractIcon from "~/static/icons/contract.svg";
import contractStatementIcon from "~/static/icons/contactState.svg";
import incomingInvoiceIcon from "~/static/icons/incomingInvoice.svg";
import incommingTaxInvoiceIcon from "~/static/icons/incommingTaxInvoice.svg";
import outgoingTaxInvoiceIcon from "~/static/icons/outgoingTaxInvoice.svg";
import universaltransferdocumentIcon from "~/static/icons/universaltransferdocument.svg";
import waybillIcon from "~/static/icons/waybill.svg";
import supAgreementIcon from "~/static/icons/supAgreement.svg";
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
    },

    {
      text: context.$t("menu.financialDocument"),
      icon: financialArchiveIcon,
      items: FinancialArchiveButtons(context)
    },
    {
      text: context.$t("menu.contract"),
      icon: contractIcon,
      items: ContractButtons(context)
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

export function ContractButtons(context) {
  return [
    {
      icon: incomingInvoiceIcon,
      text: context.$t("menu.incomingInvoice"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.IncomingInvoice,
          ...params
        });
      }
    },
    {
      icon: contractStatementIcon,
      text: context.$t("menu.сontractStatement"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.ContractStatement,
          ...params
        });
      }
    },
    {
      icon: contractIcon,
      text: context.$t("menu.contract"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Contract,
          ...params
        });
      }
    },
    {
      icon: supAgreementIcon,
      text: context.$t("menu.supAgreement"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.SupAgreement,
          ...params
        });
      }
    }
  ];
}

export function FinancialArchiveButtons(context) {
  return [
    {
      icon: incommingTaxInvoiceIcon,
      text: context.$t("menu.incomingTaxInvoice"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.IncomingTaxInvoice,
          ...params
        });
      }
    },
    {
      icon: outgoingTaxInvoiceIcon,
      text: context.$t("menu.outgoingTaxInvoice"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.OutgoingTaxInvoice,
          ...params
        });
      }
    },
    {
      icon: universaltransferdocumentIcon,
      text: context.$t("menu.universalTransferDocument"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.UniversalTransferDocument,
          ...params
        });
      }
    },
    {
      icon: waybillIcon,
      text: context.$t("menu.waybill"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Waybill,
          ...params
        });
      }
    }
  ];
}
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
