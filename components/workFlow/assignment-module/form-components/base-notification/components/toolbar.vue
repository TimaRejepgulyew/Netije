<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        locateInMenu="auto"
        template="createChildTask"
        location="before"
      />
      <DxItem location="after" template="importanceIndicator" />
      <template #createChildTask>
        <slot name="createChildTask" />
      </template>
      <template #importanceIndicator>
        <slot name="importanceIndicator" />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import toolbarMixin from "../../../infrastructure/mixins/toolbar.js";
export default {
  mixins: [toolbarMixin],
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
