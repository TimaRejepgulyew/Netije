<template>
  <div class="notification">
    <div class="d-flex list border-bottom">
      <div @click="showNotificationDetail" class="d-flex f-grow-1">
        <div class="list__icon">
          <img :src="assignmentModel.getById(item.data.assignmentType).icon" />
        </div>
        <div class="list__content f-grow-1 max-width-250px">{{ item.data.subject}}</div>
      </div>
      <div class="list__btn-group js-self-flex-end">
        <DxButton @click="readNotification" icon="clear" stylingMode="text"></DxButton>
      </div>
    </div>
  </div>
</template>

<script>
import DxButton from "devextreme-vue/button";
import AssignmentType from "~/infrastructure/models/AssignmentType.js";
import { mapGetters, mapMutations } from "vuex";
import DxList from "devextreme-vue/list";
export default {
  props: ["item", "assignmentModel"],
  components: {
    DxButton,
    DxList,
  },
  computed: {
    ...mapGetters({
      notification: "notificationHub/assignmentNotification",
    }),
  },
  methods: {
    showNotificationDetail() {
      this.$emit("showNotificationDetail", {
        assignmentId: this.item.data.assignmentId,
      });
    },
    readNotification() {
      this.$emit("readNotification", this.item.data.assignmentId);
    },
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.notification {
.list {
  border: 2px solid $base-border-color;
  box-sizing: border-box;
  padding: 3px 0;
  border-radius: 3px;
  cursor: pointer;
}
.list:hover {
  box-sizing: border-box;
  border-bottom: 2px solid $base-accent;
}
.list__content {
  line-height: 30px;
}
.max-width-250px {
  max-width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.list__icon {
  font-size: 25px;
  padding: 0 8px;
  img {
    width: 22px;
  }
}
}
.f-grow-1 {
  flex-grow: 1;
}
.js-self-flex-end {
  margin-left: auto;
  justify-self: flex-end;
}
</style>
