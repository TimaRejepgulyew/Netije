<template>
  <attachmentAccessRightDialog
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
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", { data, updated: true });
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