<template>
  <searching-setting
    :value="options.searchingType"
    @valueChanged="valueChanged"
  />
</template>

<script>
import searchingSetting from "~/components/Layout/searching-panel/components/search-setting.vue";
export default {
  components: {
    searchingSetting
  },
  props: {
    options: {
      type: Object
    }
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    }
  },
  async created() {
    this.$emit("loadStatus");
    this.$emit("showTitle", this.$t("searching.searchSetting"));
  }
};
</script>
