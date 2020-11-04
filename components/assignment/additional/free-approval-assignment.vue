<template>
  <div>
    <custom-expander
      :header="{
        text: 'Согласующие'
      }"
      bodyTemplate="approvers"
    >
    <approvers-list slot="approvers" :assignmentId="assignmentId" />
    </custom-expander>
    <div v-if="!isRework">
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
