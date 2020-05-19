import DocumentFilterType from "~/infrastructure/constants/documentFilterType";
import DocumentService from "~/infrastructure/services/documentService";
import dataApi from "~/static/dataApi";

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
    case DocumentFilterType.All:
      return CreateElectronicDocumentColumns(context);
    case DocumentFilterType.IncomingLetter:
      return CreateIncomingLetterColumns(context);
    case DocumentFilterType.OutgoingLetter:
      return CreateOutgoingLetterColumns(context);
    case DocumentFilterType.InternalDocument:
      return CreateInternalDocumentColumns(context);
    case DocumentFilterType.Addendum:
      return CreateAddendumColumns(context);
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
        icon: "search",
        text: context.$t("translations.fields.preview"),
        onClick: e => previewDocument(e, context)
      },
      {
        visible: hasVersion,
        icon: "download",
        text: context.$t("translations.fields.download"),
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
  DocumentService.downloadDocument(
    {
      ...e.row.data,
      extension: e.row.data.extension
    },
    context
  );
};
const previewDocument = (e, context) => {
  DocumentService.previewDocument(e.row.data, context);
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
    CreateDeliveryMethodColumn(context),
    CreateAddresseEmployee(context),
    CreateInNumberColumn(context),
    CreateInResponseToIdColumn(context),
    CreateIndexColumn(context),
    CreateCounterpartySignatoryColumn(context)
  ];
};
const CreateInternalDocumentColumns = context => {
  return [...CreateBaseColumn(context)];
};
const CreateAddendumColumns = context => {
  return [...CreateBaseColumn(context)];
};

const CreateOutgoingLetterColumns = context => {
  return [
    ...CreateBaseColumn(context),
    CreateIncomingDocumentCorrespondentColumn(context),
    CreateDeliveryMethodColumn(context),
    CreateAddresseConterPartColumn(context),
    CreateInResponseToIdColumn(context),
    CreateContactColumn(context),
    CreateOurSignatoryColumn(context)
  ];
};

const GetDefaultColumn = () => {
  return {
    dataField: "associatedApplication",
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

const CreateColumn = ({ width = 60 } = {}) => {
  return {
    dataField: "associatedApplication",
    caption: "",
    allowFiltering: false,
    width: width,
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

function CreateDocumentCreatedColumn(context) {
  return {
    dataField: "created",
    caption: context.$t("document.fields.created"),
    width: "auto",
    visible: true,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
}

function CreateDocumentModifiedColumn(context) {
  return {
    dataField: "modified",
    caption: context.$t("document.fields.modified"),
    width: "auto",
    visible: false,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
}

function CreateDocumentAuthorColumn(context, visible = false) {
  return CreateLookupColumn(
    "authorId",
    context,
    dataApi.company.Employee,
    visible
  );
}
function CreateInNumberColumn(context) {
  return {
    dataField: "inNumber",
    caption: context.$t("document.fields.regNumberDocument"),
    visible: false
  };
}
function CreateIndexColumn(context) {
  return {
    dataField: "index",
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
  return CreateLookupColumn(
    "documentKindId",
    context,
    dataApi.docFlow.DocumentKind,
    true
  );
}

function CreateDocumentRegistryColumn(context) {
  return CreateLookupColumn(
    "documentRegisterId",
    context,
    dataApi.docFlow.DocumentRegistry,
    true
  );
}

function CreateDocumentRegistrationStateColumn(context) {
  const registrationState = context.$store.getters[
    "paper-work/registrationState"
  ](context);
  return CreateArrayLookupColumn(
    "registrationState",
    context,
    registrationState
  );
}

function CreateIncomingDocumentCorrespondentColumn(context) {
  return CreateLookupColumn(
    "correspondentId",
    context,
    dataApi.contragents.CounterPart,
    true
  );
}
function CreateInResponseToIdColumn(context) {
  return CreateLookupColumn(
    "inResponseToId",
    context,
    dataApi.docFlow.Documents
  );
}
function CreateDeliveryMethodColumn(context) {
  return CreateLookupColumn(
    "deliveryMethodId",
    context,
    dataApi.docFlow.MailDeliveryMethod
  );
}
function CreateAddresseConterPartColumn(context) {
  return CreateLookupColumn(
    "addresseeId",
    context,
    dataApi.contragents.CounterPart,
    false
  );
}

function CreateBusinessUnitColumn(context) {
  return CreateLookupColumn(
    "businessUnitId",
    context,
    dataApi.company.BusinessUnit,
    false
  );
}

function CreateDepartmentColumn(context) {
  return CreateLookupColumn(
    "departmentId",
    context,
    dataApi.company.Department,
    false
  );
}
function CreateDocumentTypeGuidColumn(context, visible = false) {
  return CreateLookupColumn(
    "documentTypeGuid",
    context,
    dataApi.docFlow.DocumentType,
    visible
  );
}
function CreateCounterpartySignatoryColumn(context, visible = false) {
  return CreateLookupColumn(
    "counterpartySignatoryId",
    context,
    dataApi.contragents.Contact,
    visible
  );
}
function CreateOurSignatoryColumn(context, visible = false) {
  return CreateLookupColumn(
    "ourSignatoryId",
    context,
    dataApi.company.Employee,
    visible
  );
}
function CreateCaseFileColumn(context, visible = false) {
  return CreateLookupColumn(
    "caseFileId",
    context,
    dataApi.docFlow.CaseFile,
    visible,
    "title"
  );
}

function CreateContactColumn(context, visible = false) {
  return CreateLookupColumn(
    "contactId",
    context,
    dataApi.contragents.Contact,
    visible
  );
}

function CreateAddresseEmployee(context) {
  return CreateLookupColumn("addresseeId", context, dataApi.company.Employee);
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
    CreateDocumentAuthorColumn(context),
    CreateDocumentRegistrationStateColumn(context),
    CreateDocumentRegistryColumn(context),
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
  displayExpr = "name"
) {
  return {
    dataField: dataField,
    caption: context.$t(`document.fields.${dataField}`),
    visible,
    lookup: {
      dataSource: {
        store: context.$dxStore({
          key: "id",
          loadUrl: api
        }),
        paginate: true
      },
      valueExpr: "id",
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
