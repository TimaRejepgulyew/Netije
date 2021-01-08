<template>
  <card-assignment
    v-if="assignmentId"
    :assignmentId="assignmentId"
    :isCard="true"
  />
</template>

<script>
import { load as assignmentLoad } from "~/components/workFlow/infrastructure/services/assignmentService.js";
export default {
  components: {
    cardAssignment: () =>
      import("~/components/workFlow/assignment-module/main-form.vue"),
  },
  name: "assignment-popup",
  props: {
    options: {
      type: Object,
    },
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
      this.$emit("close");
    },
    close() {
      this.$emit("close");
    },
  },
  data() {
    return {
      assignmentId: null,
    };
  },
  async created() {
    const assignmentId = this.options.params.assignmentId;
    await assignmentLoad(this, assignmentId);
    this.assignmentId = assignmentId;
    const name = this.$store.getters[`assignments/${assignmentId}/assignment`]
      .subject;
    this.$emit("loadStatus");
    this.$emit("showTitle", name);
  },
};
</script>