<template>
  <div class="d-flex align-center">
    <DxDateBox
      :showClearButton="true"
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
      :showClearButton="true"
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
  methods: {
    fromValueChanged(value) {
      if (value === null) {
        localStorage.setItem(`quick-filter-from-value-${this.storeKey}`, "");
      } else {
        localStorage.setItem(`quick-filter-from-value-${this.storeKey}`, value);
      }
      this.$emit("valueChanged", this.filter);
    },
    beforeValueChanged(value) {
      if (value === null) {
        localStorage.setItem(`quick-filter-before-value-${this.storeKey}`, "");
      } else {
        localStorage.setItem(
          `quick-filter-before-value-${this.storeKey}`,
          value
        );
      }
      this.$emit("valueChanged", this.filter);
    },
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
    fromValue: {
      handler(value) {
        this.fromValueChanged(value);
      },
    },
    beforeValue: {
      handler(value) {
        this.beforeValueChanged(value);
      },
    },
    filter: {
      handler(newValue, oldValue) {
        this.$emit("valueChanged", this.filter);
      },
      immediate: true,
    },
  },
};
</script>

<style>
</style>