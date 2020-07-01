<template>
  <img class="icon--type" :src="path" />
</template>

<script>
import Important from "~/infrastructure/constants/assignmentImportance.js";
export default {
  props: ["state"],
  computed: {
    path() {
      switch (this.state) {
        case Important.High:
          return require("~/static/icons/iconAssignment/important.svg");
      }
    }
  }
};
</script>

<style>
.icon--type {
  display: flex;
  margin: 0 auto;
  width: 25px;
}
</style>