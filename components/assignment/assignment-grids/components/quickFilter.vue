<template>
  <DxButtonGroup
    slot="toolbar"
    :selected-item-keys="[currentQuickFilter]"
    :items="QuiсkFilterOptions"
    key-expr="filterKey"
    styling-mode="text"
    @item-click="itemClick"
  />
</template>

<script>
import QuiсkFilter from "~/infrastructure/constants/assignmentQuickFilter.js";
import { DxButtonGroup } from "devextreme-vue";
function setQuickfilter(value, oldvalue, context) {
  if (value !== null) {
    context.$emit("getQuickFilter", value);
  }
}
export default {
  components: {
    DxButtonGroup,
  },
  props: ["assignmentQuery"],
  data() {
    return {
      currentQuickFilter:
        +localStorage.getItem(`assignmentQuickFilter${this.assignmentQuery}`) ||
        QuiсkFilter.New,
      QuiсkFilterOptions: [
        {
          text: this.$t("assignment.quickFilter.all"),
          filterKey: QuiсkFilter.All,
          hint: this.$t("assignment.quickFilter.all"),
        },
        {
          text: this.$t("assignment.quickFilter.new"),
          filterKey: QuiсkFilter.New,
          hint: this.$t("assignment.quickFilter.new"),
        },
        {
          text: this.$t("assignment.quickFilter.inProcess"),
          filterKey: QuiсkFilter.InProcess,
          hint: this.$t("assignment.quickFilter.inProcess"),
        },
        {
          text: this.$t("assignment.quickFilter.expired"),
          filterKey: QuiсkFilter.Expired,
          hint: this.$t("assignment.quickFilter.expired"),
        },
        {
          text: this.$t("assignment.quickFilter.monthAgo"),
          filterKey: QuiсkFilter.MonthAgo,
          hint: this.$t("assignment.quickFilter.monthAgo"),
        },
      ],
    };
  },
  methods: {
    itemClick(e) {
      this.currentQuickFilter = e.itemIndex;
      localStorage.setItem(
        `assignmentQuickFilter${this.assignmentQuery}`,
        this.currentQuickFilter
      );
    },
  },
  watch: {
    currentQuickFilter: {
      handler: function (value, oldValue) {
        setQuickfilter(value, oldValue, this);
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>
