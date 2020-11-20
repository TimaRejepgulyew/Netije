<template>
  <attachmentAccessRightDialog
    :maxOperation="options.maxOperation"
    @close="close"
    @selected="valueChanged"
  />
</template>

<script>
import attachmentAccessRightDialog from "~/components/access-right/attachment-access-right-dialog.vue";
export default {
  components: {
    attachmentAccessRightDialog,
  },
  props: {
    options: {
      type: Object,
    },
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
  async created() {
    this.$emit("loadStatus");
    this.$emit("showTitle", this.$t("shared.confirm"));
  },
};
</script>