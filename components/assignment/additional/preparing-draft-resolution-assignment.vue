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
      this.$store.commit("currentAssignment/SET_ADDRESSEE_ID", {
        key: this.assignmentId,
        payload: id
      });
    }
  },
  computed: {
    addresseeId() {
      return this.$store.getters["currentAssignment/assignment"](
        this.assignmentId
      ).addresseeId;
    },
    InProcess() {
      return this.$store.getters["currentAssignment/inProcess"](
        this.assignmentId
      );
    }
  }
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>