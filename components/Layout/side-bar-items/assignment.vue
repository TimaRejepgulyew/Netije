<template>
  <div class="d-flex justify-items-center">
    <i
      v-if="typeof item.icon == 'string'"
      class="dx-icon"
      :class="['dx-icon-' + item.icon]"
    ></i>
    <img v-else :src="item.icon" alt />
    <div>{{ item.text }}</div>
    <div
      v-if="getCountNotificationHub"
      class="unRead-counter unRead-counter--position"
    >
      {{ getCountNotificationHub }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  computed: {
    getCountNotificationHub() {
      switch (this.item.notificationType) {
        case "assignment":
          return this.$store.getters[
            "notificationHub/assignmentNotificationCount"
          ](this.item.query);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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