<template>
  <div>
    <pdf-file-reader :id="id" :lastVersion="lastVersion" />
  </div>
</template>

<script>
import pdfFileReader from "~/components/file-readers/pdf-reader/index.vue";
export default {
  components: {
    pdfFileReader
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    lastVersion() {
      return this.options.versionId ? false : true;
    },
    id() {
      return this.lastVersion
        ? this.options.documentId
        : this.options.versionId;
    }
  },
  methods: {},
  created() {
    this.$emit("loadStatus");
  }
};
</script>
