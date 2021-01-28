<template>
  <div class="d-flex align-center">
    <DxDateBox
      :placeholder="$t('shared.begining')"
      :useMaskBehavior="true"
      :allowClearing="true"
      :openOnFieldClick="true"
      type="datetime"
      id="fromValue"
      v-model="fromValue"
      :max="new Date().getTime()"
      dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
      styling-mode="outlined"
    ></DxDateBox>
    <DxDateBox
      :placeholder="$t('shared.end')"
      :useMaskBehavior="true"
      :openOnFieldClick="true"
      :allowClearing="true"
      type="datetime"
      name="fromValue"
      :min="fromValue"
      :max="new Date().getTime()"
      v-model="beforeValue"
      dateSerializationFormat="yyyy-MM-ddTHH:mm:ss"
      styling-mode="outlined"
    ></DxDateBox>
  </div>
</template>

<script>
import { DxDateBox } from "devextreme-vue/date-box";

export default {
  props: {
    storeKey: {},
  },
  components: {
    DxDateBox,
  },
  data() {
    return {
      isVisibleBeforeValueInput: false,
      fromValue: null,

      beforeValue: null,
    };
  },
  methods: {
    showEndInput() {
      this.isVisibleBeforeValueInput = true;
    },
    hideEndInput() {
      this.isVisibleBeforeValueInput = false;
    },
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
      else if (this.fromValue) {
        return partFromValue;
      } else if (this.beforeValue) {
        return partBeforeValue;
      }
      return null;
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