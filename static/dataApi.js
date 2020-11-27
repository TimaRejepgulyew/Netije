export default {
  UserPhotoHash:
    process.env.NODE_ENV === "production"
      ? document.location.origin + "/StaticFiles/Employees/Thumbnails/"
      : `${process.env.serverUrl}/StaticFiles/Employees/Thumbnails/`,
  Metadata: `/api/Metadata`,
  account: `/Identity/Account/Manage`,
  History: `/api/History/`,
  OidcConfiguration: `/_configuration/${process.env.oidcClientId}`,
  sharedDirectory: {
    Country: `/api/Country`,
    Region: `/api/Region`,
    Locality: `/api/Locality`,
    Currency: `/api/Currency`
  },
  hubs: {
    assignmentHub: `/hubs/assignments`
  },
  contragents: {
    Company: `/api/Companies`,
    Bank: `/api/Bank`,
    Person: `/api/Person`,
    CounterPart: `/api/CounterPart`,
    Contact: `/api/Contact`
  },
  company: {
    Department: `/api/Department`,
    DepartmentMembers: `/api/DepartmentMembers/`,
    BusinessUnit: `/api/BusinessUnit`,
    Employee: `/api/Employee`,
    ChangeEmployeePassword: `/api/Employee/ChangePassword`,
    JobTitle: `/api/JobTitle`,
    ManagersAssistant: `/api/ManagersAssistant`
  },
  admin: {
    Roles: `/api/Role`,
    RoleMembers: `/api/RoleMembers/`
  },
  docFlow: {
    DocumentRegister: {
      Value: `/api/DocumentRegister`,
      All: `/api/DocumentRegister`,
      СustomizableDocumentRegisters: `/api/DocumentRegister/СustomizableDocumentRegisters`,
      PreliminaryNumber: `/api/DocumentRegister/PreliminaryNumber`,
      DefaultDocumentRegister: `/api/DocumentRegister/SuitableDefaultDocumentRegister/`,
      RegistrableDocumentRegisteres: `/api/DocumentRegister/SuitableRegistrableDocumentRegisters/`
    },
    CaseFile: {
      Value: `/api/CaseFile`,
      All: `/api/CaseFile`,
      AvailableForUse: `/api/CaseFile/AvailableForUse`
    },
    ContractCategories: `/api/ContractCategory`,
    PersonalSettings: `/api/PersonalSettings`,
    DocumentKind: `/api/DocumentKind`,
    DocumentType: `/api/DocumentType`,
    DocumentSendAction: `/api/DocumentSendAction`,
    FileRetentionPeriod: `/api/FileRetentionPeriod`,
    RegistrationGroup: `/api/RegistrationGroup`,
    ResponsibleForGroupOnMe: `/api/RegistrationGroup/ResponsibleOnMe`,
    RegistrationGroupMembers: `/api/RegistrationGroupMembers/`,
    DeliveryMethod: `/api/DeliveryMethod`,
    RegistrationSetting: `/api/RegistrationSetting`,
    AssociatedApplication: `/api/AssociatedApplication`,
    FilesType: `/api/FilesType`
  },
  documentRegistration: {
    RegisterDocument: `/api/OfficialDocument/Register`,
    UnregisterDocument: `/api/OfficialDocument/Unregister`,
    CaseFiles: `/api/DocumentRegistration/CaseFiles`,
    Registries: `/api/DocumentRegistration/Registries/`
  },
  documentModule: {
    Documents: `/api/OfficialDocument/`,
    AllDocument: `/api/OfficialDocument/100`,
    GetDocumentById: `/api/OfficialDocument/`,
    DeleteDocument: `/api/OfficialDocument/`,
    ReevaluateDocumentName: `/api/OfficialDocument/ReevaluateDocumentName`,
    Version: `/api/OfficialDocument/Version/`,
    DownloadLastVersion: `/api/OfficialDocument/Version/DownloadLastVersion/`,
    PreviewLastVersion: `/api/OfficialDocument/Version/PreviewLastVersion/`,
    Relation: `/api/Documentrelations/Relations/`,
    CreateVersionFromFile: `/api/OfficialDocument/Version/CreateFromFile/`,
    DownloadVersion: `/api/OfficialDocument/Version/Download/`,
    PreviewVersion: `/api/OfficialDocument/Version/Preview/`,
    RemoveVersion: `/api/OfficialDocument/Version/`,
    Last: `/api/OfficialDocument/Version/Last/`
  },

  task: {
    GetTasksByDocument: `/api/Task/GetTasksByDocument/`,
    GrantPermissions: `/api/Task/GrantPermissions`,
    CheckMembersPermissions: `/api/Task/CheckMembersPermissions/`,
    actionItemExecution: {
      GetAvailableProducers: `/api/Task/ActionItemExecution/GetAvailableProducers/`
    },
    ReevaluateTaskName: `/api/Task/ComputeTaskSubject`,
    TextsByTask: `/api/WorkflowEntityText/ByTask/`,
    Task: `/api/Task/GetAllTasks/`,
    GetTaskById: `/api/Task/`,
    Delete: `/api/Task/`,
    UpdateTask: `/api/Task/`,
    CreateTask: `/api/Task/Create`,
    СreateTaskByDocument: `/api/Task/CreateTaskByDocument`,
    CreateChildActionItemExecution: `/api/Task/CreateChildActionItemExecutionTask`,
    CreateDraftResolutionActionItemExecutionTask: `/api/Task/CreateDraftResolutionActionItemExecutionTask`,

    Abort: `/api/Task/Abort`,
    Start: `/api/Task/Start`,
    Restart: `/api/Task/Restart`,
    Remove: `/api/Task/RemoveAttachment`
  },
  accessRights: {
    List: `/api/AccessRights/`,
    AddRecipient: `/api/AccessRights`,
    UpdateRecipient: `/api/AccessRights/`,
    RemoveRecipient: `/api/AccessRights/`
  },
  assignment: {
    GrantPermissions: `/api/Assignment/GrantPermissions`,
    CheckMembersPermissions: `/api/Assignment/CheckMembersPermissions/`,
    HasChildActionItemItems: `/api/Assignment/HasChildActionItemItems/`,
    Assignments: `/api/Assignment/`,
    GetAssignmentById: `/api/Assignment/GetAssignmentById/`,
    CompleteAssignment: `/api/Assignment/CompleteAssignment`,
    MarkAsRead: `/api/Assignment/MarkAsRead`,
    TextsByAssignment: `/api/WorkflowEntityText/ByAssignment/`,
    CompleteDraftResolutionAssignments: `/api/Assignment/CompleteDraftResolutionsAssignments`,
    AddApprover: `/api/Assignment/AddApprover`
  },
  recipient: {
    list: `/api/Recipient`
  },
  signatureSettings: {
    Members: `/api/SignatureSettings/Members`
  },
  attachment: {
    Detach: `/api/Attachment/Detach`,
    PasteByTask: `/api/Attachment/Task/Paste`,
    PasteByAssignment: `/api/Attachment/Assignment/Paste`
  },
  import: {
    companies: `/api/Import/Companies`,
    banks: `​/api/Import/Banks`,
    jobTitles: `​/api/Import/JobTitles`,
    persons: `​/api/Import/Persons`,
    employees: `/api/Import/Employees`
  },
  fileEditors: {
    PdfViewer: process.env.NODE_ENV === "production" ? "/api/pdfViewer" : `${process.env.serverUrl}/api/pdfViewer`,
  }
};
