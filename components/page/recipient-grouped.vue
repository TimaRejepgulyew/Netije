<template>
  <span class="d-flex align-center js-flex-start">
    <resipient-icon class="selectbox--icon" :type="data.key"></resipient-icon>
    {{showGroupCaption(data.key)}}
  </span>
</template>

<script>
import ResipientType from "~/infrastructure/constants/resipientType.js";
import resipientIcon from "~/components/page/resipient-icon.vue";
export default {
  components: {
    resipientIcon
  },
  props: ["data"],
  methods: {
    showGroupCaption(recipientType) {
      switch (recipientType) {
        case ResipientType.BusinessUnit:
          return this.$t("menu.businessUnit");
        case ResipientType.Department:
          return this.$t("menu.department");
        case ResipientType.Role:
          return this.$t("menu.roles");
        case ResipientType.Group:
          return this.$t("menu.group");
           case ResipientType.User:
          return this.$t("menu.user");
        case ResipientType.Employee:
          return this.$t("menu.employee");
      }
    }
  }
};
</script>

<style>
</style>