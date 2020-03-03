export const url = process.env.baseUrl;
export default {
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
    BusinessUnit: `${url}/api/BusinessUnit`,
    Employee: `${url}/api/Employee`,
    JobTitle: `${url}/api/JobTitle`,
    ManagersAssistant: `${url}/api/ManagersAssistant`
  },
  admin: {
    Roles: `${url}/api/Role`
  },
  docFlow: {
    DocumentKind: `${url}/api/DocumentKind`,
    DocumentType: `${url}/api/DocumentType`,
    CaseFile: `${url}/api/CaseFile`,
    FileRetentionPeriod: `${url}/api/FileRetentionPeriod`,
    RegistrationGroup: `${url}/api/RegistrationGroup`,
    MailDeliveryMethod: `${url}/api/MailDeliveryMethod`,
    

  }
};
