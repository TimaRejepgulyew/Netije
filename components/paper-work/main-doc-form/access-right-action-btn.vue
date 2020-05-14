<template>
  <DxDropDownButton
    :drop-down-options="{ width: 230 }"
    :selectedItemKey="currentAccessRight.id"
    :items="accessRight"
    :useSelectMode="true"
    displayExpr="name"
    keyExpr="id"
    @item-click="onItemClick"
  />
</template>

<script>
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  props: ["accessRight", "currentAccessRight"],
  created() {
    console.log(this.currentAccessRight);
  },
  methods: {
    onItemClick(e) {
      console.log(e);
      //   switch()
    }
  }
};
</script>

<style>
</style>