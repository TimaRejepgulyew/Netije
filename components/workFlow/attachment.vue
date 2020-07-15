<template>
  <div>
    <attachmentGroupItem
      @detach="detach"
      @pasteAttachment="pasteAttachment"
      :group="groupItem"
      v-for="groupItem in attachmentGroups.filter(el=>el.isVisible)"
      :key="groupItem.groupId"
    />
  </div>
</template>

<script>
import attachmentGroupItem from "~/components/workFlow/attachment-group-item.vue";
export default {
  components: {
    attachmentGroupItem
  },
  props: ["attachmentGroups"],
  methods: {
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    pasteAttachment(options) {
      this.$emit("pasteAttachment", options);
    }
  }
};
</script>

<style>
</style>