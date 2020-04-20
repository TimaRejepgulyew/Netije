export const url = process.env.baseUrl;
export default {
  account: `${url}/Identity/Account/Manage`,
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
    JobTitle: `${url}/api/JobTitle`,
    ManagersAssistant: `${url}/api/ManagersAssistant`
  },
  admin: {
    Roles: `${url}/api/Role`,
    RoleMembers: `${url}/api/RoleMembers/`,
    Recipient: `${url}/api/Recipient`
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
    DocumentRegistry: `${url}/api/DocumentRegistry/`,
    RegSettingAvailableBusinessUnits: `${url}/api/RegistrationSetting/AvailableBusinessUnits`,
    RegistrationSetting: `${url}/api/RegistrationSetting`,
    AssociatedApplication: `${url}/api/AssociatedApplication`,
    FilesType: `${url}/api/FilesType`,
    DocumentRegistration: `${url}/api/DocumentRegistration/RegisterDocument`,
    UnregisterDocument: `${url}/api/DocumentRegistration/UnregisterDocument`,
    PreliminaryNumber: `${url}/api/DocumentRegistration/PreliminaryNumber`,
    RegSettingAvailableDocumentKinds: `${url}/api/RegistrationSetting/AvailableDocumentKinds`
  },
  paperWork: {
    AllDocument: `${url}/api/OfficialDocument/100`,
    GetDocumentById: `${url}/api/OfficialDocument/GetDocumentById/`,
    DeleteDocument: `${url}/api/OfficialDocument`,
    Version: `${url}/api/OfficialDocument/Version/`,
    Relation: `${url}/api/OfficialDocument/Relations/`,
    DocumentVersion: `${url}/api/OfficialDocument/Version/CreateFromFile`,
    DownloadVersion: `${url}/api/OfficialDocument/Version/Download/`,
    PreviewVersion: `${url}/api/OfficialDocument/Version/Preview/`,
    IncommingLetter: `${url}/api/OfficialDocument/1`,
    IncommingLetterPost: `${url}/api/OfficialDocument/CreateIncomingLetter`,
    OutgoingLetter: `${url}/api/OfficialDocument/2`,
    OutgoingLetterPost: `${url}/api/OfficialDocument/CreateOutgoingLetter`,
    Order: `${url}/api/OfficialDocument/3`,
    OrderPost: `${url}/api/OfficialDocument/CreateOrder`,
    CompanyDirective: `${url}/api/OfficialDocument/4`,
    CompanyDirectivePost: `${url}/api/OfficialDocument/CreateCompanyDirective`,
    SimpleDocument: `${url}/api/OfficialDocument/5`,
    SimpleDocumentPost: `${url}/api/OfficialDocument/CreateSimpleDocument`,
    Addendum: `${url}/api/OfficialDocument/6`,
    AddendumPost: `${url}/api/OfficialDocument/CreateAddendum/`,
    Memo: `${url}/api/OfficialDocument/7`,
    MemoPost: `${url}/api/OfficialDocument/CreateMemo`,
    PowerOfAttorney: `${url}/api/OfficialDocument/8`,
    PowerOfAttorneyPost: `${url}/api/OfficialDocument/CreatePowerOfAttorney`
  },
  task: {
    SimpleTask: `${url}/api/SimpleTask`,
    AssignmentId: `${url}/api/Assignment/GetAssignmentById/`,
    AllAssignments: `${url}/api/Assignment/GetAllAssignment/`,
    CompleteAssignment: `${url}/api​/Assignment​/CompleteAssignment`,
    MarkAsRead: `${url}/api/SimpleAssignment/MarkAsRead`
  }
};
