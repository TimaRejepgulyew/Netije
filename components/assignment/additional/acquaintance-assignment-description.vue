<template>
  <div v-if="!isElectronicAcquaintance">
    <div>{{$t("shared.explanation")}}</div>
    <div>{{$t("task.message.acquaintDocumentMessage")}}</div>
  </div>
</template>

<script>
export default {
  props: ["assignmentId"],
  computed: {
    isElectronicAcquaintance() {
      return (
        this.$store.getters[`assignments/${this.assignmentId}/assignment`]
          .isElectronicAcquaintance !== false
      );
    },
  },
};
</script>

<style>
</style>