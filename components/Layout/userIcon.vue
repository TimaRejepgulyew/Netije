<template>
  <div class="avatar" :style="{ background: stringToColor }">
    <img v-if="path" :src="imagePath" />
    <span v-else>{{ nameToWord }}{{ lastNameToWord }}</span>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";

export default {
  props: {
    fullName: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    }
  },
  computed: {
    imagePath() {
      return dataApi.UserPhotoHash + this.path + ".png";
    },
    stringToColor() {
      let hash = 0;
      let color = "#";
      let i, value, nameLength;
      if (!this.fullName) {
        return color + "333333";
      }
      for (i = 0; i < this.fullName.length; i++) {
        hash = this.fullName.charCodeAt(i) + ((hash << 5) - hash);
      }
      for (i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).substr(-2);
      }
      return color;
    },
    nameToWord() {
      if (this.fullName)
        return this.fullName
          .split(" ")[0]
          .toUpperCase()
          .substr(0, 1);
    },
    lastNameToWord() {
      if (this.fullName.split(" ").length > 1)
        return this.fullName
          .split(" ")[1]
          .toUpperCase()
          .substr(0, 1);
    }
  }
};
</script>

<style lang="scss"  scoped>
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