<template>
  <div class="d-flex task__item item--status">
    <img class="icon--status" :src="result.icon" />
    {{result.text}}
  </div>
</template>

<script>
import { generateElementsResult } from "~/infrastructure/constants/assignmentResult.js";
export default {
  props: ["data"],
  data() {
    return {
      result: generateElementsResult(this.data.assignmentType)[
        this.data.result
      ],
    };
  },
};
</script>

<style>
</style>
