//Тип Настройки регистрации
export const SettingTypes = {
  Registration: 0,
  Numeration: 1,
    //TODO:Feature v2.0
  //Reservation: 2,
}


export default {
  GetAll(context){
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
  }
};