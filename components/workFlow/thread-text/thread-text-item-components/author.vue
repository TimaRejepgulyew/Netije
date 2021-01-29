<template>
  <div class="d-flex">
    <div class="d-flex" v-if="!isWrittenByAuthor">
      <div
        :class="{ link: isRecipient(writtenBy) }"
        @click="
          () => {
            if (isRecipient(writtenBy)) toDetailRecipient(writtenBy.id);
          }
        "
      >
        <i class="dx-icon dx-icon-user"></i>
        {{ writtenBy.name }}
      </div>
      <span> {{ $t("task.fields.writtenBy") }} => </span>
    </div>

    <div
      :class="{ link: isRecipient(author), writtenBy: !isWrittenByAuthor }"
      @click="
        () => {
          if (isRecipient(author)) toDetailRecipient(author.id);
        }
      "
    >
      <i class="dx-icon dx-icon-user"></i>
      {{ author.name }}
    </div>
  </div>
</template>

<script>
import recipientTypes from "~/infrastructure/constants/resipientType.js";
export default {
  props: {
    writtenBy: {
      default: () => {},
    },
    author: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    isRecipient(employee) {
      return employee.recipientType === recipientTypes.Employee ? true : false;
    },
    toDetailRecipient(employeeId) {
      this.$popup.employeeCard(
        this,
        {
          employeeId,
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
    isWrittenByAuthor() {
      return this.author.id === this.writtenBy.id;
    },
  },
};
</script>

<style>
.writtenBy {
  color: green;
  text-decoration: line-through;
}
</style>
