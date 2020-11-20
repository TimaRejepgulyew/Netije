<template>
  <div class=" d-flex">
    <recipientIcon :type="data.recipientType" />
    <div>
      <div>{{ data.name }}</div>
      <div class="grey">{{ data.description }}</div>
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

<style lang="scss">
.grey {
  color: gray;
  font-size: 14px;
}
.dx-state-focused,
.dx-state-active {
  .grey {
    color: #fff;
    font-size: 14px;
  }
}
</style>
