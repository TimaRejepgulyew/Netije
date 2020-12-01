<template>
  <div>
    <spreadSheet
      v-if="file"
      :file="file"
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
  async created() {
    
    if (this.options.handler && this.options.params)
      this.file = await this.options.handler(this, this.options.params);
    console.log(this.file);
    this.$emit("showTitle", this.$t("document.headers.xlsxEditor"));
    this.$emit("loadStatus");
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
      mounted: false,
      file: null
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
