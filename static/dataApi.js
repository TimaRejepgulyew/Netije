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
    DocumentKind: `${url}/api/DocumentKind`,
    DocumentType: `${url}/api/DocumentType`,
    DocumentKind: `${url}/api/DocumentKind`,
    DocumentSendAction: `${url}/api/DocumentSendAction`,
    CaseFile: `${url}/api/CaseFile`,
    FileRetentionPeriod: `${url}/api/FileRetentionPeriod`,
    RegistrationGroup: `${url}/api/RegistrationGroup`,
    ResponsibleForGroupOnMe: `${url}/api/RegistrationGroup/ResponsibleForGroupOnMe`,
    RegistrationGroupMembers: `${url}/api/RegistrationGroupMembers/`,
    MailDeliveryMethod: `${url}/api/MailDeliveryMethod`,
    DocumentRegistry: `${url}/api/DocumentRegistry`,
    RegSettingAvailableBusinessUnits: `${url}/api/RegistrationSetting/AvailableBusinessUnits`,
    RegistrationSetting: `${url}/api/RegistrationSetting`,
    AssociatedApplication: `${url}/api/AssociatedApplication`,
    FilesType: `${url}/api/FilesType`,
    RegSettingAvailableDocumentKinds: `${url}/api/RegistrationSetting/AvailableDocumentKinds`
  },
  documentRegistration: {
    RegisterDocument: `${url}/api/DocumentRegistration/Register`,
    UnregisterDocument: `${url}/api/DocumentRegistration/Unregister`,
    PreliminaryNumber: `${url}/api/DocumentRegistration/PreliminaryNumber`,
    CaseFiles: `${url}/api/DocumentRegistration/CaseFiles`,
    Registries: `${url}/api/DocumentRegistration/Registries/`
  },
  paperWork: {
    Documents: `${url}/api/OfficialDocument/`,
    AllDocument: `${url}/api/OfficialDocument/100`,
    GetDocumentById: `${url}/api/OfficialDocument/GetDocumentById/`,
    DeleteDocument: `${url}/api/OfficialDocument/`,
    Version: `${url}/api/OfficialDocument/Version/`,
    DownloadLastVersion: `${url}/api/OfficialDocument/Version/DownloadLastVersion/`,
    PreviewLastVersion: `${url}/api/OfficialDocument/Version/PreviewLastVersion/`,
    Relation: `${url}/api/Documentrelations/Relations/`,
    CreateVersionFromFile: `${url}/api/OfficialDocument/Version/CreateFromFile/`,
    DownloadVersion: `${url}/api/OfficialDocument/Version/Download/`,
    PreviewVersion: `${url}/api/OfficialDocument/Version/Preview/`
  },

  task: {
    CreateSimpleTask: `${url}/api/Task/CreateSimpleTask`,
    CreateAcquaintanceTask: `${url}/api/Task/CreateAcquaintanceTask`,
    CreateActionItemTask: `${url}/api/Task/CreateActionItemTask`,
    TextsByTask: `${url}/api/WorkflowEntityText/ByTask/`,
    Task: `${url}/api/Task/GetAllTasks`,
    GetTaskById: `${url}/api/Task/GetTaskById/`,
    CreateTask: `${url}/api/Task/`,
  },
  accessRights: {
    ForDocument: `${url}/api/AccessRights/`,
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
  attachment: {
    AttachmentByTask: `${url}/api/Attachment/ByTask/`,
    AttachmentByAssignment: `${url}/api/Attachment/ByAssignment/`,
    Detach: `${url}/api/Attachment/Detach`,
    Attach: `${url}/api/Attachment/Attach`
  }
};
