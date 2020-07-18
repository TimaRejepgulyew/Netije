<template>
  <div v-if="description">
    <div>{{$t("shared.explanation")}}</div>
    <div>{{description}}</div>
  </div>
</template>

<script>
export default {
  props: ["assignmentId"],
  computed: {
    description() {
      return  this.$store.getters[`assignments/${this.assignmentId}/assignment`].description;
    }
  }
};
</script>

<style>
</style>