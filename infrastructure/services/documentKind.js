import dataApi from "~/static/dataApi";
export default {
  async getDefaultDocumentKind(context, documentType) {
    let response = await context.$axios.get(
      dataApi.docFlow.DocumentKind +
        `?skip=0&take=20&filter=[["documentTypeId","=",${documentType}],"and",["status","=",0]]`
    );
    const emptyDocKind = this.emptyDocumentKind();
    const documentKinds = response.data.data;
    switch (documentKinds.length) {
      case 0:
        return emptyDocKind;
      case 1:
        return documentKinds[0];
      default:
        return (
          documentKinds.find(el => {
            return el.isDefault;
          }) || emptyDocKind
        );
    }
  },
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
