<template>
  <div class="d-flex task__item item--status">
    <img class="icon--status" :src="status.icon" />
    {{ status.text }}
  </div>
</template>

<script>
import { assignmentStatusLocalization } from "~/infrastructure/constants/assignmentStatus.js";
export default {
  props: ["data"],
  data() {
    return {
      status: assignmentStatusLocalization(this)[this.data.status],
    };
  },
};
</script>
