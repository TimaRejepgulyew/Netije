import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";

export default ({ app }, inject) => {
  async function isEntityExists(url, payload, propertyName) {
    const ds = new DataSource({
      store: app.$dxStore({ key: "id", loadUrl: url }),
      requireTotalCount: true
    });
    var filter = [[propertyName, "=", payload[propertyName]]];

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
    return (await isNameExists(dataApi.sharedDirectory.Country, payload)) == false;
  }

  async function isRegionNotExists(payload) {
    return (await isNameExists(dataApi.sharedDirectory.Region, payload)) == false;
  }

  async function isHumanSettlementNotExists(payload) {
    return (await isNameExists(dataApi.sharedDirectory.Locality, payload)) == false;
  }

  async function isCurrencyNameNotExists(payload) {
    return (await isNameExists(dataApi.sharedDirectory.Currency, payload)) == false;
  }

  async function CurrencyDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.sharedDirectory.Currency, payload, propertyName)) == false;
  }

  async function CompanyDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.contragents.Company, payload, propertyName)) == false;
  }

  async function BankDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.contragents.Bank, payload, propertyName)) == false;
  }

  async function PersonDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.contragents.Person, payload, propertyName)) == false;
  }

  async function BusinnesUnitDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.company.BusinessUnit, payload, propertyName)) == false;
  }

  async function EmployeeDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.company.Employee, payload, propertyName)) == false;
  }

  async function DepartmentDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.company.Department, payload, propertyName)) == false;
  }

  async function JobTitleDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.company.JobTitle, payload, propertyName)) == false;
  }

  async function ManagerAssistantDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.company.ManagersAssistant, payload, propertyName)) == false;
  }

  let obj = {
    isNameExists: isNameExists,
    isCountryNotExists: isCountryNotExists,
    isRegionNotExists: isRegionNotExists,
    isCurrencyNameNotExists: isCurrencyNameNotExists,
    isHumanSettlementNotExists: isHumanSettlementNotExists,
    CurrencyDataFieldValueNotExists: CurrencyDataFieldValueNotExists,
    CompanyDataFieldValueNotExists: CompanyDataFieldValueNotExists,
    BankDataFieldValueNotExists: BankDataFieldValueNotExists,
    PersonDataFieldValueNotExists: PersonDataFieldValueNotExists,
    BusinnesUnitDataFieldValueNotExists: BusinnesUnitDataFieldValueNotExists,
    EmployeeDataFieldValueNotExists:EmployeeDataFieldValueNotExists,
    DepartmentDataFieldValueNotExists: DepartmentDataFieldValueNotExists,
    JobTitleDataFieldValueNotExists: JobTitleDataFieldValueNotExists,
    ManagerAssistantDataFieldValueNotExists: ManagerAssistantDataFieldValueNotExists
  };

  inject("customValidator", obj);
};
