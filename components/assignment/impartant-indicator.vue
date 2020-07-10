<template>
  <div>
    <img :src="fireIcon" class="icon-type" />
  </div>
</template>

<script>
import fireIcon from "~/static/icons/fire.svg";
export default {
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