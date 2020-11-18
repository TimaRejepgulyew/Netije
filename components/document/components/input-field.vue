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
      :on-click="openCard"
      icon="info"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="false"
      type="default"
    ></DxButton>
    <showGridBtn
      @selectedDocument="valueChanged"
      :readOnly="readOnly"
      :dataSourceQuery="dataSourceQuery"
      :dataSourceFilter="dataSourceFilter"
    />
  </div>
</template>
<script>
import showGridBtn from "~/components/document/components/show-grid-btn.vue";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    showGridBtn
  },
  props: ["fieldData", "readOnly", "dataSourceQuery", "dataSourceFilter"],
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
