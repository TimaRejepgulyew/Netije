<template>
  <span class="group-title">
    <resipient-icon  :type="data.key"></resipient-icon>
    <span >{{showGroupCaption(data.key)}}</span>
  </span>
</template>

<script>
import ResipientType from "~/infrastructure/constants/resipientType.js";
import resipientIcon from "~/components/page/resipient-icon.vue";
export default {
  components: {
    resipientIcon,
  },
  props: ["data"],
  methods: {
    showGroupCaption(recipientType) {
      switch (recipientType) {
        case ResipientType.BusinessUnit:
          return this.$t("recipientType.businessUnit");
        case ResipientType.Department:
          return this.$t("recipientType.department");
        case ResipientType.Role:
          return this.$t("recipientType.role");
        case ResipientType.RegistrationGroup:
          return this.$t("recipientType.registrationGroup");
        case ResipientType.Employee:
          return this.$t("recipientType.employee");
        case ResipientType.SystemUser:
          return this.$t("recipientType.systemUser");
      }
    },
  },
};
</script>

<style>
.group-title{

}
</style>
