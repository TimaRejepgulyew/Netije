<template>
  <div class="d-flex">
    <documentIcon :extension="item.extension" />
    <div>{{item.name}}</div>
    <actionBtn :attachment="item" />
  </div>
</template>

<script>
import actionBtn from "~/components/workFlow/attachment-action-btn.vue";
import documentIcon from "~/components/page/document-icon.vue";
export default {
  components: {
    documentIcon,
    actionBtn
  },
  prop: ["item"]
};
</script>

<style>
</style>