<template>
  <div>
    <div
      v-for="groupItem in attachmentGroups.filter(el => el.isVisible)"
      :key="groupItem.groupId"
    >
      <component
        :is="componentByAttachmentType(groupItem.attachmentGroupType)"
        :assignmentId="assignmentId"
        @detach="detach"
        @pasteAttachment="pasteAttachment"
        @reloadAttachment="reloadAttachment"
        :group="groupItem"
      />
    </div>
  </div>
</template>

<script>
import GroupAttachmentType from "../infrastructure/constants/groupAttachmentType.js";
export default {
  components: {
    attachmentGroupDocument: () =>
      import("~/components/workFlow/attachment/attachment-group-document.vue"),
    attachmentGroupTask: () =>
      import("~/components/workFlow/attachment/attachment-group-task.vue")
  },
  name: "attachment",
  props: ["attachmentGroups", "assignmentId"],
  methods: {
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    pasteAttachment(options) {
      this.$emit("pasteAttachment", options);
    },
    reloadAttachment() {
      this.$emit("reloadAttachment");
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

<style></style>
