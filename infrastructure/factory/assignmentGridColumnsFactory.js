import AssignmentQuery from "~/infrastructure/constants/query/assignmentQuery.js";
import AssignmentStatus from "~/infrastructure/models/AssignmentStatus.js";
import AssignmentStatusGuid from "~/infrastructure/constants/assignmentStatus.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import AssignmentResult from "~/infrastructure/constants/assignmentResult.js";
import dataApi from "~/static/dataApi";
import { sendResult } from "~/infrastructure/services/assignmentService.js";
import { ForExecution as forExecutionIcon } from "~/static/icons/status/assignmentResult.js";
import { confirm } from "devextreme/ui/dialog";
const GetColumnsByAssignmentQuery = (type, context) => {
  switch (type) {
    case AssignmentQuery.All:
      return CreateAllAssignmentColumns(context);
    case AssignmentQuery.OnExicution:
      return CreateOnExecutionAssignmentColumns(context);
    case AssignmentQuery.OnReview:
      return CreateOnReviewAssignmentColumns(context);
    case AssignmentQuery.OnAcquaintance:
      return CreateOnAcquintanceAssignmentColumns(context);
    case AssignmentQuery.OnDocumentReview:
      return CreateOnDocumentReviewAssignmentColumns(context);
    case AssignmentQuery.ReviewResolution:
      return CreateReviewResolutionAssignmentColumns(context);
    default:
      return [];
  }
};
export default {
  CreateColumns: (type, context) => {
    const defaultColumns = [];
    const typedColumns = GetColumnsByAssignmentQuery(type, context);
    const buttons = CreateButtons(context);
    const resultColumns = [...typedColumns, buttons];
    return resultColumns;
  }
};
const CreateButtons = context => {
  return {
    type: "buttons",

    buttons: [
      {
        cssClass: "forExecutionBtn",
        visible: isReviewDraftResolution,
        icon: forExecutionIcon,
        text: context.$t("document.preview"),
        onClick: e => addResolution(e.row.data, context)
      }
    ]
  };
};

const isReviewDraftResolution = e => {
  return (
    e.row.data.assignmentType ===
      AssignmentType.ReviewDraftResolutionAssignment &&
    e.row.data.status === AssignmentStatusGuid.InProcess
  );
};
// const inProcess = e => {
//   return e.row.data.status === AssignmentStatus.InProcess;
// }
const addResolution = async ({ assignmentType, id, body }, context) => {
  const response = await confirm(
    context.$t(
      "assignment.confirmMessage.sureDocumentReviewApproveRosolutionConfirmetion"
    ),
    context.$t("shared.confirm")
  );
  if (response) {
    const assignment = {
      assignmentType,
      id,
      body,
      result: AssignmentResult.ReviewDraftResolution.ForExecution
    };
    console.log(assignment);
    await sendResult(context, assignment);
    console.log(context);
    context.store.reload();
  }
};
const CreateBaseColumns = context => {
  return [
    CreateAssignmentTypeIconColumn(context),
    CreateAssignmentImportanceColumn(context),
    CreateSubjectColumn(context),
    CreateDeadlineColumn(context),
    CreateAssignmentCreatedColumn(context),
    CreateAuthorColumn(context),
    CreateStatusColumn(context)
  ];
};
const CreateAllAssignmentColumns = context => {
  return [...CreateBaseColumns(context)];
};
const CreateOnExecutionAssignmentColumns = context => {
  return [...CreateBaseColumns(context)];
};
const CreateOnReviewAssignmentColumns = context => {
  return [...CreateBaseColumns(context)];
};
const CreateOnAcquintanceAssignmentColumns = context => {
  return [...CreateBaseColumns(context)];
};
const CreateOnDocumentReviewAssignmentColumns = context => {
  return [...CreateBaseColumns(context)];
};
const CreateReviewResolutionAssignmentColumns = context => {
  return [...CreateBaseColumns(context)];
};

function CreateDeadlineColumn(context) {
  return {
    dataField: "deadline",
    caption: context.$t("assignment.fields.deadline"),
    width: "auto",
    visible: true,
    dataType: "date",
    format: "dd.MM.yyyy HH:mm"
  };
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
function CreateAuthorColumn(context) {
  return CreateLookupColumn(
    "authorId",
    context,
    dataApi.company.Employee,
    true
  );
}
function CreateStatusColumn(context) {
  return CreateArrayLookupColumn(
    "status",
    context,
    Object.values(new AssignmentStatus(context).getAll()),
    true,
    "text"
  );
}

function CreateAssignmentTypeIconColumn(context) {
  return {
    ...GetDefaultColumnTypeIconSetting(context),
    dataField: "assignmentType",
    cellTemplate: "assignnmentTypeIconColumn",
    minWidth: 40
  };
}

function CreateAssignmentImportanceColumn(context) {
  return {
    ...GetDefaultColumnTypeIconSetting(context),
    dataField: "importance",
    cellTemplate: "importanceIconColumn",
    width: 40
  };
}

function CreateSubjectColumn(context) {
  return {
    dataField: "subject",
    caption: context.$t("assignment.fields.subject")
  };
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
    dataField,
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
