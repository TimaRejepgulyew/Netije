<template>
  <div>
    <pdf-file-reader/>
  </div>
</template>

<script>
import pdfFileReader from "~/components/file-readers/pdf-reader.vue";
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
    return {
    };
  },
  methods: {},
  async created() {
    this.$emit("loadStatus");
  },
};
</script>