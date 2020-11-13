<template>
  <div class="user-info d-flex">
    <user-icon :fullName="data.name" :path="data.personalPhotoHash" />
    <div class="user-name">
      <div>{{ data.name }}</div>
      <div>{{ data.description }}</div>
    </div>
  </div>
</template>

<script>
import userIcon from "~/components/Layout/userIcon.vue";
export default {
  components: {
    userIcon
  },
  props: ["data"]
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";

.user-info {
  display: flex;
  align-items: center;

  .dx-toolbar-menu-section & {
    padding: 10px 6px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .user-name {
    text-overflow: ellipsis;
    font-size: 12px;
    color: $base-text-color;
  }
}
</style>
