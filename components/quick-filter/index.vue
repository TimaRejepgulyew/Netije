<template>
  <div class="d-flex">
    <RangeFilter @valueChanged="rangeFilterChanged"></RangeFilter>
    <DxDropDownButton
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
      value: localStorage.hasOwnProperty(`quick-filter-${this.storeKey}`)
        ? +localStorage.getItem(`quick-filter-${this.storeKey}`)
        : this.defaultValue,
    };
  },
  methods: {
    rangeFilterChanged(value) {
      console.log(value);
      this.$emit("rangeFilter", value);
    },
    itemClick(e) {
      this.value = e.itemData.id;
      localStorage.setItem(`quick-filter-${this.storeKey}`, this.value);
    },
    valueChanged(value, oldValue) {
      if (value !== null) this.$emit("valueChanged", value);
    },
  },
  watch: {
    value: {
      handler: function (value, oldValue) {
        this.valueChanged(value);
      },
      immediate: true,
    },
  },
};
</script>

<style></style>
