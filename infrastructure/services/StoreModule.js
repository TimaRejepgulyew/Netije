export default class StoreModule {
  constructor({ moduleName, storeTemplate }) {
    this.registeredModules = {};
    this.moduleName = moduleName;
    this.storeTemplate = storeTemplate;
  }
  async registerModule(context, taskId) {
    console.log(this.moduleName);
    await context.$store.registerModule(`${this.moduleName}/${taskId}`, {
      namespaced: true,
      ...this.storeTemplate
    });
    this.registeredModules[taskId] = true;
  }

  async unregisterModule(context, taskId) {
    await context.$store.unregisterModule(`${this.moduleName}/${taskId}`);
    this.registeredModules[taskId] = false;
  }
  hasModule(taskId) {
    return this.registeredModules[taskId];
  }
}
