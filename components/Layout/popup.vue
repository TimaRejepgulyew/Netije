<template>
  <div>
    <DxLoadPanel :visible.sync="isLoading" :indicatorSrc="indicatorIcon" />
    <DxPopup
      :closeOnOutsideClick="defaultPopupSettings.closeOnOutsideClick"
      :dragEnabled="defaultPopupSettings.dragEnabled"
      :showTitle="defaultPopupSettings.showTitle"
      :width="defaultPopupSettings.width"
      :height="defaultPopupSettings.height"
      :onHidden="destroyComponent"
      :visible="visible"
      :title="title"
    >
      <div class="scrool-auto" ref="popup">
        <component
          @loadStatus="enabledLoadPanel"
          @showTitle="setTitle"
          @valueChanged="valueChanged"
          @close="closePopup"
          :is="template"
          :options="options"
        />
      </div>
    </DxPopup>
  </div>
</template>

<script>
import Vue from "vue";
import bussiniesUnitCard from "~/components/popups/business-unit-popup.vue";
import departmentCard from "~/components/popups/department-popup.vue";
import employeeCard from "~/components/popups/employee-popup.vue";
import counterPartCard from "~/components/popups/counter-part-card-popup.vue";
import counterPartGrid from "~/components/popups/counter-part-grid-popup.vue";
import indicatorIcon from "~/static/icons/loading.gif";
import { DxPopup } from "devextreme-vue/popup";
import { DxLoadPanel } from "devextreme-vue/load-panel";
export default {
  components: {
    DxPopup,
    DxLoadPanel,
    bussiniesUnitCard,
    departmentCard,
    employeeCard,
    counterPartCard,
    counterPartGrid,
  },
  props: {
    template: {
      type: String,
    },
    options: {
      type: Object,
    },
    popupSettings: {
      type: Object,
    },
  },
  data() {
    return {
      visible: false,
      isLoading: false,
      title: "",
      indicatorIcon,
    };
  },
  computed: {
    defaultPopupSettings() {
      return {
        closeOnOutsideClick: true,
        dragEnabled: false,
        showTitle: true,
        width: "90%",
        height: "95%",
        showLoadingPanel: true,
        ...this.popupSettings,
      };
    },
  },
  methods: {
    destroyComponent() {
      this.$destroy();
    },
    closePopup() {
      this.visible = false;
    },
    valueChanged(data) {
      this.$emit("valueChanged", data);
    },
    enabledLoadPanel() {
      this.isLoading = false;
      this.visible = true;
    },
    setTitle(data) {
      this.title = data;
    },
  },
  mounted() {
    this.isLoading = this.defaultPopupSettings.showLoadingPanel;
    // console.log(this.template, this.options);
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