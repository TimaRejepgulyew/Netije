<template>
  <div v-if="data" class="message d-flex">
    <label class="message__label align-content-center"
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
