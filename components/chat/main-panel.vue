<template>
  <div id="main_panel">
    <div @click="selectRoom" class="cell" v-for="(user,index) in 10" :key="index">
      <userIcon :fullName="`Лахан Макараевич`" />
    </div>
  </div>
</template>

<script>
import userIcon from "~/components/Layout/userIcon.vue";
export default {
  components: {
    userIcon
  },
  methods: {
    selectRoom() {
      this.$emit("selectRoom");
    }
  }
};
</script>


<style lang="scss">
#main_panel {
  position: fixed;
  width: 60px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, 60px);
  justify-items: center;
  //   height: 40px;
  .cell {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    // transition: 0.3s;
    &:hover {
      background-color: rgba($color: #ddd, $alpha: 0.7);
    }
    .user-info-avatar {
      margin: 0;
    }
  }
}
</style>