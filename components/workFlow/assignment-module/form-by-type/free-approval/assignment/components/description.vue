<template>
  <div>
    <div v-if="false && !isRework">
      <label class="pr-2">{{ $t("assignment.readdressToEmployee") }}</label>
      <div class="f-grow-1">
        <employee-select-box
          :read-only="!canUpdate"
          :value="addressee"
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
    addresse() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .addressee;
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
  },
  methods: {
    valueChanged(value) {
      this.$store.commit("SET_ADDRESSE", value);
    },
  },
};
</script>