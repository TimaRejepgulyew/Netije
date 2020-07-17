export const url = process.env.baseUrl;
export default {
  Metadata: `${url}/api/Metadata`,
  account: `${url}/Identity/Account/Manage`,
  History: `${url}/api/History/`,
  sharedDirectory: {
    Country: `${url}/api/Country`,
    Region: `${url}/api/Region`,
    Locality: `${url}/api/Locality`,
    Currency: `${url}/api/Currency`
  },
  contragents: {
    Company: `${url}/api/Companies`,
    Bank: `${url}/api/Bank`,
    Person: `${url}/api/Person`,
    CounterPart: `${url}/api/CounterPart`,
    Contact: `${url}/api/Contact`
  },
  company: {
    Department: `${url}/api/Department`,
    DepartmentMembers: `${url}/api/DepartmentMembers/`,
    BusinessUnit: `${url}/api/BusinessUnit`,
    Employee: `${url}/api/Employee`,
    ChangeEmployeePassword: `${url}/api/Employee/ChangePassword`,
    JobTitle: `${url}/api/JobTitle`,
    ManagersAssistant: `${url}/api/ManagersAssistant`
  },
  admin: {
    Roles: `${url}/api/Role`,
    RoleMembers: `${url}/api/RoleMembers/`
  },
  docFlow: {
    DocumentRegister: {
      Value: `${url}/api/DocumentRegister`,
      All: `${url}/api/DocumentRegister`,
      AvailableForUse: `${url}/api/DocumentRegister/AvailableForUse`,
      AvailableForRegistrationSetttings: `${url}/api/DocumentRegister/AvailableForRegistrationSetttings`,
      PreliminaryNumber: `${url}/api/DocumentRegister/PreliminaryNumber`,
      FilterByDocumentParams: `${url}/api/DocumentRegister/FilterByDocumentParams`,
    },
    CaseFile: {
      Value: `${url}/api/CaseFile`,
      All: `${url}/api/CaseFile`,
      AvailableForUse: `${url}/api/CaseFile/AvailableForUse`,
    },
    ContractCategories: `${url}/api/ContractCategory`,
    PersonalSettings: `${url}/api/PersonalSettings`,
    DocumentKind: `${url}/api/DocumentKind`,
    DocumentType: `${url}/api/DocumentType`,
    DocumentSendAction: `${url}/api/DocumentSendAction`,
    FileRetentionPeriod: `${url}/api/FileRetentionPeriod`,
    RegistrationGroup: `${url}/api/RegistrationGroup`,
    ResponsibleForGroupOnMe: `${url}/api/RegistrationGroup/ResponsibleForGroupOnMe`,
    RegistrationGroupMembers: `${url}/api/RegistrationGroupMembers/`,
    MailDeliveryMethod: `${url}/api/MailDeliveryMethod`,
    RegistrationSetting: `${url}/api/RegistrationSetting`,
    AssociatedApplication: `${url}/api/AssociatedApplication`,
    FilesType: `${url}/api/FilesType`
  },
  documentRegistration: {
    RegisterDocument: `${url}/api/OfficialDocument/Register`,
    UnregisterDocument: `${url}/api/OfficialDocument/Unregister`,
    CaseFiles: `${url}/api/DocumentRegistration/CaseFiles`,
    Registries: `${url}/api/DocumentRegistration/Registries/`
  },
  paperWork: {
    Documents: `${url}/api/OfficialDocument/`,
    AllDocument: `${url}/api/OfficialDocument/100`,
    GetDocumentById: `${url}/api/OfficialDocument/GetDocumentById/`,
    DeleteDocument: `${url}/api/OfficialDocument/`,
    ReevaluateDocumentName: `${url}/api/OfficialDocument/ReevaluateDocumentName`,
    Version: `${url}/api/OfficialDocument/Version/`,
    DownloadLastVersion: `${url}/api/OfficialDocument/Version/DownloadLastVersion/`,
    PreviewLastVersion: `${url}/api/OfficialDocument/Version/PreviewLastVersion/`,
    Relation: `${url}/api/Documentrelations/Relations/`,
    CreateVersionFromFile: `${url}/api/OfficialDocument/Version/CreateFromFile/`,
    DownloadVersion: `${url}/api/OfficialDocument/Version/Download/`,
    PreviewVersion: `${url}/api/OfficialDocument/Version/Preview/`
  },

  task: {
    TextsByTask: `${url}/api/WorkflowEntityText/ByTask/`,
    Task: `${url}/api/Task/GetAllTasks`,
    GetTaskById: `${url}/api/Task/`,
    Delete: `${url}/api/Task/`,
    UpdateTask: `${url}/api/Task/`,
    CreateTask: `${url}/api/Task`,
    Abort: `${url}/api/Task/Abort`,
    Start: `${url}/api/Task/Start`,
    Restart: `${url}/api/Task/`,
    Remove: `${url}/api/Task/RemoveAttachment`
  },
  accessRights: {
    List: `${url}/api/AccessRights/`,
    AddRecipient: `${url}/api/AccessRights`,
    UpdateRecipient: `${url}/api/AccessRights/`,
    RemoveRecipient: `${url}/api/AccessRights/`
  },
  assignment: {
    Assignments: `${url}/api/Assignment/`,
    GetAssignmentById: `${url}/api/Assignment/GetAssignmentById/`,
    CompleteAssignment: `${url}/api/Assignment/CompleteAssignment`,
    MarkAsRead: `${url}/api/Assignment/MarkAsRead`,
    TextsByAssignment: `${url}/api/WorkflowEntityText/ByAssignment/`
  },
  recipient: {
    list: `${url}/api/Recipient`
  },
  signatureSettings: {
    Members: `${url}/api/SignatureSettings/Members`
  },
  attachment: {
    Detach: `${url}/api/Attachment/Detach`,
    PasteByTask: `${url}/api/Attachment/Task/Paste`,
    PasteByAssignment: `${url}/api/Attachment/Assignment/Paste`
  }
};
