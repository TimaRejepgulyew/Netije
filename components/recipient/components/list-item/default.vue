<template>
  <div class=" d-flex">
    <recipientIcon :type="data.recipientType" />
    <div>
      <div>{{ data.name }}</div>
      <div>{{ data.description }}</div>
    </div>
  </div>
</template>

<script>
import recipientIcon from "~/components/page/resipient-icon.vue";
export default {
  components: {
    recipientIcon
  },
  props: ["data"]
};
</script>

<style></style>
