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
        case ResipientType.ResistrationGroup:
          return this.$t("recipientType.registrationGroup");
        case ResipientType.Employee:
          return this.$t("recipientType.employee");
        case ResipientType.SistemUser:
          return this.$t("recipientType.sistemUser");
      }
    },
  },
};
</script>

<style>
.group-title{

}
</style>
