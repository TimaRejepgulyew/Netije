<template>
  <div>
    <img v-if="isImportant" :src="fireIcon" class="icon--important" />
  </div>
</template>

<script>
import fireIcon from "~/static/icons/fire.png";
export default {
  props: ["isImportant"],
  data() {
    return {
      fireIcon,
    };
  },
};
</script>

<style>
.icon--important {
  padding: 0 5px;
  position: relative;
  bottom: -5px;
  height: 25px;
}
</style>
