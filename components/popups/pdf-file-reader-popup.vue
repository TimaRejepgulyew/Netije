<template>
  <div>
    <pdf-file-reader :id="options.id" :lastVersion="options.lastVersion" />
  </div>
</template>

<script>
import pdfFileReader from "~/components/file-readers/pdf-reader/index.vue";
export default {
  components: {
    pdfFileReader,
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
  async created() {
    this.$emit("loadStatus");
  },
};
</script>