<template>
  <div class="navBar">
    <DxPopup
      :visible.sync="isOpenDocumentRegistrationPopup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      :height="'auto'"
      :title="$t('doсumentRegistration.cardOfRegistration')"
    >
      <div>
        <document-registration-popup
          :defaultDocumentRegistration="defaultDocumentRegistration"
          :documentId="documentId"
          v-if="isOpenDocumentRegistrationPopup"
          @hidePopup="togglePopup"
        />
      </div>
    </DxPopup>
    <DxButton
      v-if="isRegistered"
      :text="$t('doсumentRegistration.cancelRegistration')"
      :onClick="unRegister"
      icon="clear"
    ></DxButton>
    <DxButton
      v-else
      :text="$t('doсumentRegistration.register')"
      :hint="$t('doсumentRegistration.register')"
      :icon="registerIcon"
      :onClick="register"
    ></DxButton>
  </div>
</template>

<script>
import registerIcon from "~/static/icons/stamp.svg";
import dataApi from "~/static/dataApi";
import { confirm } from "devextreme/ui/dialog";
import { DxPopup } from "devextreme-vue/popup";
import DocumentRegistrationPopup from "~/components/document-registration/popups/registration-popup.vue";
import Docflow from "~/infrastructure/constants/docflows";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup,
    DocumentRegistrationPopup,
  },
  props: ["documentId"],
  data() {
    return {
      defaultDocumentRegistration: {},
      registerIcon,
      isOpenDocumentRegistrationPopup: false,
    };
  },
  inject: ["trySaveDocument"],
  methods: {
    togglePopup() {
      this.isOpenDocumentRegistrationPopup = !this
        .isOpenDocumentRegistrationPopup;
    },

    async register() {
      if (await this.trySaveDocument()) {
        const data = await this.getDefaultDocumentRegiter();

        this.defaultDocumentRegistration = data;
        this.togglePopup();
      }
    },
    async unRegister() {
      if (await this.trySaveDocument()) {
        let result = confirm(
          this.$t("documentRegistration.areYouSureCancelRegistration"),
          this.$t("shared.confirm")
        );
        result.then((dialogResult) => {
          if (dialogResult) {
            this.$awn.asyncBlock(
              this.$store.dispatch(`documents/${this.documentId}/unRegister`),
              (res) => {
                this.$awn.success();
              },
              (err) => {
                this.$awn.alert();
              }
            );
          }
        });
      }
    },
    async getDefaultDocumentRegiter() {
      const data = await this.$awn.asyncBlock(
        this.$axios.get(
          `${dataApi.docFlow.DocumentRegister.DefaultDocumentRegister}${this.documentId}`
        ),
        () => {},
        () => {}
      );
    },
  },
  computed: {
    isDataChanged() {
      return this.$store.getters[`documents/${this.documentId}/isDataChanged`];
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
  },
};
</script>