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
      :editor-options="colorOptions"
      editor-type="dxSelectBox"
    >
      <DxLabel :text="$t('scanner.fields.color')" />
      <DxRequiredRule :message="$t('scanner.validation.colorRequired')" />
    </DxSimpleItem>
    <DxSimpleItem
      data-field="extencion"
      :editor-options="extencionOptions"
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
      colorStore: [
        { name: this.$t("scanner.coloured"), id: 0 },
        { name: "blackWhite", id: 1 },
      ],
      extencionStore: ["1280x 870x", "800x 640x", "1600x 1100x"],
    };
  },
  computed: {
    ...mapGetters({ params: "scanner/params", deviceStore: "scanner/devices" }),
    deviceOptions() {
      return {
        dataSource: this.deviceStore,
        value: this.params.device,
        onValueChanged: (e) => {
          console.log(e.value);
          this.setDevice(e.value);
        },
      };
    },
    colorOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        searchEnabled: true,
        dataSource: this.colorStore,
        value: this.params.color,
        onValueChanged: (e) => {
          console.log(e.value);
          this.setColor(e.value);
        },
      };
    },
    extencionOptions() {
      return {
        searchEnabled: true,
        dataSource: this.extencionStore,
        value: this.params.extencion,
        onValueChanged: (e) => {
          console.log(e.value);
          this.setExtencion(e.value);
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