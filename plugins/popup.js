import Vue from "vue"
import Popup from "~/components/Layout/popup.vue"
Vue.component("Popup",Popup)
export default (context, inject) => {
  const isMobile = window.screen.width < 1024
  console.log(Vue);
  inject('isMobile', isMobile)
}
