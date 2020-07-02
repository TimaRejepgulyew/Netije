<template>
  <div class="d-flex">
    <DxTextBox
      :placeholder="$t('shared.select')"
      :value="fieldData && fieldData.name"
      class="product-name"
    />
    <DxButton
      :visible="showBtn"
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
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton
  },
  props: ["fieldData"],
  computed: {
    showBtn() {
      return this.fieldData?.id
        ? this.$store.getters["permissions/allowReading"](EntityType.Employee)
        : false;
    }
  },
  methods: {
    openCard() {
      this.$emit("openCard");
    },
    valueChanged(data) {
      this.$emit("valueChanged", data);
    }
  }
};
</script>
