<template>
  <div class="d-flex align-center">
    {{ this.$t("shared.from") }}:
    <DxDateBox
      :useMaskBehavior="true"
      :openOnFieldClick="true"
      type="datetime"
      name="fromValue"
      v-model="fromValue"
      dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
      styling-mode="outlined"
    ></DxDateBox
    >/ {{ this.$t("shared.before") }}:
    <DxDateBox
      :useMaskBehavior="true"
      :openOnFieldClick="true"
      type="datetime"
      name="fromValue"
      v-model="beforeValue"
      dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
      styling-mode="outlined"
    ></DxDateBox>
  </div>
</template>

<script>
import { DxDateBox } from "devextreme-vue/date-box";

export default {
  components: {
    DxDateBox,
  },
  created() {},
  data() {
    return {
      fromValue: localStorage.hasOwnProperty(
        `quick-filter-from-value-${this.storeKey}`
      )
        ? localStorage.getItem(`quick-filter-from-value-${this.storeKey}`)
        : null,

      beforeValue: localStorage.hasOwnProperty(
        `quick-filter-before-value-${this.storeKey}`
      )
        ? localStorage.getItem(`quick-filter-before-value-${this.storeKey}`)
        : null,
    };
  },
  computed: {
    filter() {
      const partFromValue = this.fromValue
        ? ["created", ">=", this.fromValue]
        : null;
      const partBeforeValue = this.beforeValue
        ? ["created", "<=", this.beforeValue]
        : null;
      if (this.fromValue && this.beforeValue)
        return [partFromValue, "and", partBeforeValue];
    },
  },
  watch: {
    fromValue(newValue, oldValue) {
      if (newValue !== oldValue)
        localStorage.setItem(
          `quick-filter-from-value-${this.storeKey}`,
          newValue
        );
      this.$emit("valueChanged", this.filter);
    },
    beforeValue(newValue, oldValue) {
      if (newValue !== oldValue)
        localStorage.setItem(
          `quick-filter-before-value-${this.storeKey}`,
          newValue
        );
      this.$emit("valueChanged", this.filter);
    },
  },
};
</script>

<style>
</style>