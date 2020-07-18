<template>
  <div class>
    <label class="pr-2">{{$t("assignment.readdressToEmployee")}}</label>
    <div class="f-grow-1">
      <employee-select-box
        :read-only="!InProcess"
        :value="addresseeId"
        @valueChanged="valueChanged"
      />
    </div>
  </div>
</template>

<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    employeeSelectBox
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
    addresseeId() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .addresseeId;
    },
    InProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    }
  }
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>