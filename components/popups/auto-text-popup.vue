<template>
  <div>
    <autoTextList @valueChanged="valueChanged" />
  </div>
</template>

<script>
import autoTextList from "~/components/autocomplete-text/list/index.vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    autoTextList
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      data: null
    };
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
      this.$emit("close");
    }
  },
  async created() {
    this.$emit("loadStatus");
    this.$emit("showTitle", this.$t("companyStructure.additionally.phraseTemplates"));
  }
};
</script>

<style>
</style>