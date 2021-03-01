import DataSource from "devextreme/data/data_source";
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import DocumentVersionService from "~/infrastructure/services/documentVersionService";
import DocumentVersionViewer from "~/infrastructure/services/documentVersionViewer.js";
import { ExecutionStateStore } from "~/infrastructure/constants/executionState.js";
import dataApi from "~/static/dataApi";
import { RegistrationStateStore } from "~/infrastructure/constants/documentRegistrationState.js";
import { baseStatusModel as documentTemplateStatus } from "~/infrastructure/constants/status.js";
export default {
  CreateColumns: (type, context) => {
    const columns = [GetDefaultColumn()];
    const typedColumns = GetColumnsByDocumentType(type, context);
    const buttons = CreateButtons(context);
    var resultColumns = columns.concat(typedColumns);
    resultColumns.push(buttons);
    return resultColumns;
  }
};

const GetColumnsByDocumentType = (type, context) => {
  switch (type) {
    case DocumentQuery.All:
      return CreateElectronicDocumentColumns(context);
    case DocumentQuery.IncomingLetter:
      return CreateIncomingLetterColumns(context);
    case DocumentQuery.OutgoingLetter:
      return CreateOutgoingLetterColumns(context);
    case DocumentQuery.InternalDocument:
      return CreateInternalDocumentColumns(context);
    case DocumentQuery.Addendum:
      return CreateAddendumColumns(context);
    case DocumentQuery.Order:
      return CreateOrderColumns(context);
    case DocumentQuery.CompanyDirective:
      return CreateCompanyDirectiveColumns(context);
    case DocumentQuery.SimpleDocument:
      return CreateSimpleDocumentColumns(context);
    case DocumentQuery.Memo:
      return CreateMemoColumns(context);
    case DocumentQuery.PowerOfAttorney:
      return CreatePowerOfAttorneyColumns(context);
    case DocumentQuery.Contract:
    case DocumentQuery.ContractualDocuments:
      return CreateContractColumns(context);
    case DocumentQuery.IncomingTaxInvoice:
      return CreateAccountingDocumentsColumns(context);
    case DocumentQuery.OutgoingTaxInvoice:
      return CreateAccountingDocumentsColumns(context);
    case DocumentQuery.AccountingDocuments:
      return CreateAccountingDocumentsColumns(context);
    case DocumentQuery.DynamicDocument:
      return CreateDynamicDocumentsColumns(context);

    case "document-template":
      return createDocumentTemplateColumns(context);
    default:
      return [];
  }
};

const CreateButtons = context => {
  return {
    type: "buttons",
    buttons: [
      {
        visible: canBeOpenWithPreview,
        icon: "pdffile",
        text: context.$t("document.preview"),
        onClick: e => previewDocument(e, context)
      },
      {
        visible: hasVersion,
        icon: "download",
        text: context.$t("document.download"),
        onClick: e => downloadDocument(e, context)
      }
    ]
  };
};

const canBeOpenWithPreview = e => {
  if (e.row.data.extension) {
    return e.row.data.canBeOpenedWithPreview;
  } else {
    false;
  }
};
const hasVersion = e => {
  return e.row.data.hasVersions;
};
const downloadDocument = (e, context) => {
  DocumentVersionService.downloadLastVersion(context, {
    ...e.row.data
  });
};
const previewDocument = (e, context) => {
  DocumentVersionViewer({
    context,
    options: {
      readOnly: true,
      extension: e.row.data.extension,
      params: { documentId: e.row.data.id }
    },
    lastVersion: true
  });
};

const CreateElectronicDocumentColumns = context => {
  return [
    CreateDocumentNameColumn(context),
    CreateDocumentCreatedColumn(context),
    CreateDocumentModifiedColumn(context),
    CreateDocumentAuthorColumn(context, true),
    CreateDocumentTypeGuidColumn(context, true)
  ];
};

const CreateIncomingLetterColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreateIncomingDocumentCorrespondentColumn(context),
    CreateAddresseColumn(context),
    CreateInNumberColumn(context),
    CreateDatedColumn(context),
    CreateOrderColumn(context),
    CreateCounterpartySignatoryColumn(context)
  ];
};
const CreateInternalDocumentColumns = context => {
  return [...CreateBaseColumn(context)];
};
const CreateAddendumColumns = context => {
  return [
    ...CreateBaseColumn(context)
    //  CreateLeadingDocumentIdColumn(context)
  ];
};
const CreateOrderColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreatePreparedColumn(context),
    CreateAssigneeIdColumn(context, true),
    CreateOurSignatoryColumn(context)
  ];
};
const CreateCompanyDirectiveColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreatePreparedColumn(context),
    CreateAssigneeIdColumn(context, true),
    CreateOurSignatoryColumn(context)
  ];
};
const CreateMemoColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreatePreparedColumn(context),
    CreateAssigneeIdColumn(context),
    CreateOurSignatoryColumn(context),
    CreateAddresseColumn(context, true)
  ];
};
const CreatePowerOfAttorneyColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreatePreparedColumn(context),
    CreateOurSignatoryColumn(context),
    CreateValidTillColumn(context),
    CreateIssuedToIdColumn(context)
  ];
};
const CreateSimpleDocumentColumns = context => {
  return [...CreateBaseColumn(context)];
};

const CreateOutgoingLetterColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreateIncomingDocumentCorrespondentColumn(context),
    CreateAddresseConterPartColumn(context),
    CreateOurSignatoryColumn(context),
    CreatePreparedColumn(context)
  ];
};
const CreateContractColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreateOurSignatoryColumn(context),
    CreateValidTillColumn(context),
    CreateValidFromColumn(context),
    CreateCounterpartySignatoryColumn(context),
    // CreateLeadingDocumentIdColumn(context, true, "contract"),
    CreateNumberColumn(context),
    CreateDateColumn(context),
    CreateTotalAmountColumn(context, true),
    CreateCurrencyColumn(context)
  ];
};
const CreateAccountingDocumentsColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreateOurSignatoryColumn(context),
    CreateValidTillColumn(context),
    CreateValidFromColumn(context),
    CreateCounterpartySignatoryColumn(context),
    // CreateLeadingDocumentIdColumn(context, true, "contract"),
    CreateNumberColumn(context),
    CreateDateColumn(context),
    CreateTotalAmountColumn(context, true),
    CreateCurrencyColumn(context)
  ];
};

const createDocumentTemplateColumns = context => {
  return [
    CreateDocumentNameColumn(context),
    CreateDocumentModifiedColumn(context, true),
    CreateDocumentAuthorColumn(context, true),
    CreateDocumentCreatedColumn(context),
    CreateDocumentTemplateStatus(context)
  ];
};

const CreateDynamicDocumentsColumns = context => {
  return [
    CreateDocumentSubjectColumn(context),
    CreateDocumentTypeGuidColumn(context),
    CreateDocumentNameColumn(context),
    CreateDocumentCreatedColumn(context),
    CreateDocumentModifiedColumn(context),
    createExecutionStateColumn(context),
    CreateDocumentAuthorColumn(context),
    CreateDocumentRegistrationStateColumn(context),
    CreateDocumentRegisterColumn(context),
    CreateDocumentKindColumn(context),
    CreateDocumentRegistrationNumberColumn(context),
    CreateDocumentRegistrationDateColumn(context),
    CreatePlacedToCaseFileDateColumn(context),
    CreateCaseFileColumn(context)
  ];
};

const GetDefaultColumn = () => {
  return {
    dataField: "extension",
    caption: "",
    allowFiltering: false,
    allowSorting: false,
    allowResizing: false,
    allowReordering: false,
    allowHiding: false,
    allowHeaderFiltering: false,
    allowGrouping: false,
    allowFixing: false,
    allowExporting: false,
    alignment: "center",
    allowSearch: false,
    width: 60,
    cellTemplate: "cellTemplate",
    visible: true
  };
};

function CreateDocumentNameColumn(context) {
  return {
    dataField: "name",
    caption: context.$t("document.fields.name"),
    visible: true
  };
}
function CreateDocumentTemplateStatus(context) {
  return CreateArrayLookupColumn(
    "status",
    context,
    documentTemplateStatus(context),
    true
  );
}
function CreateInNumberColumn(context) {
  return {
    dataField: "inNumber",
    caption: context.$t("document.fields.regNumberDocument"),
    visible: false
  };
}
function CreateDocumentCreatedColumn(context) {
  return {
    dataField: "created",
    sortOrder: "desc",
    caption: context.$t("document.fields.created"),
    width: "auto",
    visible: false,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
}
function CreateDatedColumn(context) {
  return {
    dataField: "dated",
    caption: context.$t("document.fields.dated"),
    dataType: "date",
    format: "dd.MM.yyyy"
  };
}
function CreateDateColumn(context) {
  return {
    dataField: "dated",
    caption: context.$t("document.fields.accountDate"),
    dataType: "date",
    format: "dd.MM.yyyy",
    visible: false
  };
}
function CreateDocumentModifiedColumn(context, visible = false) {
  return {
    dataField: "modified",
    caption: context.$t("document.fields.modified"),
    width: "auto",
    visible: false,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
}
function CreateValidTillColumn(context) {
  return {
    dataField: "validTill",
    caption: context.$t("document.fields.validTill"),
    visible: false,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
}
function CreateValidFromColumn(context) {
  return {
    dataField: "validFrom",
    caption: context.$t("document.fields.validFrom"),
    visible: false,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
}
function CreateDocumentAuthorColumn(context, visible = false) {
  return {
    dataField: "author",
    caption: context.$t("document.fields.authorId"),
    visible: visible
  };
}
function CreateCurrencyColumn(context, visible = false) {
  return CreateCacheLookupColumn(
    "currencyId",
    context,
    dataApi.sharedDirectory.Currency,
    visible,
    "alphaCode"
  );
}

function CreateNumberColumn(context) {
  return {
    dataField: "number",
    dataType: "dxNumberBox",
    caption: context.$t("document.fields.accountNumber"),
    visible: false
  };
}
function CreateTotalAmountColumn(context, visible) {
  return {
    dataField: "totalAmount",
    dataType: "dxNumberBox",
    format: "#,##0.00",
    caption: context.$t("document.fields.totalAmount"),
    visible
  };
}
function CreateOrderColumn(context) {
  return {
    dataField: "order",
    caption: context.$t("document.fields.index"),
    visible: false
  };
}
function CreateDocumentRegistrationDateColumn(context) {
  return {
    dataField: "registrationDate",
    caption: context.$t("document.fields.registrationDate"),
    width: "auto",
    visible: false,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
}
function CreatePlacedToCaseFileDateColumn(context) {
  return {
    dataField: "placedToCaseFileDate",
    caption: context.$t("document.fields.placedToCaseFileDate"),
    visible: false,
    dataType: "date"
  };
}
function CreateDocumentRegistrationNumberColumn(context) {
  return {
    dataField: "registrationNumber",
    caption: context.$t("document.fields.registrationNumber"),
    visible: true
  };
}

function CreateDocumentSubjectColumn(context) {
  return {
    dataField: "subject",
    caption: context.$t("document.fields.subject"),
    visible: false
  };
}

function CreateDocumentKindColumn(context) {
  return CreateCacheLookupColumn(
    "documentKindId",
    context,
    dataApi.docFlow.DocumentKind,
    true
  );
}

function CreateDocumentRegisterColumn(context) {
  return CreateCacheLookupColumn(
    "documentRegisterId",
    context,
    dataApi.docFlow.DocumentRegister.All,
    false
  );
}

function CreateDocumentRegistrationStateColumn(context) {
  return CreateArrayLookupColumn(
    "registrationState",
    context,
    RegistrationStateStore(context)
  );
}

function CreateIncomingDocumentCorrespondentColumn(context) {
  return CreateCacheLookupColumn(
    "correspondentId",
    context,
    dataApi.contragents.CounterPart,
    false
  );
}
//TODO  obsolete
// function CreateInResponseToIdColumn(context) {
//   return CreateLookupColumn(
//     "inResponseToId",
//     context,
//     dataApi.documentModule.AllDocument
//   );
// }
// TODO obsolete
// function CreateDeliveryMethodColumn(context) {
//   return CreateLookupColumn(
//     "deliveryMethodId",
//     context,
//     dataApi.docFlow.DeliveryMethod
//   );
// }
function CreateAddresseConterPartColumn(context) {
  return CreateCacheLookupColumn(
    "addresseeId",
    context,
    dataApi.contragents.CounterPart,
    false
  );
}
function CreateAddresseColumn(context, visible = false) {
  return {
    dataField: "addressee",
    caption: context.$t("document.fields.addresseeId"),
    visible
  };
}
function CreateBusinessUnitColumn(context) {
  return {
    dataField: "businessUnit",
    caption: context.$t("document.fields.businessUnitId"),
    visible: false
  };
}

function CreateDepartmentColumn(context) {
  return {
    dataField: "department",
    caption: context.$t("document.fields.departmentId"),
    visible: false
  };
}
function CreateDocumentTypeGuidColumn(context, visible = false) {
  return CreateCacheLookupColumn(
    "documentTypeGuid",
    context,
    dataApi.docFlow.DocumentType,
    visible,
    "name",
    "documentTypeGuid"
  );
}
function CreateCounterpartySignatoryColumn(context, visible = false) {
  return CreateCacheLookupColumn(
    "counterpartySignatoryId",
    context,
    dataApi.contragents.Contact,
    visible
  );
}
function CreateOurSignatoryColumn(context, visible = false) {
  return {
    dataField: "ourSignatory",
    caption: context.$t("document.fields.ourSignatoryId"),
    visible
  };
}
function CreateCaseFileColumn(context, visible = false) {
  return CreateCacheLookupColumn(
    "caseFileId",
    context,
    dataApi.docFlow.CaseFile.All,
    visible,
    "title"
  );
}

function CreateContactColumn(context, visible = false) {
  return CreateCacheLookupColumn(
    "contactId",
    context,
    dataApi.contragents.Contact,
    visible
  );
}
function CreatePreparedColumn(context, visible = false) {
  return {
    dataField: "preparedBy",
    caption: context.$t("document.fields.preparedById"),
    visible
  };
}
function CreateAssigneeIdColumn(context, visible = false) {
  return {
    dataField: "assignee",
    caption: context.$t("document.fields.assigneeId"),
    visible
  };
}
function CreateIssuedToIdColumn(context, visible = true) {
  return {
    dataField: "issuedTo",
    caption: context.$t("document.fields.issuedToId"),
    visible
  };
}
//TODO obsolete
// function CreateLeadingDocumentIdColumn(context, visible = true, caption) {
//   return CreateLookupColumn(
//     "leadingDocumentId",
//     context,
//     dataApi.documentModule.AllDocument,
//     visible,
//     "name",
//     "id",
//     "contract"
//   );
// }
function createExecutionStateColumn(context) {
  return CreateArrayLookupColumn(
    "executionState",
    context,
    ExecutionStateStore(context),
    true
  );
}
function CreateBaseColumn(context) {
  return [
    CreateDocumentSubjectColumn(context),
    CreateDocumentTypeGuidColumn(context),
    CreateBusinessUnitColumn(context),
    CreateDepartmentColumn(context),
    CreateDocumentNameColumn(context),
    CreateDocumentCreatedColumn(context),
    CreateDocumentModifiedColumn(context),
    createExecutionStateColumn(context),
    CreateDocumentAuthorColumn(context),
    CreateDocumentRegistrationStateColumn(context),
    CreateDocumentRegisterColumn(context),
    CreateDocumentKindColumn(context),
    CreateDocumentRegistrationNumberColumn(context),
    CreateDocumentRegistrationDateColumn(context),
    CreatePlacedToCaseFileDateColumn(context),
    CreateCaseFileColumn(context)
  ];
}
function CreateLookupColumn(
  dataField,
  context,
  api,
  visible = false,
  displayExpr = "name",
  valueExpr = "id",
  caption
) {
  return {
    dataField: dataField,
    caption: context.$t(`document.fields.${caption || dataField}`),
    visible,
    lookup: {
      dataSource: {
        store: context.$dxStore({
          key: "id",
          loadUrl: api
        }),
        paginate: true
      },
      valueExpr,
      displayExpr
    }
  };
}
function CreateCacheLookupColumn(
  dataField,
  context,
  api,
  visible = false,
  displayExpr = "name",
  valueExpr = "id",
  caption
) {
  return {
    dataField: dataField,
    caption: context.$t(`document.fields.${caption || dataField}`),
    visible,
    lookup: {
      dataSource: {
        store: context.$cacheStore(api),
        paginate: true,
        pageSize: 20
      },
      valueExpr,
      displayExpr
    }
  };
}

function CreateArrayLookupColumn(
  dataField,
  context,
  items,
  visible = false,
  displayExpr = "name"
) {
  return {
    dataField: dataField,
    caption: context.$t(`document.fields.${dataField}`),
    visible,
    lookup: {
      dataSource: items,
      valueExpr: "id",
      displayExpr: displayExpr
    }
  };
}
