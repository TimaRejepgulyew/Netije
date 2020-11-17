<template>
  <div>
    <DxPopup :visible="visible" :dragEnabled="false">
      <div ref="popup">
        <button @click="destroy">close</button>
        <!-- <component :is="isComponent" /> -->
      </div>
    </DxPopup>
  </div>
</template>

<script>
import Vue from "vue";
import ImageUploader from "~/components/employee/custom-image-uploader";

import { DxPopup } from "devextreme-vue/popup";
export default {
  props: ["isComponent","isParams"],
  components: {
    DxPopup,
    ImageUploader
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    destroy() {
      this.$destroy();
    },
  },
  mounted() {
    this.visible = true;
    var popup = Vue.extend(this.isComponent);
    var instance = new popup({
        propsData: {
          ...this.isParams
        }
      });
    instance.$mount();
    this.$refs.popup.appendChild(instance.$el);
  },
};
</script>

<style lang="scss" scoped>
.popup_wrapper {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 0;
  width: 50%;
  height: 50vh;
  background-color: rgba($color: #000000, $alpha: 0.6);
}
</style>