<template>
  <div class="d-flex">
    <DxTextBox :value="fieldData && fieldData.name" :read-only="true" class="product-name" />

    <DxDropDownButton
      :style="{position:'relative',zIndex:500}"
      :use-select-mode="false"
      :split-button="true"
      :text="$t('buttons.create')"
      :drop-down-options="{ width: 230 }"
      display-expr="text"
      @item-click="()=>{console.log('dawdaw')}"
      @button-click="()=>{console.log('dawdaw')}"
    />
    <DxButton
      :style="{position:'relative'}"
      :visible="fieldData"
      :on-click="()=>openCard('update')"
      icon="info"
      stylingMode="text"
      :hint="$t('translations.fields.moreAbout')"
      :useSubmitBehavior="false"
      type="default"
    ></DxButton>
    <DxButton
      :on-click="()=>openCard('create')"
      icon="plus"
      stylingMode="text"
      :hint="$t('buttons.add')"
      :useSubmitBehavior="false"
      type="default"
    ></DxButton>
  </div>
</template>
<script>
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    DxDropDownButton
  },
  created() {
    console.log(this.fieldData);
  },
  methods: {
    openCard() {
      this.openCard = !this.openCard;
    }
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
