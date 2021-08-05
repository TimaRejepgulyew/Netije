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
      :visible="showBtn"
      :on-click="showCard"
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
    DxButton,
  },
  props: ["fieldData", "readOnly"],
  computed: {
    showBtn() {
      return this.fieldData?.id
        ? this.$store.getters["permissions/allowReading"](
            EntityType.Employee
          ) && !this.fieldData.isSystem
        : false;
    },
  },
  methods: {
    focusIn() {
      this.$emit("focusIn");
    },
    openField() {
      this.$emit("focusIn");
      if (!this.readOnly) this.$emit("openFields");
    },
    showCard() {
      this.$emit("showCard");
    },
    valueChanged(data) {
      this.$emit("valueChanged", data);
    },
  },
};
</script>
