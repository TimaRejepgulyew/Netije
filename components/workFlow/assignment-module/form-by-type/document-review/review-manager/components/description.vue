<template>
  <div v-if="false">
    <label class="pr-2">{{ $t("assignment.readdressToEmployee") }}</label>
    <div class="f-grow-1">
      <employee-select-box
        :read-only="!canUpdate"
        :value="addressee"
        @valueChanged="valueChanged"
      />
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
  methods: {
    valueChanged(id) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_ADDRESSEE_ID`,
        id
      );
    },
  },
  computed: {
    addressee() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .addressee;
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
  },
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>