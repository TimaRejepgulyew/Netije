<template>
  <div class="d-flex justify-items-center">
    <i
      v-if="typeof item.data.icon == 'string'"
      class="dx-icon"
      :class="['dx-icon-'+item.data.icon]"
    ></i>
    <img v-else :src="item.data.icon" alt />
    <div>{{item.data.text}}</div>
    <div
      v-if="getCountNotificationHub"
      class="unRead-counter unRead-counter--position"
    >{{getCountNotificationHub}}</div>
  </div>
</template>

<script>
import AssignmentQuery from "~/components/assignment-module/infrastructure/constants/assignmentQuery.js";
export default {
  props: ["item"],
  computed: {
    getCountNotificationHub() {
      switch (this.item.data.notificationType) {
        case "assignment":
          return this.$store.getters[
            "notificationHub/assignmentNotificationCount"
          ](this.item.data.query);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~assets/dx-styles.scss";
@import "~assets/themes/generated/variables.base.scss";
.justify-items-center {
  position: relative;
  justify-content: flex-start;
  width: 100%;
}
.side-bar__item {
  position: relative;
  justify-content: flex-start;
  width: 100%;
}
.unRead-counter {
  font-weight: bold;
  margin-left: auto;
}
.unRead-counter--position {
  justify-self: flex-end;
  position: absolute;
  right: 2.5em;
  top: 0;
}
</style>