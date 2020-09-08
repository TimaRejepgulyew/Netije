<template>
  <DxButtonGroup
    slot="toolbar"
    :selected-item-keys="[activeFilter]"
    :items="QuiсkFilterOptions"
    key-expr="filterKey"
    styling-mode="text"
    @item-click="itemClick"
  />
</template>

<script>
import QuiсkFilter from "~/infrastructure/constants/assignmentQuickFilter.js";
import { DxButtonGroup } from "devextreme-vue";
export default {
  components: {
    DxButtonGroup,
  },
  props: ["key"],
  created() {
    if (this.currentQuickFilter) {
      this.$emit("getQuickFilter", this.currentQuickFilter);
    }
  },
  data() {
    return {
      currentQuickFilter: localStorage.getItem(
        `assignmentQuickFilter${this.key}` || null
      ),
    };
  },
  methods: {
    setQuickfilter(filter) {},
  },
};
</script>

<style>
</style>
