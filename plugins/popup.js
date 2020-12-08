import Vue from "vue";
import Popup from "~/components/popups/index.vue";
Vue.component("Popup", Popup);

function BasePopup(template) {
  return function (context, options, popupSettings) {
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
    documentReports: BasePopup("documentReports")
  };

  const popups = [];
  app.$eventBus.$on("popup-created", ({ id, closeOnEscapePress = true }) => {
    popups.push({ id, closeOnEscapePress });
  });

  app.$eventBus.$on("popup-destroyed", () => {
    popups.pop();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape" && popups.length > 0) {
      var lastPopup = popups[popups.length - 1];
      if (lastPopup.closeOnEscapePress) {
        app.$eventBus.$emit("close-popup", lastPopup.id);
      }
    }
  });

  inject("popup", popup);
};
