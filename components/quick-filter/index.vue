<template>
  <div class="d-flex">
    <RangeFilter
      :storeKey="storeKey"
      @valueChanged="rangeFilterChanged"
    ></RangeFilter>
    <DxDropDownButton
      :disabled="disabledQuickFilter"
      :useSelectMode="true"
      styling-mode="text"
      display-expr="text"
      width="150"
      key-expr="id"
      :selectedItemKey="value"
      :items="dataSource"
      @item-click="itemClick"
    />
  </div>
</template>

<script>
import RangeFilter from "./components/range.vue";
import DxDropDownButton from "devextreme-vue/drop-down-button";
export default {
  components: {
    DxDropDownButton,
    RangeFilter,
  },
  props: {
    dataSource: {},
    defaultValue: {
      default: 0,
    },
    storeKey: {},
  },
  data() {
    return {
      disabledQuickFilter: false,
      rangeFilter: null,
      value: localStorage.hasOwnProperty(`quick-filter-${this.storeKey}`)
        ? +localStorage.getItem(`quick-filter-${this.storeKey}`)
        : this.defaultValue,
    };
  },
  methods: {
    rangeFilterChanged(rangeFilter) {
      this.rangeFilter = rangeFilter;
      if (rangeFilter) {
        this.disabledQuickFilter = true;

        const quickFilterAll = this.dataSource.find((el) => el.value === "All");
        this.value = quickFilterAll.id;
        localStorage.setItem(`quick-filter-${this.storeKey}`, this.value);
      } else {
        this.disabledQuickFilter = false;
      }
    },
    itemClick(e) {
      this.value = e.itemData.id;
      localStorage.setItem(`quick-filter-${this.storeKey}`, this.value);
    },
    valueChanged(value, oldValue) {
      this.$emit("valueChanged", this.value, this.rangeFilter);
    },
  },
  watch: {
    rangeFilter: {
      handler(value, oldValue) {
        this.valueChanged(value);
      },
      immediate: true,
    },
    value: {
      handler(value, oldValue) {
        this.valueChanged(value);
      },
      immediate: true,
    },
  },
};
</script>

<style></style>
