export const state = () => ({
  isDataChanged: true,
  readOnly: false,
  canUpdate: true,
  canRegister: false,
  isRegistered: false
});

export const getters = {
  isreadOnlyOrNotDataChanged({ isDataChanged, readOnly }) {
    console.log(readOnly || !isDataChanged);
    return readOnly || !isDataChanged;
  }
};
export const mutations = {
    
};
