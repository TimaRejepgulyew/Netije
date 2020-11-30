<template>
  <div>
    <spreadSheet
      v-if="mounted"
      :params="options.params"
      :readOnly="options.readOnly"
      @valueChanged="valueChanged"
      @onClose="close"
    />
  </div>
</template>

<script>
import spreadSheet from "~/components/file-readers/spread-sheet/index.vue";
import dataApi from "~/static/dataApi";

export default {
  components: { spreadSheet },
  name: "spread-sheet-popup",
  props: {
    options: {
      type: Object
    }
  },
  mounted() {
    setTimeout(() => {
      this.mounted = true;
      this.$emit("showTitle", this.$t("document.headers.documentEditor"));
      this.$emit("loadStatus");
    }, 500);
  },
  data() {
    return {
      mounted: false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", params);
    }
  }
};
</script>

<style></style>
