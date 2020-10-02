<template>
  <DxForm
    :form-data="params"
    :scrolling-enabled="true"
    class="mt-1"
    ref="form"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxSimpleItem data-field="name" :editor-options="deviceOptions">
      <DxLabel location="left" :text="$t('document.fields.name')" />
      <DxRequiredRule :message="$t('document.validation.nameRequired')" />
    </DxSimpleItem>
    <DxSimpleItem
      data-field="color"
      :editor-options="colorOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel location="left" :text="$t('document.fields.documentKindId')" />
      <DxRequiredRule
        :message="$t('document.validation.documentKindIdRequired')"
      />
    </DxSimpleItem>
  </DxForm>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
  },
  props: ["documentValidatorName"],
  computed: {
    ...mapGetters({ params: "scanner/params" }),
    deviceOptions() {
      return {
        value: this.params.device,
        onValueChanged: (e) => {
          this.setDevice();
        },
      };
    },
    colorOptions() {
      return {
       
        value: this.params.color,
        onValueChanged: (e) => {
          this.setColor();
        },
      };
    },
  },
  methods: {
    ...mapMutations({
      setDevice: "scanner/SET_DEVICE",
      setColor: "scanner/SET_COLOR",
      setExtencion: "scanner/SET_EXTENCION",
    }),
  },
};
</script>

<style>
</style>