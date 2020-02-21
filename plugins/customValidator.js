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
    return (await isNameExists(dataApi.sharedCountry.Country, payload)) == false;
  }

  async function isRegionNotExists(payload) {
    return (await isNameExists(dataApi.sharedCountry.Region, payload)) == false;
  }

  async function isHumanSettlementNotExists(payload) {
    return (await isNameExists(dataApi.sharedCountry.Locality, payload)) == false;
  }

  async function isCurrencyNameNotExists(payload) {
    return (await isNameExists(dataApi.sharedCountry.Currency, payload)) == false;
  }

  async function CurrencyDataFieldValueNotExists(payload, propertyName) {
    return (await isEntityExists(dataApi.sharedCountry.Currency, payload, propertyName)) == false;
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

  let obj = {
    isNameExists: isNameExists,
    isCountryNotExists: isCountryNotExists,
    isRegionExists: isRegionNotExists,
    isCurrencyNameNotExists: isCurrencyNameNotExists,
    isHumanSettlementNotExists: isHumanSettlementNotExists,
    CurrencyDataFieldValueNotExists: CurrencyDataFieldValueNotExists,
    CompanyDataFieldValueNotExists:CompanyDataFieldValueNotExists,
    BankDataFieldValueNotExists:BankDataFieldValueNotExists,
    PersonDataFieldValueNotExists: PersonDataFieldValueNotExists
  };

  inject("customValidator", obj);
};
