<template>
  <div class="d-flex">
    <img class="group-title__icon" :src="iconSrc" />
    <div>
      <div>{{ data.name }}</div>
      <div class="grey">{{ data.description }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      iconSrc: require("~/static/icons/quide-page/group.svg")
    };
  }
};
</script>

<style lang="scss">
.group-title__icon {
  margin-right: 10px;
  width: 25px;
  height: 100%;
}
.grey {
  color: gray;
  font-size: 14px;
}
.dx-state-focused,
.dx-state-active {
  .grey {
    color: #fff;
    font-size: 14px;
  }
}
</style>
