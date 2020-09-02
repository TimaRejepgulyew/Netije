<template>
  <div class="d-flex align-content-center info-message" v-if="!isElectronicAcquaintance">
    <i class="dx-icon-info info-message__icon"></i>

    <div class="info-message__text">
      <div>{{$t("shared.explanation")}}</div>
      <div>{{$t("task.message.acquaintDocumentMessage")}}</div>
    </div>
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

<style lang="scss" >
.info-message {
  
  font-size: 1.1em;
  font-weight: 500px;
  font-style: italic;
  .info-message__icon {
    padding: 5px;
    display: inline-flex;
    align-self: center;
    font-size: 25px;
  }
}
</style>
