import AssignmentQuery from "~/infrastructure/constants/assignmentQuery";
import DocumentVersionService from "~/infrastructure/services/documentVersionService";
import AssignmentStatus from "~/infrastructure/models/AssignmentStatus.js";
import dataApi from "~/static/dataApi";
const GetColumnsByAssignmentQuery = (type, context) => {
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
    case DocumentQuery.ContractualDocuments:
      return CreateContractColumns(context);
    case DocumentQuery.AccountingDocuments:
      return CreateAccountingDocumentsColumns(context);

    default:
      return [];
  }
};
export default {
  CreateColumns: (type, context) => {
    const columns = [GetDefaultColumn()];
    const typedColumns = GetColumnsByAssignmentQuery(type, context);
    const buttons = CreateButtons(context);
    var resultColumns = columns.concat(typedColumns);
    resultColumns.push(buttons);
    return resultColumns;
  }
};
const CreateButtons = context => {
  return {
    type: "buttons",
    buttons: [
    ]
  };
};
const CreateBaseColumns = context => {
  return [
    CreateSubjectColumn(context),
    CreateDeadlineColumn(context),
    CreateAssignmentCreatedColumn(context),
    CreateAuthorColumn(context),
    CreateStatuscolumn(context),
    CreateAssignmentImportanceColumn(context),
  ];
};
const CreateAllAssignmentColumns = context => {
  return [
    ...CreateBaseColumns(context),
  ];
};
const CreateOnExecutionAssignmentColumns = context => {
  return [
    ...CreateBaseColumns(context),
  ];
};
const CreateOnReviewAssignmentColumns = context => {
  return [
    ...CreateBaseColumns(context),
  ];
};
const CreateOnAcquintanceAssignmentColumns = context => {
  return [
    ...CreateBaseColumns(context),
  ];
};
const CreateOnDocumentReviewAssignmentColumns = context => {
  return [
    ...CreateBaseColumns(context),
  ];
};
const CreateReviewResolutionAssignmentColumns = context => {
  return [
    ...CreateBaseColumns(context),
  ];
};

function CreateDeadlineColumn(context) {
  return {
    dataField: "deadline",
    caption: context.$t("assignment.fields.deadline"),
    width: "auto",
    visible: true,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  }
}
function CreateAssignmentCreatedColumn(context) {
  return {
    dataField: "created",
    sortOrder: "desc",
    caption: context.$t("assignment.fields.created"),
    width: "auto",
    visible: false,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
}
function CreateAuthorColumn(context,) {
  return CreateLookupColumn(
    "authorId",
    context,
    dataApi.company.Employee,
    true
  );
}
function CreateStatuscolumn(context) {
  return CreateLookupColumn(
    "status",
    context,
    Object.values(new AssignmentStatus(this).getAll()),
    true
  );
}

function CreateAssignmentTypeIconColumn(context) {
  return { ...GetDefaultColumnTypeIconSetting(context), dataField: "assignmentType", cellTemplate: "assignnmentTypeIconColumn", width: 60 }
}

function CreateAssignmentImportanceColumn(context) {
  return { ...GetDefaultColumnTypeIconSetting(context), dataField: "importance", cellTemplate: "importanceIconColumn", width: 40 }
}

function CreateSubjectColumn(context) {
  return {
    dataField: "subject",
    calculateCellValue: generateSubjectText,
    caption: context.$t('assignment.fields.subject')
  }
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
    caption: context.$t(`assignment.fields.${caption || dataField}`),
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
function CreateArrayLookupColumn(
  dataField,
  context,
  items,
  visible = false,
  displayExpr = "name"
) {
  return {
    dataField: dataField,
    caption: context.$t(`assignment.fields.${dataField}`),
    visible,
    lookup: {
      dataSource: items,
      valueExpr: "id",
      displayExpr: displayExpr
    }
  };
}
const GetDefaultColumnTypeIconSetting = () => {
  return {
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
    visible: true
  };
};
