import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";

export default ({ app }, inject) => {
  async function isEntityExists(url, payload, propertyName) {
    const ds = new DataSource({
      store: app.$dxStore({ key: "id", loadUrl: url }),
      requireTotalCount: true
    });
    var filter = [[propertyName, "=", payload[propertyName]]];
    if (payload.businessUnitId) {
      filter.push("and");
      filter.push(["businessUnitId", "=", payload.businessUnitId]);
    }
    if (payload.id) {
      filter.push("and");
      filter.push(["id", "<>", payload.id]);
    }
    ds.filter(filter);

    await ds.load();

    return ds.totalCount() > 0;
  }

  async function isNameExists(url, payload) {
    return await isEntityExists(url, payload, "name");
  }

  async function isCountryNotExists(payload) {
    return (
      (await isNameExists(dataApi.sharedDirectory.Country, payload)) == false
    );
  }

  async function isRegionNotExists(payload) {
    return (
      (await isNameExists(dataApi.sharedDirectory.Region, payload)) == false
    );
  }

  async function isLocalityNotExists(payload) {
    return (
      (await isNameExists(dataApi.sharedDirectory.Locality, payload)) == false
    );
  }

  async function isCurrencyNameNotExists(payload) {
    return (
      (await isNameExists(dataApi.sharedDirectory.Currency, payload)) == false
    );
  }

  async function CurrencyDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(
        dataApi.sharedDirectory.Currency,
        payload,
        propertyName
      )) == false
    );
  }

  async function CompanyDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(
        dataApi.contragents.CounterPart,
        payload,
        propertyName
      )) == false
    );
  }

  async function BankDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(dataApi.contragents.Bank, payload, propertyName)) ==
      false
    );
  }

  async function PersonDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(
        dataApi.contragents.Person,
        payload,
        propertyName
      )) == false
    );
  }

  async function BusinnesUnitDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(
        dataApi.company.BusinessUnit,
        payload,
        propertyName
      )) == false
    );
  }

  async function DocumentKindDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(
        dataApi.docFlow.DocumentKind,
        payload,
        propertyName
      )) == false
    );
  }

  async function EmployeeDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(dataApi.company.Employee, payload, propertyName)) ==
      false
    );
  }

  async function DepartmentDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(
        dataApi.company.Department,
        payload,
        propertyName
      )) == false
    );
  }

  async function JobTitleDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(dataApi.company.JobTitle, payload, propertyName)) ==
      false
    );
  }

  async function ManagerAssistantDataFieldValueNotExists(
    payload,
    propertyName
  ) {
    return (
      (await isEntityExists(
        dataApi.company.ManagersAssistant,
        payload,
        propertyName
      )) == false
    );
  }

  async function ContactDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(
        dataApi.contragents.Contact,
        payload,
        propertyName
      )) == false
    );
  }

  async function CaseFileDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(dataApi.docFlow.CaseFile.All, payload, propertyName)) ==
      false
    );
  }

  async function DeliveryMethodDataFieldValueNotExists(
    payload,
    propertyName
  ) {
    return (
      (await isEntityExists(
        dataApi.docFlow.DeliveryMethod,
        payload,
        propertyName
      )) == false
    );
  }

  async function FileRetentionPeriodDataFieldValueNotExists(
    payload,
    propertyName
  ) {
    return (
      (await isEntityExists(
        dataApi.docFlow.FileRetentionPeriod,
        payload,
        propertyName
      )) == false
    );
  }
  RegistrationGroupDataFieldValueNotExists;

  async function RegistrationGroupDataFieldValueNotExists(
    payload,
    propertyName
  ) {
    return (
      (await isEntityExists(
        dataApi.docFlow.RegistrationGroup,
        payload,
        propertyName
      )) == false
    );
  }

  async function DocumentRegistrationDataFieldValueNotExists(
    payload,
    propertyName
  ) {
    return (
      (await isEntityExists(
        dataApi.docFlow.DocumentRegister.All,
        payload,
        propertyName
      )) == false
    );
  }

  async function FilesTypeDataFieldValueNotExists(payload, propertyName) {
    return (
      (await isEntityExists(
        dataApi.docFlow.FilesType,
        payload,
        propertyName
      )) == false
    );
  }

  async function AssociatedApplicationDataFieldValueNotExists(
    payload,
    propertyName
  ) {
    return (
      (await isEntityExists(
        dataApi.docFlow.AssociatedApplication,
        payload,
        propertyName
      )) == false
    );
  }

  let obj = {
    isNameExists: isNameExists,
    isCountryNotExists: isCountryNotExists,
    isRegionNotExists: isRegionNotExists,
    isCurrencyNameNotExists: isCurrencyNameNotExists,
    isLocalityNotExists: isLocalityNotExists,
    CurrencyDataFieldValueNotExists: CurrencyDataFieldValueNotExists,
    CompanyDataFieldValueNotExists: CompanyDataFieldValueNotExists,
    BankDataFieldValueNotExists: BankDataFieldValueNotExists,
    PersonDataFieldValueNotExists: PersonDataFieldValueNotExists,
    BusinnesUnitDataFieldValueNotExists: BusinnesUnitDataFieldValueNotExists,
    DocumentKindDataFieldValueNotExists: DocumentKindDataFieldValueNotExists,
    EmployeeDataFieldValueNotExists: EmployeeDataFieldValueNotExists,
    DepartmentDataFieldValueNotExists: DepartmentDataFieldValueNotExists,
    JobTitleDataFieldValueNotExists: JobTitleDataFieldValueNotExists,
    ManagerAssistantDataFieldValueNotExists: ManagerAssistantDataFieldValueNotExists,
    ContactDataFieldValueNotExists: ContactDataFieldValueNotExists,
    CaseFileDataFieldValueNotExists: CaseFileDataFieldValueNotExists,
    FileRetentionPeriodDataFieldValueNotExists: FileRetentionPeriodDataFieldValueNotExists,
    DeliveryMethodDataFieldValueNotExists: DeliveryMethodDataFieldValueNotExists,
    RegistrationGroupDataFieldValueNotExists: RegistrationGroupDataFieldValueNotExists,
    DocumentRegistrationDataFieldValueNotExists: DocumentRegistrationDataFieldValueNotExists,
    FilesTypeDataFieldValueNotExists: FilesTypeDataFieldValueNotExists,
    AssociatedApplicationDataFieldValueNotExists: AssociatedApplicationDataFieldValueNotExists
  };

  inject("customValidator", obj);
};
