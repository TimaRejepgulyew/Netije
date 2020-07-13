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
import simpleTaskIcon from "~/static/icons/simpleTask.svg";
import acquintanceTaskIcon from "~/static/icons/acquintanceTask.svg";
import actionItemExecution from "~/static/icons/actionItemExecution.svg";
import documentReview from "~/static/icons/documentReview.svg";
import * as documentTypeIcon from "~/static/icons/document-type/index.js";
export default function(context) {
  return [
    {
      text: context.$t("createItemDialog.recordManagementGroup"),
      icon: "file",
      items: DocumentButtons(context)
    },
    {
      text: context.$t("createItemDialog.taskGroup"),
      icon: "selectall",
      items: TaskButtons(context)
    },

    {
      text: context.$t("createItemDialog.accountingDocumentsGroup"),
      icon: financialArchiveIcon,
      items: FinancialArchiveButtons(context),
      visible:
        context.$store.getters["permissions/isResponsibleFinansicalArchive"]
    },
    {
      text: context.$t("createItemDialog.contractualDocumentsGroup"),
      icon: contractIcon,
      items: ContractButtons(context),
      visible: context.$store.getters["permissions/isResponsibleForContracts"]
    }
  ];
}
export const createTaskRequest = async function(context, params) {
  const guid = +new Date();
  await context.$store.dispatch("currentTask/initTask", { ...params, guid });
  const taskId = context.$store.getters["currentTask/taskIdByGuid"](guid);
  context.$store.commit("currentTask/DROP_GUID",{ key: guid });
  const replaceOldRoute = context.$store.getters["currentTask/isNew"](taskId);

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
      icon: simpleTaskIcon,
      text: context.$t("createItemDialog.simpleTask"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.SimpleTask,
          ...params
        });
      }
    },
    {
      icon: acquintanceTaskIcon,
      text: context.$t("createItemDialog.acquaintanceTask"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.AcquaintanceTask,
          ...params
        });
      }
    },
    {
      icon: actionItemExecution,
      text: context.$t("createItemDialog.actionItemExecutionTask"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.ActionItemExecutionTask,
          ...params
        });
      }
    },
    {
      icon: documentReview,
      text: context.$t("createItemDialog.documentReviewTask"),
      async create(params) {
        await createTaskRequest(context, {
          taskType: TaskType.DocumentReviewTask,
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
      text: context.$t("createItemDialog.incomingInvoice"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.IncomingInvoice,
          ...params
        });
      }
    },
    {
      icon: contractStatementIcon,
      text: context.$t("createItemDialog.сontractStatement"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.ContractStatement,
          ...params
        });
      }
    },
    {
      icon: contractIcon,
      text: context.$t("createItemDialog.contract"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Contract,
          ...params
        });
      }
    },
    {
      icon: supAgreementIcon,
      text: context.$t("createItemDialog.supAgreement"),
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
      text: context.$t("createItemDialog.incomingTaxInvoice"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.IncomingTaxInvoice,
          ...params
        });
      }
    },
    {
      icon: outgoingTaxInvoiceIcon,
      text: context.$t("createItemDialog.outgoingTaxInvoice"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.OutgoingTaxInvoice,
          ...params
        });
      }
    },
    {
      icon: universaltransferdocumentIcon,
      text: context.$t("createItemDialog.universalTransferDocument"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.UniversalTransferDocument,
          ...params
        });
      }
    },
    {
      icon: waybillIcon,
      text: context.$t("createItemDialog.waybill"),
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
      icon: documentTypeIcon.incomingLetterIcon,
      text: context.$t("createItemDialog.incomingLetter"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.IncomingLetter,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.outgoingLetterIcon,
      text: context.$t("createItemDialog.outgoingLetter"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.OutgoingLetter,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.orderIcon,
      text: context.$t("createItemDialog.order"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Order,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.companyDirectiveIcon,
      text: context.$t("createItemDialog.companyDirective"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.CompanyDirective,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.simpleDocumentIcon,
      text: context.$t("createItemDialog.simpleDocument"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.SimpleDocument,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.addendumIcon,
      text: context.$t("createItemDialog.addendum"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Addendum,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.memoIcon,
      text: context.$t("createItemDialog.memo"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.Memo,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.powerOfAttorneyIcon,
      text: context.$t("createItemDialog.powerOfAttorney"),
      async create(params) {
        await createDocumentRequest(context, {
          documentType: DocumentType.PowerOfAttorney,
          ...params
        });
      }
    }
  ];
}
