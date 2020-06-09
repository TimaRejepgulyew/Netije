import dataApi from "~/static/dataApi";
export default {
  emptyDocumentKind() {
    return {
      autoNumbering: false,
      id: null,
      availableActions: [],
      generateDocumentName: false,
      isDefault: false,
      numberingType: null
    };
  }
};
