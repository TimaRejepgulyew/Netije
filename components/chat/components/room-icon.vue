<template>
  <div class="avatar" :style="{background:stringToColor}">
    <img :src="imagePath" v-if="room.avatar " />
    <span v-else>{{nameToWord}}{{lastNameToWord}}</span>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import UserIcon from "~/components/chat/components/room-icon.vue";
export default {
  props: {
    room: {}
  },
  data() {
    return {
      groupImg: require("~/static/icons/quide-page/company-structure.svg")
    };
  },
  computed: {
    imagePath() {
      return dataApi.UserPhotoHash + this.room.avatar + ".png";
    },
    stringToColor() {
      let i, value, nameLength;
      let hash = 0;
      let color = "#";
      if (!this.room.name) {
        return color + "333333";
      }
      nameLength = this.room.name.length;
      for (i = 0; i < nameLength; i++) {
        hash = this.room.name.charCodeAt(i) + ((hash << 5) - hash);
      }
      for (i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).substr(-2);
      }
      return color;
    },
    nameToWord() {
      if (this.room.name)
        return this.room.name
          .split(" ")[0]
          .toUpperCase()
          .substr(0, 1);
    },
    lastNameToWord() {
      if (this.room.name.split(" ").length > 1)
        return this.room.name
          .split(" ")[1]
          .toUpperCase()
          .substr(0, 1);
    }
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 12px;
  line-height: 10px;
  color: white;
  background: #333333;
  overflow: hidden;
  cursor: pointer;
  img {
    height: 25px;
  }
}
</style>