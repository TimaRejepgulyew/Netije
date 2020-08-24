<template>
  <div class="navBar">
    <keep-alive>
      <DxPopup
        :visible.sync="isOpenPopupRegiterCard"
        :drag-enabled="true"
        :close-on-outside-click="true"
        :show-title="true"
        :min-width="300"
        :width="600"
        :height="'auto'"
        :title="$t('doсumentRegistration.cardOfNumbering')"
      >
        <div>
          <document-numerate-popup
            v-if="isOpenPopupRegiterCard"
            :defaultDocumentRegistration="defaultDocumentRegistration"
            :documentId="documentId"
          />
        </div>
      </DxPopup>
    </keep-alive>
    <DxPopup
      :deferRendering="false"
      :visible.sync="isOpenNotFindDocumentRegister"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="400"
      max-width="100%"
      position="center"
      height="300px"
      :title="$t('doсumentRegistration.notFindDocumentRegister')"
    >
      <div>
        <not-find-document-register-popup
          v-if="isOpenNotFindDocumentRegister"
          @hidePopup="()=>togglePopup('isOpenNotFindDocumentRegister')"
        />
      </div>
    </DxPopup>
    <DxButton
      v-if="isRegistered"
      :text="$t('doсumentRegistration.clearNumerate')"
      :onClick="unRegister"
      icon="clear"
    ></DxButton>
    <DxButton
      v-else
      :text="$t('doсumentRegistration.numerate')"
      :hint="$t('doсumentRegistration.numerate')"
      :icon="numerateIcon"
      :onClick="register"
    ></DxButton>
  </div>
</template>

<script>
import numerateIcon from "~/static/icons/document-registration/numerate.svg";
import dataApi from "~/static/dataApi";
import { confirm } from "devextreme/ui/dialog";
import { DxPopup } from "devextreme-vue/popup";
import notFindDocumentRegisterPopup from "~/components/document-registration/popups/not-find-document-register-popup.vue";
import documentNumeratePopup from "~/components/document-registration/popups/numeration-popup.vue";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup,
    documentNumeratePopup,
    notFindDocumentRegisterPopup,
  },
  props: ["documentId"],
  data() {
    return {
      numerateIcon,
      isOpenPopupRegiterCard: false,
      isOpenNotFindDocumentRegister: false,
      defaultDocumentRegistration: false,
    };
  },
  inject: ["isValidDocument"],
  methods: {
    //popups
    showPopupRegisterCard(data) {
      this.defaultDocumentRegistration = data;
      this.togglePopup("isOpenPopupRegiterCard");
    },
    showPopupNotFindDocumentRegister() {
      this.togglePopup("isOpenNotFindDocumentRegister");
    },
    togglePopup(popupName) {
      this[popupName] = !this[popupName];
    },
    //main logic
    async register() {
      if (this.isValidDocument()) {
        const data = await this.$awn.asyncBlock(
          this.getDefaultDocumentRegiter(),
          () => {},
          () => {}
        );
        if (data === undefined) {
          this.showPopupNotFindDocumentRegister();
        } else {
          if (this.isDataChanged) {
            this.$store.dispatch(`documents/${this.documentId}/save`);
          }
          this.showPopupRegisterCard(data);
        }
      }
    },

    unRegister() {
      const result = confirm(
        this.$t("documentRegistration.areYouSureClearNumerate"),
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
    },
  },
  async getDefaultDocumentRegiter() {
    const data = await this.$awn.asyncBlock(
      this.$axios.get(
        `${dataApi.docFlow.DocumentRegister.DefaultDocumentRegister}${this.documentId}`
      ),
      () => {},
      () => {}
    );
    return data;
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