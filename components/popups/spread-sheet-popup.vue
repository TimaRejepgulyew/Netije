<template>
  <div>
    <spreadSheet
      v-if="file && mounted"
      :file="file"
      :isNew="options.isNew"
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
      type: Object,
    },
  },
  async created() {
    if (!this.options.isNew) {
      if (this.options.handler && this.options.params)
        this.file = await this.options.handler(this, this.options.params);
    } else {
      this.file = true;
    }
    this.$emit("showTitle", this.$t("document.headers.xlsxEditor"));
    this.$emit("loadStatus");
  },
  mounted() {
    setTimeout(() => {
      this.mounted = true;
    }, 500);
  },
  data() {
    return {
      mounted: false,
      file: null,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", { ...params, extension: ".xlsx" });
      this.close();
    },
  },
};
</script>

<style></style>
