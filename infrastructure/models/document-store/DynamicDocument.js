// import ElectronicDocument from "~/infrastructure/models/document-store/ElectronicDocument.js";
// export default class DynamicDocument extends ElectronicDocument {
//   constructor(options) {
//     const mutations = {
//       ...options?.mutations,

//       SET_DYNAMIC_FIELD: (state, { data, value }) => {
//         state.document[data.dataField] = value;
//         state.isDataChanged = true;
//       }
//     };
//     const getters = {
//       value: ({ document }) => dataField => {
//         return document[dataField];
//       }
//     };
//     const actions = {
//       ...options?.actions
//     };
//     super({ mutations, actions, getters });
//   }
// }
