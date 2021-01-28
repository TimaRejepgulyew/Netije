<template>
  <div v-if="data" class="message d-flex  ">
    <i class=" dx-icon-info message__icon"></i>
    <label class="message__label "
      >{{ $t("task.confirm.abortingReason") }}:</label
    >

    <div class="message__body cursive">{{ data }}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: String
  }
};
</script>

<style></style>
