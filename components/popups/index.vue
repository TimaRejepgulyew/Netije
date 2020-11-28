<template>
  <div>
    <DxLoadPanel :visible.sync="isLoading" :indicatorSrc="indicatorIcon" />
    <DxPopup
      :closeOnOutsideClick="defaultPopupSettings.closeOnOutsideClick"
      :dragEnabled="defaultPopupSettings.dragEnabled"
      :showTitle="defaultPopupSettings.showTitle"
      :width="defaultPopupSettings.width"
      :height="defaultPopupSettings.height"
      :position="defaultPopupSettings.position"
      :onHidden="destroyComponent"
      :visible="visible"
      :title="title"
    >
      <div>
        <DxScrollView :useNative="true" width="100%" height="100%">
          <div class="space"></div>

          <component
            ref="content"
            @loadStatus="showComponent"
            @showTitle="setTitle"
            @valueChanged="valueChanged"
            @close="closePopup"
            :is="template"
            :options="options"
          />
          <div class="space"></div>
        </DxScrollView>
      </div>
    </DxPopup>
  </div>
</template>

<script>
import { alert } from "devextreme/ui/dialog";
import Vue from "vue";
import contactCard from "./contact-card-popup.vue";
import taskCard from "./task-card-popup.vue";
import documentCard from "./document-card-popup.vue";
import bussiniesUnitCard from "./business-unit-popup.vue";
import departmentCard from "./department-popup.vue";
import employeeCard from "./employee-popup.vue";
import counterPartCard from "./counter-part-card-popup.vue";
import counterPartGrid from "./counter-part-grid-popup.vue";
import accessRight from "./access-right-popup.vue";
import attachmentAccessRightDialog from "./attachment-access-right-dialog-popup.vue";
import assignmentCard from "./assignment-card-popup.vue";
import documentGrid from "./document-grid-popup.vue";
import documentEditor from "./document-editor-popup.vue";
import pdfFileReader from "./pdf-file-reader-popup.vue";
import imageViewer from "./image-viewer-popup.vue";
import indicatorIcon from "~/static/icons/loading.gif";
import { DxPopup } from "devextreme-vue/popup";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import { DxScrollView } from "devextreme-vue/scroll-view";

export default {
  components: {
    DxPopup,
    DxLoadPanel,
    DxScrollView,
    bussiniesUnitCard,
    departmentCard,
    employeeCard,
    counterPartCard,
    counterPartGrid,
    documentCard,
    accessRight,
    attachmentAccessRightDialog,
    assignmentCard,
    documentGrid,
    taskCard,
    contactCard,
    DxScrollView,
    documentEditor,
    pdfFileReader,
    imageViewer
  },
  name: "base-popup",
  props: {
    template: {
      type: String
    },
    options: {
      type: Object
    },
    popupSettings: {
      type: Object
    }
  },
  data() {
    return {
      visible: false,
      isLoading: false,
      title: "",
      indicatorIcon
    };
  },
  computed: {
    defaultPopupSettings() {
      return {
        closeOnOutsideClick: false,
        dragEnabled: false,
        showTitle: true,
        width: "90vw",
        height: "95vh",
        position: { my: "center", at: "center" },
        showLoadingPanel: true,
        ...this.popupSettings
      };
    }
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
    hideLoadIndicator() {
      this.isLoading = false;
    },
    showLoadIndicator() {
      this.isLoading = this.defaultPopupSettings.showLoadingPanel;
    },
    accessDenied(e) {
      this.hideLoadIndicator();
      alert(
        this.$t("shared.alert.notHaveAccessRightToRead"),
        this.$t(`scanner.alert.error`)
      );
    },
    showComponent() {
      this.visible = true;
      this.hideLoadIndicator();
    },
    setTitle(data) {
      this.title = data;
    }
  },
  mounted() {
    this.isLoading = this.defaultPopupSettings.showLoadingPanel;
  }
};
</script>

<style lang="scss">
.popup_wrapper {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 0;
  width: 50%;
  height: 50vh;
  background-color: rgba($color: #000000, $alpha: 0.6);
}
// .space {
//   min-height: 100px;
// }
.dx-scrollable-native.dx-scrollable-vertical,
.dx-scrollable-native.dx-scrollable-vertical
  > .dx-scrollable-wrapper
  > .dx-scrollable-container {
  overflow-y: hidden;
}
</style>
