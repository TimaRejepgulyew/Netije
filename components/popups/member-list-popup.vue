<template>
  <member-list :data="options.currentEmployee" />
</template>

<script>
import MemberList from "~/components/department/master-detail-member-list.vue";
export default {
  components: {
    MemberList
  },
  props: {
    options: {
      type: Object
    }
  },
  mounted() {
    this.$emit("loadStatus");
  }
};
</script>

<style></style>
