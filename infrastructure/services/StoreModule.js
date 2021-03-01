export default class StoreModule {
  constructor({ moduleName, storeTemplate }) {
    this.registeredModules = {};
    this.moduleName = moduleName;
    this.storeTemplate = storeTemplate;
  }
  async registerModule(context, moduleId) {
    await context.$store.registerModule(`${this.moduleName}/${moduleId}`, {
      namespaced: true,
      ...this.storeTemplate
    });
    this.registeredModules[moduleId] = true;
  }

  async registerDocumentModule(context, moduleId, storeTemplate) {
    await context.$store.registerModule(`${this.moduleName}/${moduleId}`, {
      namespaced: true,
      ...storeTemplate
    });
    this.registeredModules[moduleId] = true;
  }

  async unregisterModule(context, moduleId) {
    await context.$store.unregisterModule(`${this.moduleName}/${moduleId}`);
    this.registeredModules[moduleId] = false;
  }
  hasModule(moduleId) {
    return this.registeredModules[moduleId];
  }
}
