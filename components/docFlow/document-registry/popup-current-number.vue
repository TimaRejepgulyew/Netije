<template>
  <form @submit="handleSubmit">
    <DxForm
      :form-data="store"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="currentNumberStart"
    >
      <DxSimpleItem data-field="value" :editor-options="numberBoxOptions" editor-type="dxNumberBox">
        <DxLabel location="top" :visible="false" />
        <DxRequiredRule :message="$t('translations.fields.currentNumberRequired')" />
      </DxSimpleItem>
      <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="right" />
    </DxForm>
  </form>
</template>
<script>
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
import DxForm, {
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxRangeRule,
  DxPatternRule
} from "devextreme-vue/form";
export default {
  components: {
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxRangeRule,
    DxForm,
    DxButton
  },
  async created() {
    this.store.value = await this.getDataById(this.addressGet);
  },
  computed: {
    addressGet() {
      return `${dataApi.docFlow.DocumentRegistry}CurrentNumber?documentRegisterId=${this.documentRegisterId}`;
    },
    addressPut() {
      return `${dataApi.docFlow.DocumentRegistry}CurrentNumber/${this.documentRegisterId}`;
    }
  },
  props: ["documentRegisterId", "id"],
  data() {
    return {
      store: {
        id: this.documentRegisterId,
        value: null
      },
      saveButtonOptions: {
        height: 40,
        text: this.$t("buttons.save"),
        useSubmitBehavior: true,
        type: "success"
      },
      numberBoxOptions: {
        placeholder: this.$t("translations.fields.currentNumberRequired"),
        min:1
      }
    };
  },
  methods: {
    async getDataById(url) {
      const res = await this.$axios.get(url);
      return res.data;
    },
    notify(msgTxt, msgType) {
      notify(
        {
          message: msgTxt,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        msgType,
        3000
      );
    },
    handleSubmit(e) {
      this.$axios
        .put(this.addressPut, this.store)
        .then(res => {
          this.$emit("popupDisabled");
          this.notify(
            this.$t("translations.headers.updateDocRegistrySucces"),
            "success"
          );
        })
        .catch(e => {
          this.notify(this.$t("translations.fields.addNewRolesError"), "error");
        });
      e.preventDefault();
    }
  }
};
</script>
<style  lang="scss" scoped>
</style>