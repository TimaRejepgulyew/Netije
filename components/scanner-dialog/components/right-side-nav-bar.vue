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
      data-field="id"
      :editor-options="deviceOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel :text="$t('scanner.fields.device')" />
      <DxRequiredRule :message="$t('scanner.validation.deviceRequired')" />
    </DxSimpleItem>
    <DxSimpleItem
      data-field="mode"
      :editor-options="modeOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel :text="$t('scanner.fields.mode')" />
      <DxRequiredRule :message="$t('scanner.validation.modeRequired')" />
    </DxSimpleItem>
    <DxSimpleItem
      data-field="size"
      :editor-options="sizeOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel :text="$t('scanner.fields.size')" />
      <DxRequiredRule :message="$t('scanner.validation.sizeRequired')" />
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
import DataSource from "devextreme/data/data_source";
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
        valueExpr: "id",
        displayExpr: "name",
        dataSource: this.devicesStore,
        value: this.params.id,
        onValueChanged: (e) => {
          this.setSize(null);
          this.setDpi(null);
          this.setMode(null);
          this.setDeviceId(e.value);
        },
        onSelectionChanged: (e) => {
          this.setCurrentDevice(e.selectedItem);
        },
      };
    },
    modeOptions() {
      return {
        searchEnabled: true,
        dataSource: this.deviceStore?.mode,
        value: this.params.mode,
        onValueChanged: (e) => {
          console.log(e.value);
          this.setMode(e.value);
        },
      };
    },
    sizeOptions() {
      return {
        dataSource: this.deviceStore?.size,
        value: this.params.size,
        onValueChanged: (e) => {
          console.log(e.value);
          this.setSize(e.value);
        },
      };
    },
    dpiOptions() {
      return {
        searchEnabled: true,
        dataSource: new DataSource({
          paginate: true,
          pageSize: 10,
          loadMode: "raw",
          load: () => this.deviceStore?.dpi,
        }),
        value: this.params.dpi,
        onValueChanged: (e) => {
          console.log(e.value);
          this.setDpi(e.value);
        },
      };
    },
  },
  methods: {
    ...mapMutations({
      setCurrentDevice: "scanner/SET_CURRENT_DEVICE",
      setDpi: "scanner/SET_DPI",
      setMode: "scanner/SET_MODE",
      setDeviceId: "scanner/SET_DEVICE",
      setSize: "scanner/SET_SIZE",
    }),
  },
};
</script>