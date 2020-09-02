<template>
  <div :class="{link:isRecipient}" @click="()=>{if(isRecipient)toDetailAuthor()}">
    <i class="dx-icon dx-icon-user"></i>
    {{ author.name}}
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
  computed: {
    toDetailAuthor() {
      this.$emit("toDetailAuthor", this.author.id);
    },
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
