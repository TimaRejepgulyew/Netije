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
import QuiсkFilter from "~/infrastructure/constants/quickFilter/taskQuickFilter.js";
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
  props: ["taskQuery"],
  data() {
    return {
      currentQuickFilter: localStorage.hasOwnProperty(
        `taskQuickFilter${this.taskQuery}`
      )
        ? +localStorage.getItem(`taskQuickFilter${this.taskQuery}`)
        : QuiсkFilter.InProcess,
      QuiсkFilterOptions: [
        {
          text: this.$t("task.quickFilter.all"),
          filterKey: QuiсkFilter.All,
          hint: this.$t("task.quickFilter.all"),
        },
        {
          text: this.$t("task.quickFilter.inProcess"),
          filterKey: QuiсkFilter.InProcess,
          hint: this.$t("task.quickFilter.inProcess"),
        },
        {
          text: this.$t("task.quickFilter.expired"),
          filterKey: QuiсkFilter.Expired,
          hint: this.$t("task.quickFilter.expired"),
        },
        {
          text: this.$t("task.quickFilter.monthAgo"),
          filterKey: QuiсkFilter.MonthAgo,
          hint: this.$t("task.quickFilter.monthAgo"),
        },
         {
          text: this.$t("task.quickFilter.today"),
          filterKey: QuiсkFilter.Today,
          hint: this.$t("task.quickFilter.today"),
        },
      ],
    };
  },
  methods: {
    itemClick(e) {
      this.currentQuickFilter = e.itemIndex;
      localStorage.setItem(
        `taskQuickFilter${this.taskQuery}`,
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