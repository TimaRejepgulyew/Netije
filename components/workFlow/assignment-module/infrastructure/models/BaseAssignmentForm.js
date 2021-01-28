import baseNotifications from "../../form-components/base-notification/index.vue";

export class BaseFormNotification {
  formTypes = {};
  constructor() {}
  getFormByType(type) {
    if (!this.formTypes[type]) return baseNotifications;
    else return this.formTypes[type];
  }
}
export default function(type) {
  return new BaseFormNotification().getFormByType(type);
}
