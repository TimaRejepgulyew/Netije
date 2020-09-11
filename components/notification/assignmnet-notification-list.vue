<template>
  <DxList :items="notification" :activeStateEnabled="false" :focusStateEnabled="false">
    <template #item="item">
      <div>
        <div class="d-flex">
          <div class="list__icon">
            <img :src="assignmentTypeElements[item.data.assignmnetType]" />
          </div>
          <div class="list__content">{{ item.data.subject}}</div>
          <div class="list__btn-group">
            <notification-action-btn :notification="notification" />
          </div>
        </div>
      </div>
    </template>
  </DxList>
</template>

<script>
import AssignmentType from "~/infrastructure/models/AssignmentType.js";
import { mapGetters } from "vuex";
import DxList from "devextreme-vue/list";
export default {
  components: {
    DxList,
  },
  computed: {
    assignmentTypeElements() {
      return new AssignmentType(this).withIconGroup().getAll();
    },
    ...mapGetters({
      notification: "notificationHub/assignmentNotification",
    }),
  },
  methods: {
    selectNotify(currentNotification) {
      this.$emit("selectedNotification", currentNotification);
    },
  },
};
</script>

<style>
</style>
