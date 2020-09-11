<template>
  <div>
    <div >
      <DxPopup
        :position="{ my: 'right top', at: 'right top', of: window }"
        :showTitle="false"
        :visible.sync="showNotificationPopup"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        width="500px"
        :height="'auto'"
      >
        <div>dawdaw{{notification}}</div>
      </DxPopup>
      <div class="notify-item" @click="showNotification">
        <DxButton
          :hoverStateEnabled="false"
          :focusStateEnabled="true"
          :activeStateEnabled="false"
          id="btn"
          :icon="notificationIcon"
          stylingMode="text"
        />
        <label v-if="showCount" for="btn" class="notify-item_count">{{notificationCount}}</label>
      </div>
    </div>
  </div>
</template>

<script>
import { DxPopup } from "devextreme-vue/popup";
import notificationIcon from "~/static/icons/notification/notification.svg";
import { mapGetters } from "vuex";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton,
    DxPopup,
  },
  data() {
    return {
      notificationIcon,
      showNotificationPopup: false,
    };
  },
  computed: {
    ...mapGetters({
      notificationCount: "notificationHub/assignmentNotificationCount",
      notification: "notificationHub/assignmentNotification",
    }),
    showCount() {
      return this.notificationCount !== 0;
    },
  },
  methods: {
    showNotification() {
      // if (this.notificationCount !== 0)
        this.showNotificationPopup = !this.notificationPopup;
    },
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.notify-item_count {
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  position: relative;
  top: -7px;
  left: -21px;
  background: red;
  font-size: 8px;
  margin: 1px;
  color: white;
  border: 1px solid white;
  outline: 0px;
  box-sizing: border-box;
  padding: 1px 4px;
  border-radius: 10px;
}
</style>
