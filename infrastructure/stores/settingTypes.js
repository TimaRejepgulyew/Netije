import RegisterTypes from "~/infrastructure/constants/registerTypes.js"
import NumberingTypes from "~/infrastructure/constants/numberingTypes.js"

//Тип Настройки регистрации
export const SettingTypes = {
  Registration: 0,
  Numeration: 1,
  //TODO:Feature v2.0
  //Reservation: 2,
}


export default {
  Values: SettingTypes,
  GetAll(context) {
    return [
      {
        id: SettingTypes.Registration,
        name: context.$t("registrationSettings.settingType.registration")
      },
      {
        id: SettingTypes.Numeration,
        name: context.$t("registrationSettings.settingType.numeration")
      }
    ]
  },
  mapToRegisterType(settingType) {
    switch (settingType) {
      case SettingTypes.Registration: return RegisterTypes.Registration;
      case SettingTypes.Numeration: return RegisterTypes.Numbering;
      default: throw "Unsupported mapping from SettingType -> RegisterType";
    }
  },
  mapToNumberingType(settingType) {
    switch (settingType) {
      case SettingTypes.Registration: return NumberingTypes.Registrable;
      case SettingTypes.Numeration: return NumberingTypes.Numerable;
      default: throw "Unsupported mapping from SettingType -> NumberingType";
    }
  }

};