<template>
  <div>
    <attachmentGroupItem
      @detachLink="detachLink"
      @pasteAttachment="pasteAttachment"
      :group="groupItem"
      v-for="groupItem in attachmentGroups.filter(el=>el.isVisible)"
      :key="groupItem.groupId"
    />
  </div>
</template>

<script>
import attachmentGroupItem from "~/components/workFlow/attachment-group-item.vue";
import attachmentDetailsVue from "../assignment/attachment-details.vue";
export default {
  components: {
    attachmentGroupItem
  },
  props: ["attachmentGroups"],
  methods: {
    detachLink(options) {
      this.$emit("detachLink", options);
    },
    pasteAttachment(options) {
      this.$emit("pasteAttachment", options);
    }
  }
};
</script>

<style>
</style>