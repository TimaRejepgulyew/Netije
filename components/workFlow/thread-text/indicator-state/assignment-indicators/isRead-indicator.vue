<template>
  <div class="d-flex task__item item--status">

    <img class="icon--status" :src="isRead.icon" />
    {{isRead.text}}
  </div>
</template>

<script>
import unreadIcon from "~/static/icons/status/unread.svg";
import readIcon from "~/static/icons/status/read.svg";
export default {
  props: ["data"],
  computed: {
    isRead() {
      if (this.data.isRead)
        return { text: this.$t("shared.read"), icon: readIcon };
      else return { text: this.$t("shared.unread"), icon: unreadIcon };
    },
  },
};
</script>

<style>
</style>
