import StoreModule from "./StoreModule";
export default class DocumentStoreModule extends StoreModule {
  constructor() {
    super({ moduleName: "documents", storeTemplate: [] });
  }
}
