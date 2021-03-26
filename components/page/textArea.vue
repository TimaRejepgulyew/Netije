<template>
  <main>
    <DxTextArea
      :value.sync="currentValue"
      :height="90"
      :on-value-changed="e => onValueChanged(e.value)"
    />
  </main>
</template>
<script>
import { DxTextArea } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxTextArea
  },
  props: {
    value: {
      type: String,
      default: () => ""
    },
    onValueChanged: {
      type: Function,
      default: () => function() {}
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  },
  methods: {}
};
</script>

