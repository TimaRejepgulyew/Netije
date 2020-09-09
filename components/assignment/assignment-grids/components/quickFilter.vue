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
      QuiсkFilterOptions: [
        {
          text: this.$t("assignment.quickfilter.all"),
          filterKey: QuiсkFilter.All,
          hint: this.$t("assignment.quickfilter.all"),
        },
        {
          text: this.$t("assignment.quickfilter.new"),
          filterKey: QuiсkFilter.New,
          hint: this.$t("assignment.quickfilter.new"),
        },
        {
          text: this.$t("assignment.quickfilter.inProcess"),
          filterKey: QuiсkFilter.InProcess,
          hint: this.$t("assignment.quickfilter.inProcess"),
        },
        {
          text: this.$t("assignment.quickfilter.expired"),
          filterKey: QuiсkFilter.Expired,
          hint: this.$t("assignment.quickfilter.expired"),
        },
        {
          text: this.$t("buttons.monthAgo"),
          filterKey: QuiсkFilter.MonthAgo,
          hint: this.$t("buttons.monthAgo"),
        },
      ],
    };
  },
  methods: {
    setQuickfilter(filter) {},
  },
};
</script>

<style>
</style>
