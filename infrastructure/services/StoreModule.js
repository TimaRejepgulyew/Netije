export default class StoreModule {

  contructor({ moduleType, storeTemplate }) {
    this.registeredModules = {};
    this.moduleType = moduleType;
    this.storeTemplate = storeTemplate;
  }

  contructor({ moduleType, storeTemplate }) {
    this.registeredModules = {};
    this.moduleType = moduleType;
    this.storeTemplate = storeTemplate;
  }

  async registerModule(context, taskId) {
    await context.$store.registerModule(`${this.moduleType}/${taskId}`, {
      namespaced: true,
      ...this.storeTemplate
    });
    this.registeredModules[taskId] = true;
  }

  async unregisterModule(context, taskId) {
    await context.$store.unregisterModule(`${this.moduleType}/${taskId}`);
    this.registeredModules[taskId] = false;
  }
  hasModule(taskId) {
    return this.registeredModules[taskId];
  }
}
