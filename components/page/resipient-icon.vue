<template>
  <img class="icon--type" :src="iconByType" />
</template>

<script>
import ResipientType from "~/infrastructure/constants/resipientType.js";
export default {
  props: ["type"],
  computed: {
    iconByType() {
      switch (this.type) {
        case ResipientType.BusinessUnit:
          return require("~/static/icons/recipient-type/architecture-and-city.svg");
        case ResipientType.Department:
          return require("~/static/icons/recipient-type/men.svg");
        case ResipientType.Role:
          return require("~/static/icons/recipient-type/supporter.svg");
        case ResipientType.Group:
          return require("~/static/icons/recipient-type/x-men.svg");
        case ResipientType.Employee:
          return require("~/static/icons/recipient-type/business.svg");
        default:
          throw "not this type icon resipient";
      }
    }
  }
};
</script>

<style scoped>
.select--box.icon--type {
  margin-right: 10px;
  max-width: 20px;
  height: 10px;
}
.icon--type {
  
  margin-right: 10px;
  width: 30px;
  height: 100%;
}
</style>