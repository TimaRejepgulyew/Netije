<template>
  <DxButton
    :hoverStateEnabled="false"
    :activeStateEnabled="false"
    :focusStateEnabled="false"
    :icon="fireIcon"
    :readOnly="true"
  />
</template>

<script>
import DxButton from "devextreme-vue/button";
import fireIcon from "~/static/icons/fire.png";
export default {
  components: {
    DxButton
  },
  props: ["isImportant"],
  data() {
    return {
      fireIcon
    };
  }
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
