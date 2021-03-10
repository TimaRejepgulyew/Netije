<template>
  <DxButton
    :visible="visible"
    :on-click="markAsUnread"
    :icon="unreadIcon"
    :hint="$t('buttons.markAsUnread')"
    :useSubmitBehavior="false"
  ></DxButton>
</template>
<script>
import unreadIcon from "~/static/icons/iconAssignment/mark-as-unread.svg";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxButton,
  },
  props: {
    assignmentId: {
      type: Number,
    },
  },
  data() {
    return {
      unreadIcon,
    };
  },
  methods: {
    markAsUnread() {
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.assignment.MarkAsUnread, {
          assignmentId: this.assignmentId,
        }),
        () => {
          this.$awn.success();
          this.$emit("onClose");
        }
      );
    },
  },
  computed: {
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    visible() {
      return this.inProcess && this.canUpdate;
    },
  },
};
</script>

<style></style>
