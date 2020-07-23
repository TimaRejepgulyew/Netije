<template>
  <div>
    <div v-for="groupItem in attachmentGroups.filter(el=>el.isVisible)" :key="groupItem.groupId">
      <component
        :is="componentByAttachmentType(groupItem.attachmentGroupType)"
        :assignmentId="assignmentId"
        @detach="detach"
        @pasteAttachment="pasteAttachment"
        :group="groupItem"
      />
    </div>
  </div>
</template>

<script>
import attachmentGroupDocument from "~/components/workFlow/attachment-group-document.vue";
import attachmentGroupTask from "~/components/workFlow/attachment-group-task.vue";
import GroupAttachmentType from "~/infrastructure/constants/groupAttachmentType.js";
export default {
  components: {
    attachmentGroupDocument,
     attachmentGroupTask
  },
  props: ["attachmentGroups", "assignmentId"],
  methods: {
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    pasteAttachment(options) {
      this.$emit("pasteAttachment", options);
    },
    componentByAttachmentType(attachmentGroupType) {
      switch (attachmentGroupType) {
        case GroupAttachmentType.Document:
          return "attachmentGroupDocument";
        case GroupAttachmentType.Task:
          return "attachmentGroupTask";
      }
    }
  },
  computed: {}
};
</script>

<style>
</style>