import Vue from "vue";
import Popup from "~/components/popups/index.vue";
Vue.component("Popup", Popup);

function BasePopup(template) {
  return function(context, options, popupSettings) {
    let popup = Vue.extend(Popup);
    let instance = new popup({
      parent: context,
      propsData: {
        template: template,
        options: options,
        popupSettings: popupSettings
      }
    });
    if (popupSettings?.listeners) {
      popupSettings.listeners.forEach(({ eventName, handlerName }) => {
        instance.$on(eventName, data => {
          context[handlerName](data);
        });
      });
    }

    instance.$mount();
    context.$el.appendChild(instance.$el);
  };
}

export default (pluginContext, inject) => {
  const popup = {
    bussiniesUnitCard: BasePopup("bussiniesUnitCard"),
    departmentCard: BasePopup("departmentCard"),
    employeeCard: BasePopup("employeeCard"),
    counterPartCard: BasePopup("counterPartCard"),
    contactCard: BasePopup("contactCard"),
    counterPartGrid: BasePopup("counterPartGrid"),
    accessRight: BasePopup("accessRight"),
    attachmentAccessRightDialog: BasePopup("attachmentAccessRightDialog"),
    assignmentCard: BasePopup("assignmentCard"),
    documentGrid: BasePopup("documentGrid"),
    documentCard: BasePopup("documentCard"),
    taskCard: BasePopup("taskCard"),
    pdfFileReader: BasePopup("pdfFileReader"),
    documentEditor: BasePopup("documentEditor"),
    documentViewers: BasePopup("documentViewers"),
    imageViewer: BasePopup("imageViewer"),

  };
  inject("popup", popup);
};
