<template>
  <automatic-assignment-rules-card :isCard="false" />
</template>

<script>
import automaticAssignmentRulesCard from "~/components/docFlow/automatic-assignment-rules/card.vue";
export default {
  components: {
    automaticAssignmentRulesCard
  },
  methods: {
    onClose() {
      this.$router.push(`/docFlow/automatic-assignment-rules`);
    }
  }
};
</script>

<style></style>
