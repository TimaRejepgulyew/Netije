<template>
  <div>
    <custom-expander
      v-if="inProcess && canUpdate"
      :header="header"
      bodyTemplate="approvers"
    >
      <approvers-list slot="approvers" :assignmentId="assignmentId" />
    </custom-expander>
    <div v-if="false && !isRework">
      <label class="pr-2">{{ $t("assignment.readdressToEmployee") }}</label>
      <div class="f-grow-1">
        <employee-select-box
          valueExpr="id"
          :read-only="!canUpdate"
          :value="addresseeId"
          @valueChanged="valueChanged"
        />
      </div>
    </div>
  </div>
</template>

<script>
import customExpander from "~/components/custom-expander/index.vue";
import approversList from "~/components/assignment/form-components/approvers-list.vue";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    employeeSelectBox,
    approversList,
    customExpander
  },
  props: ["assignmentId"],
  methods: {
    valueChanged(id) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_ADDRESSEE_ID`,
        id
      );
    }
  },
  computed: {
    header() {
      return {
        text: this.$t("assignment.fields.approvers")
      };
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    isRework() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .isRework;
    },
    addresseeId() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .addresseeId;
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    }
  }
};
</script>

<style lang="scss"></style>
