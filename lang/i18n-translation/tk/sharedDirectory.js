export default {
  headerTitle: "Общие справочники",
  headerDescription: "Модуль предназначен для управления информационно-справочными сведениями общего характера.",
  territorialStructure: {
    createLocalities: "Создать населенный пункт",
    title: "Территориальное устройство",
    localities: "Населеные пункты",
    localitiesDescr: "Открытие справочника населенных пунктов.",
    region: "Регионы",
    regionDescr: "Справочник предназначен для хранения сведений об административно-территориальном делении стран.",
    country: "Страны",
    countryDescr: "Открытие справочника стран.",
  },
  additionalInfo: {
    title: "Дополнительная информация",
    currencies: "Валюты",
    currenciesDescr: "Открытие справочника валют."
  },
  fields: {
    currencyId: "Валюта",
    countryId: "Страна",
    fractionName: "Наименование фракции",
    numericCode: "Цифровой код",
    alphaCode: "Альфа код",
  },
  validation: {
    alphaCodeRequired: "Введите альфа код валюты",
    alphaCodeAlreadyExists: "Такой код валюты уже существует",
    numericCodeAlreadyExists: "Такое цифровой код валюты уже существует",
    numericCodeRequired: "Введите цифровой код",
    fractionNameRequired: "Введите наименования дробной части валюты",
    fractionNameAlreadyExists:
      "Такое наименования дробной части валюты уже существует",
    currencyAlreadyExists: "Такая валюта уже существует",
    countryAlreadyExists: "Такая страна уже существует",
    countryIdRequired: "Выберите страну",
    currencyIdRequired: "Введите валюту",
  }
}
