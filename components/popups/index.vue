<template>
  <div v-if="visible">
    <DxLoadPanel
      @click="destroyComponent"
      :visible.sync="isLoading"
      :indicatorSrc="indicatorIcon"
    />
    <div
      class="popup_color_wrapper"
      :style="`align-items:${defaultPopupSettings.position}`"
    >
      <transition name="popup-fade">
        <div
          v-show="showPopup"
          class="custom_popup"
          :style="`height:${defaultPopupSettings.height}; width:${defaultPopupSettings.width}`"
        >
          <div class="custom_popup_title">
            <div class="text">{{ title }}</div>
            <div class="icon" @click="destroyComponent">
              <i class="dx-icon dx-icon-close"></i>
            </div>
          </div>
          <div class="custom_popup_content">
            <component
              ref="content"
              @loadStatus="showComponent"
              @showTitle="setTitle"
              @valueChanged="valueChanged"
              @close="destroyComponent"
              @onError="onError"
              :is="template"
              :options="options"
              :key="componentKey"
            />
          </div>
        </div>
      </transition>
    </div>
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
import { DxLoadPanel } from "devextreme-vue/load-panel";
export default {
  components: {
    DxLoadPanel,
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
    documentEditor,
    pdfFileReader,
    imageViewer,
  },
  name: "base-popup",
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
      visible: true,
      isLoading: false,
      title: "",
      indicatorIcon,
      showPopup: false,
      isLoaded: false,
      componentKey: new Date().getSeconds(),
    };
  },
  computed: {
    defaultPopupSettings() {
      return {
        closeOnOutsideClick: false,
        dragEnabled: false,
        showTitle: true,
        width: "95vw",
        height: "95vh",
        position: "center",
        showLoadingPanel: true,
        ...this.popupSettings,
      };
    },
  },
  methods: {
    onError(error) {
      console.log("error", error);
      switch (error.status) {
        case 403:
          this.accessDenied();
          break;
        default:
          this.defaultError();
          break;
      }
      this.destroyComponent();
    },
    defaultError() {
      alert(
        this.$t("shared.alert.serverError"),
        this.$t(`scanner.alert.error`)
      );
    },
    destroyComponent() {
      this.visible = false;
      this.$nextTick(() => {
        this.$destroy();
      });
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
      this.showPopup = true;
      // setTimeout(() => {
      //   this.componentKey = new Date().getHours();
      // }, 200);
      this.hideLoadIndicator();
    },
    setTitle(data) {
      this.title = data;
    },
  },
  mounted() {
    this.showLoadIndicator();
  },
};
</script>

<style lang="scss">
@import "@/assets/themes/generated/variables.base.scss";
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: 0.5s;
}
.popup-fade-enter,
.popup-fade-leave-to {
  transform: scale(0);
}
.popup_color_wrapper {
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  .custom_popup {
    border-radius: 6px;
    position: relative;
    background-color: white;
    max-width: 90vw;
    max-height: 95vh;
    z-index: 1001;
    overflow: hidden;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    .custom_popup_title {
      width: 100%;
      padding: 6px 20px;
      background-color: white;
      border-bottom: 1px solid $base-border-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100px;
        flex-grow: 1;
        font-size: 20px;
        font-weight: 400;
        font-family: "Helvetica Neue", "Segoe UI", Helvetica, Verdana,
          sans-serif;
      }
      .icon {
        cursor: pointer;
        padding: 10px;
        i {
          font-size: 15px;
        }
      }
    }
    .custom_popup_content {
      overflow-y: scroll;
      padding: 20px 20px 20px 20px;
      height: 90vh;
      font-family: "Helvetica Neue", "Segoe UI", Helvetica, Verdana, sans-serif;
      // &::-webkit-scrollbar {
      //   width: 8px;
      // }
      // &::-webkit-scrollbar-thumb {
      //   border-radius: 10px;
      //   background-color: $base-border-color;
      //   cursor: pointer;
      // }
    }
  }
}
</style>
