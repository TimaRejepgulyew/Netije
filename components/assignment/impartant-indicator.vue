<template>
  <div>
    <img v-if="isImportant" :src="fireIcon" class="icon-type" />
  </div>
</template>

<script>
import fireIcon from "~/static/icons/fire.svg";
export default {
  props: ["isImportant"],
  data() {
    return {
      fireIcon
    };
  }
};
</script>

<style>
.icon-type {
  height: 30px;
}
</style>