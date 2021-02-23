<template>
  <div class="d-flex">
    <DxTextBox
      :read-only="readOnly"
      :placeholder="$t('shared.select')"
      :value="fieldData && fieldData.name"
      class="product-name"
      @focusIn="openField"
    />
    <DxButton
      :visible="canShowInfo"
      :on-click="openCard"
      icon="info"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="false"
      type="default"
    />
    <DxButton
      :disabled="readOnly"
      :on-click="openGrid"
      icon="more"
      stylingMode="text"
      :useSubmitBehavior="false"
      type="default"
    />
  </div>
</template>
<script>
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
  },
  props: ["fieldData", "readOnly"],
  computed: {
    canShowInfo() {
      return this.fieldData ? true : false;
    },
  },
  methods: {
    openField() {
      this.$emit("focusIn");
      if (!this.readOnly) this.$emit("openFields");
    },
    openGrid() {
      this.$emit("openGrid");
    },
    openCard() {
      this.$emit("openCard", this.fieldData);
    },
  },
};
</script>
