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
    MailDeliveryMethod: `${url}/api/MailDeliveryMethod`,
    DocumentRegistry: `${url}/api/DocumentRegistry`,
    RegSettingAvailableBusinessUnits: `${url}/api/RegistrationSetting/AvailableBusinessUnits`,
    RegistrationSetting: `${url}/api/RegistrationSetting`,
    AssociatedApplication: `${url}/api/AssociatedApplication`,
    FilesType: `${url}/api/FilesType`,
    DocumentRegistration: `${url}/api/DocumentRegistry/RegisterDocument`,
    UnregisterDocument: `${url}/api/DocumentRegistry/UnregisterDocument`,
    PreliminaryNumber: `${url}/api/DocumentRegistry/PreliminaryNumber`
  },
  paperWork: {
    IncommingLetter: `${url}/api/OfficialDocument/1`,
    GetDocumentById: `${url}/api/OfficialDocument/GetDocumentById/`,
    IncommingLetterPost: `${url}/api/OfficialDocument/CreateIncomingLetter`,
    OutgoingLetter: `${url}/api/OfficialDocument/2`,
    Order: `${url}/api/OfficialDocument/3`,
    companyDirective: `${url}/api/OfficialDocument/4`,
    SimpleDocument: `${url}/api/OfficialDocument/5`,
    Addendum: `${url}/api/OfficialDocument/6`,
    Memo: `${url}/api/OfficialDocument/7`,
    PowerOfAttorney: `${url}/api/OfficialDocument/8`,
    DeleteDocument: `${url}/api/OfficialDocument/`
  }
};
