<template>
  <div v-if="description">
    <div>{{$t("shared.explanation")}}</div>
    <div>{{description}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    description() {
      return this.$store.getters["currentAssignment/assignment"].description;
    }
  }
};
</script>

<style>
</style>