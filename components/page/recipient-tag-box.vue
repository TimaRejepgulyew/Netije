<template>
  <DxTagBox
    :data-source="resipientStore"
    :grouped="true"
    :show-selection-controls="true"
    :accept-custom-value="true"
    :on-custom-item-creating="addNewMember"
    :showClearButton="true"
    :value="recipients"
    
    valueExpr="id"
    displayExpr="name"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
  >
    <template #group="{ data }">
      <recipient-list :data="data" />
    </template>
  </DxTagBox>
</template>

<script>
import dataApi from "~/static/dataApi";
import { DxTagBox } from "devextreme-vue";
export default {
  components: {
    DxTagBox
  },
  created() {
    console.log(this.resipientStore);
  },
  props: ["recipients"],
  data() {
    return {
      resipientStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.recipient.list
      })
    };
  },
  methods: {
    addNewMember(args) {
      const newValue = args.text;
      args.customItem = newValue;
      console.log(args);
    }
  }
};
</script>

<style>
</style>