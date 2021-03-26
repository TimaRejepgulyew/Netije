<template>
  <div
    class="avatar"
    :style="{
      background: stringToColor,
      width: size + 'px',
      height: size + 'px',
      fontSize: fontSize + 'px'
    }"
  >
    <img :src="imagePath" v-if="path" />
    <span v-else>{{ nameToWord }}{{ lastNameToWord }}</span>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: "No Name"
    },
    size: {
      type: Number,
      default: 25
    }
  },
  computed: {
    imagePath() {
      return this.$dataApi.UserPhotoHash + this.path + ".png";
    },
    stringToColor() {
      let i, value;
      let hash = 0;
      let color = "#";
      for (i = 0; i < this.name.length; i++) {
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
    },
    fontSize() {
      return this.size / 2.5;
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  line-height: 10px;
  color: white;
  background: #333333;
  overflow: hidden;
  img {
    height: 25px;
  }
}
</style>