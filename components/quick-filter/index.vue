<template>
  <DxButtonGroup
    :selected-item-keys="[value]"
    :items="dataSource"
    key-expr="id"
    styling-mode="text"
    @item-click="itemClick"
  />
</template>

<script>
import { DxButtonGroup } from "devextreme-vue";
export default {
  components: {
    DxButtonGroup
  },
  props: {
    dataSource: {},
    defaultValue: {
      default: 0
    },
    storeKey: {}
  },
  data() {
    return {
      value: localStorage.hasOwnProperty(`quick-filter-${this.storeKey}`)
        ? +localStorage.getItem(`quick-filter-${this.storeKey}`)
        : this.defaultValue
    };
  },
  methods: {
    itemClick(e) {
      this.value = e.itemIndex;
      localStorage.setItem(`quick-filter-${this.storeKey}`, this.value);
    },
    valueChanged(value, oldValue) {
      if (value !== null) this.$emit("valueChanged", value);
    }
  },
  watch: {
    value: {
      handler: function(value, oldValue) {
        this.valueChanged(value);
      },
      immediate: true
    }
  }
};
</script>

<style></style>
