<template>
  <div
    :class="{ link: isRecipient }"
    @click="
      () => {
        if (isRecipient) toDetailAuthor();
      }
    "
  >
    <i class="dx-icon dx-icon-user"></i>
    {{ author.name }}
  </div>
</template>

<script>
import recipientTypes from "~/infrastructure/constants/resipientType.js";
export default {
  props: {
    author: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toDetailAuthor() {
      this.$popup.employeeCard(
        this,
        {
          employeeId: this.author.id,
        },
        {
          height: "auto",
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" },
          ],
        }
      );
    },
  },
  computed: {
    isRecipient() {
      return this.author.recipientType === recipientTypes.Employee
        ? true
        : false;
    },
  },
};
</script>

<style>
</style>
