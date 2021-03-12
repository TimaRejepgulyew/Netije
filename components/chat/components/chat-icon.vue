<template>
  <div class="avatar" :style="{background:stringToColor}">
    <img :src="imagePath" v-if="avatar " />
    <span v-else>{{nameToWord}}{{lastNameToWord}}</span>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
export default {
  props: ["avatar", "name"],
  computed: {
    imagePath() {
      return dataApi.UserPhotoHash + this.avatar + ".png";
    },
    stringToColor() {
      let i, value, nameLength;
      let hash = 0;
      let color = "#";
      if (!this.name) {
        return color + "333333";
      }
      nameLength = this.name.length;
      for (i = 0; i < nameLength; i++) {
        hash = this.name.charCodeAt(i) + ((hash << 5) - hash);
      }
      for (i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).substr(-2);
      }
      return color;
    },
    nameToWord() {
      if (this.name)
        return this.name
          .split(" ")[0]
          .toUpperCase()
          .substr(0, 1);
    },
    lastNameToWord() {
      if (this.name.split(" ").length > 1)
        return this.name
          .split(" ")[1]
          .toUpperCase()
          .substr(0, 1);
    }
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