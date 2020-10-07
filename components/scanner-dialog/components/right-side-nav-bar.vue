<template>
  <DxForm
    :scrolling-enabled="true"
    class="mt-1"
    ref="form"
    label-location="top"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxSimpleItem
      data-field="deviсe"
      :editor-options="deviceOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel :text="$t('scanner.fields.device')" />
      <DxRequiredRule :message="$t('scanner.validation.deviceRequired')" />
    </DxSimpleItem>
    <DxSimpleItem
      data-field="color"
      :editor-options="modeOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel :text="$t('scanner.fields.color')" />
      <DxRequiredRule :message="$t('scanner.validation.colorRequired')" />
    </DxSimpleItem>
    <DxSimpleItem
      data-field="dpi"
      :editor-options="dpiOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel :text="$t('scanner.fields.extencion')" />
      <DxRequiredRule :message="$t('scanner.validation.extencionRequired')" />
    </DxSimpleItem>
    <DxButtonItem
      :button-options="saveButtonOptions"
      horizontal-alignment="right"
    />
  </DxForm>
</template>

<script>
import scanner from "~/static/icons/scanner/scanner.svg";
import { mapActions, mapGetters, mapMutations } from "vuex";
import DxForm, {
  DxButtonItem,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxButtonItem,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
  },
  props: ["documentValidatorName"],
  created() {
    console.log(this.params);
  },
  data() {
    return {
      saveButtonOptions: {
        height: 40,
        icon: scanner,
        useSubmitBehavior: true,
        text: this.$t("buttons.scanner"),
      },
    };
  },
  computed: {
    ...mapGetters({
      params: "scanner/params",
      deviceStore: "scanner/currentDevice",
      devicesStore: "scanner/devices",
    }),
    deviceOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        dataSource: this.devicesStore,
        value: this.params.device,
        onValueChanged: (e) => {
          this.setDpi(null);
          this.setMode(null);
          this.setDevice(e.value);
        },
        onSelectionChanged: (e) => {
          this.setCurrentDevice(e.selectedItem);
        },
      };
    },
    modeOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        searchEnabled: true,
        dataSource: this.deviceStore?.mode,
        value: this.params.mode,
        onValueChanged: (e) => {
          console.log(e.value);
          this.setMode(e.value);
        },
      };
    },
    dpiOptions() {
      return {
        searchEnabled: true,
        dataSource: this.deviceStore?.dpi,
        value: this.params.dpi,
        onValueChanged: (e) => {
          console.log(e.value);
          this.setDpi(e.value);
        },
      };
    },
  },
  methods: {
    setDeviceParamsStore({ dpi, mode }) {
      this.dpiStore = dpi;
      this.modeStore = mode;
    },
    ...mapMutations({
      setCurrentDevice: "scanner/SET_CURRENT_DEVICE",
      setDpi: "scanner/SET_DPI",
      setMode: "scanner/SET_MODE",
      setDevice: "scanner/SET_DEVICE",
    }),
  },
};
</script>