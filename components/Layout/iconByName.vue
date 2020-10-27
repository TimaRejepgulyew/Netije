<template>
  <div>
    <div>
      <div
        class="user-info-avatar"
        :style="{background:stringToColor}"
        id="avatar"
      >{{nameToWord}}{{lastNameToWord}}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["fullName"],
  computed: {
    stringToColor() {
      let hash = 0;
      let color = "#";
      let i;
      let value;
      let nameLength;

      if (!this.fullName) {
        return color + "333333";
      }

      nameLength = this.fullName.length;

      for (i = 0; i < nameLength; i++) {
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

<style  scoped>
.user-info-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 12px;
  border-radius: 15px;
  text-align: center;
  margin-right: 10px;
  color: white;
  background: #333333;
}

.user-info-name {
  display: inline-block;
}
</style>