<template>
  <div>
    <custom-expander
      v-if="inProcess && canUpdate"
      :header="header"
      bodyTemplate="approvers"
    >
      <approvers-list slot="approvers" :assignmentId="assignmentId" />
    </custom-expander>
  </div>
</template>

<script>
import approversList from "~/components/assignment/form-components/approvers-list.vue";
import customExpander from "~/components/custom-expander/index.vue";
export default {
  components: {
    approversList,
    customExpander,
  },
  props: ["assignmentId"],
  computed: {
    header() {
      return {
        text: this.$t("assignment.fields.approvers"),
      };
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },

    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
  },
};
</script>

<style></style>
