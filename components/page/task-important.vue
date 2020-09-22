<template>
  <div>
    <img v-if="path" class="icon--type" :src="path" />
  </div>
</template>

<script>
import importantIcon from "~/static/icons/iconAssignment/important.svg";
import Important from "~/infrastructure/constants/assignmentImportance.js";
export default {
  props: ["state"],
  computed: {
    path() {
      return this.state === Important.High ? importantIcon : false;
    },
  },
};
</script>

<style>
.icon--type {
  display: flex;
  margin: 0 auto;
  width: 25px;
}
</style>