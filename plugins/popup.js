import Vue from "vue"
import Popup from "~/components/Layout/popup.vue"
Vue.component("Popup", Popup)

let karabas = Vue

export default (context, inject) => {

  const show = {

    bussiniesUnitCard(context) {
      let popup = Vue.extend(context.$Popup);
      let instance = new popup({
        propsData: {
          // isComponent: component,
          // isParams:params
        }
      });
      instance.$mount();
      context.$el.appendChild(instance.$el);
      console.log("asdasd");
    }
    // return (component, params) => {
    //   // console.log(isComponent);
    //   var popup = this.$Vue.extend(this.$Popup);
    //   var instance = new popup({
    //     propsData: {
    //       isComponent: component,
    //       isParams:params
    //     }
    //   });
    //   instance.$mount();
    //   this.$el.appendChild(instance.$el);
    // }
  }

  inject('show', show)
  inject('Vue', karabas)
  inject('Popup', Popup)
}
