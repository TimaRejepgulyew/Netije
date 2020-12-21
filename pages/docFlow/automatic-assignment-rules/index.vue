<template>
  <div>
    <automaticAssignmentRulesGrid :isCard="false" @toDetail="toDetail" />
  </div>
</template>

<script>
import automaticAssignmentRulesGrid from "~/components/docFlow/automatic-assignment-rules/automatic-assignment-rules-grid.vue";
export default {
  components: {
    automaticAssignmentRulesGrid
  },
  methods: {
    toDetail({ id }) {
      this.$router.push(`/docFlow/automatic-assignment-rules/detail/${id}`);
    }
  }
};
</script>

<style></style>
