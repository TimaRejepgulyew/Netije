import Vue from "vue";
import Popup from "~/components/popups/index.vue";
Vue.component("Popup", Popup);

let popups = [];
function BasePopup(template) {
  return function (context, options, popupSettings) {
    let dialogId = new Date().getTime();
    popups.push(dialogId);
    let popup = Vue.extend(Popup);
    let instance = new popup({
      parent: context,
      propsData: {
        dialogId,
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
    context.$root.$el.appendChild(instance.$el);

  };
}

export default ({ app }, inject) => {

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
    imageViewer: BasePopup("imageViewer"),
    scannerDialog: BasePopup("scannerDialog"),
    spreadSheet: BasePopup("spreadSheet"),
    licenseInfo: BasePopup("licenseInfo"),
  };

  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape" && popups.length > 0) {
      var currentDialogId = popups.pop();
      app.$eventBus.$emit("close-dialog", currentDialogId);
    }
  })

  inject("popup", popup);
};
