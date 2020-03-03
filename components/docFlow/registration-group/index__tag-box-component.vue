<template>
  <main class="container container--grid">
    <DxTagBox
    :data-source="dataSource"
    :value.sync="currentValue"
    :show-selection-controls="true"
    :max-displayed-tags="3"
    :show-multi-tag-only="false"
    :on-value-changed="(e) => onValueChanged(e.value)"
    :on-selection-changed="onSelectionChanged"
    :search-enabled="true"
    value-expr="id"
    display-expr="name"
    apply-value-mode="useButtons"
  />
  </main>
</template>
<script>
import DxTagBox from 'devextreme-vue/tag-box';
import dataApi from "~/static/dataApi";

export default {
  components: {
    DxTagBox
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    onValueChanged: {
      type: Function,
      default: () => function() {}
    },
    dataSource: {
      type: Object,
      default: () => {}
    },
    dataGridComponent: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  methods: {
    onSelectionChanged() {
      this.dataGridComponent.updateDimensions();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.container {
  display: block;
}
</style>
