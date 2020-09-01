<template>
  <div class="d-flex task__item item--status">
    
    <img class="icon--status" :src="status.icon" />
    {{ status.text }}
  </div>
</template>

<script>
import { taskStatusGeneratorObj } from "~/infrastructure/constants/taskStatus.js";
export default {
  props: ["data"],
  data() {
    return {
      status: taskStatusGeneratorObj(this)[this.data.status],
    };
  },
};
</script>
