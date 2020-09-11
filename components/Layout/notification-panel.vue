<template>
  <div>
    <div>
      <!-- <DxPopup
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
      </DxPopup>-->
      <div class="notify-item">
        <DxButton
          id="notifyBtn"
          @click="showNotification"
          :hoverStateEnabled="false"
          :focusStateEnabled="false"
          :activeStateEnabled="false"
          :icon="notificationIcon"
          stylingMode="text"
        ></DxButton>
        <label v-if="showCount" for="btn" class="notify-item_count">{{notificationCount}}</label>
      </div>
      <DxActionSheet
        height="30vh"
        itemTemplate="notificationItem"
        :width="500"
        :items="[{subject:'WSDAWDAWAWDAW',assignmnetType:3,assignmentId:11212},
        {subject:'WSDAWDAWAWDAW',assignmnetType:0,assignmentId:1212},
         {subject:'WSDAWDAWwsAWDAW',assignmnetType:0,assignmentId:1212},
          {subject:'WSDAWAWDAW',assignmnetType:0,assignmentId:21},
           {subject:'WSDAWAWDAW',assignmnetType:0,assignmentId:123212},
            {subject:'WSDDAWAWDAW',assignmnetType:0,assignmentId:132212},
             {subject:'WSDAWDAWAWDAW',assignmnetType:0,assignmentId:12145212},
              {subject:'WSDDAWAWDAW',assignmnetType:0,assignmentId:1255512},
               {subject:'WSWDAWAWDAW',assignmnetType:0,assignmentId:24555},
        {subject:'WSDAWDAWDAW',assignmnetType:5,assignmentId:121212}]"
        :visible.sync="showNotificationPopup"
        target="#notifyBtn"
        :usePopover="true"
        title="notification"
        @itemClick="showNotificationDetail"
      >
        <template #notificationItem="item">
          <div>
            <notification-item :assignmentModel="assignmentTypeElements" :item="item" />
          </div>
        </template>
      </DxActionSheet>
    </div>
  </div>
</template>

<script>
import DxActionSheet from "devextreme-vue/action-sheet";
import AssignmentType from "~/infrastructure/models/AssignmentType.js";
import { DxPopup } from "devextreme-vue/popup";
import notificationIcon from "~/static/icons/notification/notification.svg";
import notificationItem from "~/components/notification/assignmnet-notification-item.vue";
import { mapGetters } from "vuex";
import { DxDropDownButton } from "devextreme-vue";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton,
    DxDropDownButton,
    DxPopup,
    notificationItem,
    DxActionSheet,
  },
  data() {
    return {
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
    showNotificationDetail() {},
    showNotification(e) {
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
