<template>
  <div>
    <pdf-file-reader v-if="id" :id="id" :lastVersion="lastVersion" />
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
      return this.options.params.versionId ? false : true;
    },
    id() {
      return this.lastVersion
        ? this.options.params.documentId
        : this.options.params.versionId;
    }
  },
  methods: {},
  created() {
    this.$emit("loadStatus");
  }
};
</script>
