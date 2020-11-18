<template>
  <div class="d-flex">
    <DxTextBox
      :read-only="readOnly"
      :placeholder="$t('shared.select')"
      :value="fieldData && fieldData.name"
      class="product-name"
    />
    <DxButton
      :visible="canShowInfo"
      :on-click="this.openCard"
      icon="info"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="false"
      type="default"
    ></DxButton>
  </div>
</template>
<script>
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton
  },
  props: ["fieldData", "readOnly"],
  computed: {
    canShowInfo() {
      return this.fieldData ? true : false;
    }
  },
  methods: {
    openCard() {
      this.$emit("openCard", this.fieldData);
    },
    valueChanged(data) {
      this.$emit("valueChanged", data);
    }
  }
};
</script>
