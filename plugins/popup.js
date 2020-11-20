import Vue from "vue"
import Popup from "~/components/popups/index.vue"
Vue.component("Popup", Popup)

function BasePopup(template) {
  return function (context, options, popupSettings) {
    let popup = Vue.extend(context.$Popup);
    let instance = new popup({
      parent: context,
      propsData: {
        template: template,
        options: options,
        popupSettings: popupSettings,
      },
    });

    instance.$on('valueChanged',  (data) => {context.valueChanged(data)})
    instance.$mount();
    context.$el.appendChild(instance.$el);
  }
}

export default (pluginContext, inject) => {
  const popup = {
    bussiniesUnitCard: BasePopup("bussiniesUnitCard"),
    departmentCard: BasePopup("departmentCard"),
    employeeCard: BasePopup("employeeCard"),
    counterPartCard: BasePopup("counterPartCard"),
    counterPartGrid: BasePopup("counterPartGrid"),
    accessRight: BasePopup("accessRight"),
  }
  inject('popup', popup)
  inject('Popup', Popup)
}
