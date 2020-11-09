<template>
  <div>
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
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    employeeSelectBox,
  },
  props: ["assignmentId"],
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
