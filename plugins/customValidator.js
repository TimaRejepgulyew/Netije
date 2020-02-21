import DataSource from 'devextreme/data/data_source';
import dataApi from "~/static/dataApi";

export default ({ app }, inject) => {

    async function isEntityExists(url, payload, propertyName) {
        const ds = new DataSource({
            store: app.$dxStore({ key: "id", loadUrl: url }),
            requireTotalCount: true
        });
        var filter = [[propertyName, '=', payload[propertyName]]];
        if (payload.id) {
            filter.push("and");
            filter.push(['id', '<>', payload.id])
        }
        ds.filter(filter);
        await ds.load();

        return ds.totalCount() > 0;

    }

    async function isNameExists(url, payload) {
        return await isEntityExists(url, payload, "name");
    }

    async function isCountryNotExists(payload) {
        return (await isNameExists(dataApi.Country, payload)) == false;
    }

    async function isRegionExists(payload) {
        return (await isNameExists(dataApi.Region, payload)) == false;
    }

    async function isHumanSettlementExists(payload) {
        return (await isNameExists(dataApi.Locality, payload)) == false;
    }

    async function isCurrencyCodeExists(payload) {
        return (await isEntityExists(dataApi.Currency, payload, "code")) == false;
    }

    async function isCurrencyNameExists(payload) {
        return (await isEntityExists(dataApi.Currency, payload, "name")) == false;
    }


    let obj = {
        isNameExists: isNameExists,
        isCountryNotExists: isCountryNotExists,
        isRegionExists: isRegionExists,
        isCurrencyCodeExists: isCurrencyCodeExists,
        isCurrencyNameExists:isCurrencyNameExists,
        isHumanSettlementExists: isHumanSettlementExists
    }

    inject("customValidator", obj);
}