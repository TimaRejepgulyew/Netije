import DocumentFilterType from "~/infrastructure/constants/documentFilterType";
import dataApi from "~/static/dataApi";
import DocumentService from "~/infrastructure/services/documentService";

export default {
    CreateColumns: (type, context) => {
        const columns = [GetDefaultColumn()];
        const typedColumns = GetColumnsByDocumentType(type, context);
        var resultColumns = columns.concat(typedColumns);
        return resultColumns;
    },
}

const GetColumnsByDocumentType = (type, context) => {
    switch (type) {
        case DocumentFilterType.All: return CreateElectronicDocumentColumns(context);
        case DocumentFilterType.IncomingDocument: return CreateIncomingDocumentColumns(context);
        case DocumentFilterType.OutgoingDocument: return CreateOutgoingDocumentColumns(context);
        default: return [];
    }
}

const CreateElectronicDocumentColumns = (context) => {
    return [
        CreateDocumentNameColumn(context),
        CreateDocumentCreatedColumn(context),
        CreateDocumentModifiedColumn(context),
        CreateDocumentAuthorColumn(context)
    ]
}

const CreateIncomingDocumentColumns = (context) => {
    return [
        CreateDocumentRegistrationDateColumn(context),
        CreateDocumentRegistrationNumberColumn(context),
        CreateIncomingDocumentCorrespondentColumn(context),
        CreateDocumentAuthorColumn(context),
        CreateDocumentSubjectColumn(context),
        CreateDocumentKindColumn(context),
        CreateDocumentRegistryColumn(context),
        CreateDocumentRegistrationStateColumn(context)
    ]
}

const CreateOutgoingDocumentColumns = (context) => {
    return [
        CreateDocumentRegistrationDateColumn(context),
        CreateDocumentRegistrationNumberColumn(context),
        CreateIncomingDocumentCorrespondentColumn(context),
        CreateDocumentAuthorColumn(context),
        CreateDocumentSubjectColumn(context),
        CreateDocumentKindColumn(context),
        CreateDocumentRegistryColumn(context)
    ]
}

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
    }
}

const CreateColumn = ({ width = 60 } = {}) => {
    return {
        dataField: "associatedApplication",
        caption: "",
        allowFiltering: false,
        width: width,
        cellTemplate: "cellTemplate",
        visible: true
    }
}

function CreateDocumentNameColumn(context) {
    return {
        dataField: "name",
        caption: context.$t("document.fields.name"),
        minWidth: 400,
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
        visible: true,
        dataType: "date",
        format: "dd.MM.yyyy HH:mm"
    };
}

function CreateDocumentAuthorColumn(context) {
    return CreateLookupColumn("authorId", context, dataApi.company.Employee);
}

function CreateDocumentRegistrationDateColumn(context) {
    return {
        dataField: "registrationDate",
        caption: context.$t("document.fields.registrationDate"),
        width: "auto",
        visible: true,
        dataType: "date",
        format: "dd.MM.yyyy HH:mm"
    };
}

function CreateDocumentRegistrationNumberColumn(context) {
    return {
        dataField: "registrationNumber",
        caption: context.$t("document.fields.registrationNumber"),
        minWidth: "auto",
        visible: true
    };
}

function CreateDocumentSubjectColumn(context) {
    return {
        dataField: "subject",
        caption: context.$t("document.fields.subject"),
        minWidth: 120,
        visible: true
    };
}

function CreateDocumentKindColumn(context) {
    return CreateLookupColumn("documentKindId", context, dataApi.docFlow.DocumentKind);
}

function CreateDocumentRegistryColumn(context) {
    return CreateLookupColumn("documentRegisterId", context, dataApi.docFlow.DocumentRegistry);
}

function CreateDocumentRegistrationStateColumn(context) {
    const registrationState = context.$store.getters["paper-work/registrationState"](context)
    return CreateArrayLookupColumn("registrationState", context, registrationState);
}

function CreateIncomingDocumentCorrespondentColumn(context) {
    return CreateLookupColumn("correspondentId", context, dataApi.contragents.CounterPart);
}


function CreateLookupColumn(dataField, context, api, displayExpr = "name") {
    return {
        dataField: dataField,
        caption: context.$t(`document.fields.${dataField}`),
        minWidth: 120,
        visible: true,
        lookup: {
            dataSource:
            {
                store: context.$dxStore({
                    key: "id",
                    loadUrl: api
                }),
                paginate: true,
            },
            valueExpr: "id",
            displayExpr: displayExpr
        }
    };
}

function CreateArrayLookupColumn(dataField, context, items, displayExpr = "name") {
    return {
        dataField: dataField,
        caption: context.$t(`document.fields.${dataField}`),
        minWidth: 120,
        visible: true,
        lookup: {
            dataSource: items,
            valueExpr: "id",
            displayExpr: displayExpr
        }
    };
}