import DocumentType from "~/infrastructure/constants/documentType.js";
import { taskElements } from "~/infrastructure/constants/taskType.js";
import financialArchiveIcon from "~/static/icons/financial-archive.svg";
import contractIcon from "~/static/icons/contract.svg";
import contractStatementIcon from "~/static/icons/contactState.svg";
import incomingInvoiceIcon from "~/static/icons/incomingInvoice.svg";
import incommingTaxInvoiceIcon from "~/static/icons/incommingTaxInvoice.svg";
import outgoingTaxInvoiceIcon from "~/static/icons/outgoingTaxInvoice.svg";
import universaltransferdocumentIcon from "~/static/icons/universaltransferdocument.svg";
import waybillIcon from "~/static/icons/waybill.svg";
import supAgreementIcon from "~/static/icons/supAgreement.svg";
import * as documentTypeIcon from "~/static/icons/document-type/index.js";
import { createTask } from "~/infrastructure/services/taskService.js";
import { createDocument } from "~/infrastructure/services/documentService.js";
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

class DocumentCreateBtn {
  #documentTypes = [];
  init(documentTypes) {
    this.documentTypes = documentTypes;
    return;
  }
  getAll() {
    return this.documentTypes;
  }
  getPaperWorkDocumentBtn() {
    return this.documentTypes.filter(documentType => documentType.value < 8);
  }

}

export function ContractButtons(context) {
  return [
    {
      icon: incomingInvoiceIcon,
      text: context.$t("createItemDialog.incomingInvoice"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.IncomingInvoice,
          ...params
        });
      }
    },
    {
      icon: contractStatementIcon,
      text: context.$t("createItemDialog.contractStatement"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.ContractStatement,
          ...params
        });
      }
    },
    {
      icon: contractIcon,
      text: context.$t("createItemDialog.contract"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.Contract,
          ...params
        });
      }
    },
    {
      icon: supAgreementIcon,
      text: context.$t("createItemDialog.supAgreement"),
      async create(params) {
        await createDocument(context, {
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
        await createDocument(context, {
          documentType: DocumentType.IncomingTaxInvoice,
          ...params
        });
      }
    },
    {
      icon: outgoingTaxInvoiceIcon,
      text: context.$t("createItemDialog.outgoingTaxInvoice"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.OutgoingTaxInvoice,
          ...params
        });
      }
    },
    {
      icon: universaltransferdocumentIcon,
      text: context.$t("createItemDialog.universalTransferDocument"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.UniversalTransferDocument,
          ...params
        });
      }
    },
    {
      icon: waybillIcon,
      text: context.$t("createItemDialog.waybill"),
      async create(params) {
        await createDocument(context, {
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
        await createDocument(context, {
          documentType: DocumentType.IncomingLetter,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.outgoingLetterIcon,
      text: context.$t("createItemDialog.outgoingLetter"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.OutgoingLetter,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.orderIcon,
      text: context.$t("createItemDialog.order"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.Order,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.companyDirectiveIcon,
      text: context.$t("createItemDialog.companyDirective"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.CompanyDirective,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.simpleDocumentIcon,
      text: context.$t("createItemDialog.simpleDocument"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.SimpleDocument,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.addendumIcon,
      text: context.$t("createItemDialog.addendum"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.Addendum,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.memoIcon,
      text: context.$t("createItemDialog.memo"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.Memo,
          ...params
        });
      }
    },
    {
      icon: documentTypeIcon.powerOfAttorneyIcon,
      text: context.$t("createItemDialog.powerOfAttorney"),
      async create(params) {
        await createDocument(context, {
          documentType: DocumentType.PowerOfAttorney,
          ...params
        });
      }
    }
  ];
}
