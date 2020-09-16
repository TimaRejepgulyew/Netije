<template>
  <div>
    <div >
      <DxPopup
        :showTitle="false"
        :visible.sync="showAssignmentPopup"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        width="90%"
        height="90%"
      >
        <div class="scrool-auto">
          <assignment-card
            v-if="showAssignmentPopup"
            :assignmentId="currentNotificationId"
            :isCard="false"
          />
        </div>
      </DxPopup>
      <div class="notify-item">
        <div class="d-flex align-content-center" id="notifyBtn" @click="showNotification">
          <img
            class="notify-item_icon"
            :class="{'tossing':showCount}"
            id="btn"
            :src="notificationIcon"
          />
          <label v-if="showCount" for="btn" class="notify-item_count">{{notificationCount}}</label>
        </div>
      </div>
      <DxActionSheet
        itemTemplate="notificationItem"
        :width="500"
        :items="notification"
        :visible.sync="showNotificationPopup"
        target="#notifyBtn"
        :usePopover="true"
        :title="$t('notification.cardTitle')"
      >
        <template #notificationItem="item">
          <div>
            <notification-item
              :assignmentModel="assignmentTypeElements"
              @showNotificationDetail="showNotificationDetail"
              @readNotification="readNotification"
              :item="item"
            />
          </div>
        </template>
      </DxActionSheet>
    </div>
  </div>
</template>

<script>
import assignmentCard from "~/components/assignment/index.vue";
import { load } from "~/infrastructure/services/assignmentService.js";
import DxActionSheet from "devextreme-vue/action-sheet";
import AssignmentType from "~/infrastructure/models/AssignmentType.js";
import { DxPopup } from "devextreme-vue/popup";
import notificationIcon from "~/static/icons/notification/notification.svg";
import notificationItem from "~/components/notification/assignmnet-notification-item.vue";
import { mapGetters, mapMutations } from "vuex";
import { DxDropDownButton } from "devextreme-vue";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton,
    DxDropDownButton,
    DxPopup,
    notificationItem,
    DxActionSheet,
    assignmentCard,
  },
  data() {
    return {
      currentNotificationId: "null",
      showAssignmentPopup: false,
      notificationIcon,
      showNotificationPopup: false,
    };
  },
  computed: {
    assignmentTypeElements() {
      return new AssignmentType(this).withIconGroup();
    },
    ...mapGetters({
      notificationCount: "notificationHub/assignmentNotificationCount",
      notification: "notificationHub/assignmentNotification",
    }),
    showCount() {
      return this.notificationCount !== 0;
    },
  },
  methods: {
    ...mapMutations({
      readNotification: "notificationHub/DELETE_ASSIGNMENT_NOTIFICATION",
    }),
    async showNotificationDetail({ assignmentId }) {
      await this.$awn.asyncBlock(load(this, assignmentId));
      this.showAssignmentPopup = !this.showAssignmentPopup;
      this.currentNotificationId = assignmentId;
      this.readNotification(assignmentId);
    },
    showNotification() {
      if (this.notificationCount !== 0)
        this.showNotificationPopup = !this.showNotificationPopup;
    },
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.notify-item_icon {
  cursor: pointer;
  width: 25px;
}
.align-content-center {
  align-content: center;
  align-items: center;
}
.notify-item_count {
  display: flex;
  align-content: center;

  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  position: relative;
  top: -7px;
  left: -11px;
  background: red;
  font-size: 8px;
  margin: 1px;
  color: white;
  border: 1px solid white;
  outline: 0px;
  box-sizing: border-box;
  padding: 2px 5px;
  border-radius: 10px;
}
.tossing {
  animation-name: tossing;
  -webkit-animation-name: tossing;

  animation-duration: 2.5s;
  -webkit-animation-duration: 2.5s;

  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}

@keyframes tossing {
  0% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
  100% {
    transform: rotate(-4deg);
  }
}

@-webkit-keyframes tossing {
  0% {
    -webkit-transform: rotate(-4deg);
  }
  50% {
    -webkit-transform: rotate(4deg);
  }
  100% {
    -webkit-transform: rotate(-4deg);
  }
}
</style>
