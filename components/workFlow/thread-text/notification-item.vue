<template>
  <div>
    <div
      class="comment__item mY-1 ml-1"
      :class="{ 'current-comment': data.isCurrent }"
    >
      <div class="d-flex js-space-between">
        <div>
          <user-icon
            class="f-size-30"
            :fullName="data.author.name"
            :path="data.author.personalPhotoHash"
          />
        </div>
        <div>
          <div @click="() => toDetailAssignment(data.entity)" class="link">
            <span class="text-italic">{{
              parseSubject(data.entity.assignmentType)
            }}</span>
          </div>

          <div class="list__content d-flex">
            <threadTextComponentAuthor :author="data.author" />
            <div>
              <i class="dx-icon dx-icon-event"></i>
              {{ formatDate(data.modificationDate) }}
            </div>
          </div>
        </div>
        <div class="thread-text-status">
          <is-read-indicator :data="data.entity" />
        </div>
      </div>
      <div v-if="data.entity.body" class="list__content message-body">
        {{ data.entity.body }}
      </div>
    </div>
    <thread-text-component
      class="ml-1"
      :v-if="data.children && data.children.length"
      v-for="(item, index) in data.children"
      :data="item"
      :type="item.type"
      :key="index"
    />
  </div>
</template>
<script>
import threadTextComponentAuthor from "~/components/workFlow/thread-text/thread-text-item-components/author.vue";
import { isReadIndicator } from "~/components/workFlow/thread-text/indicator-state/assignment-indicators/indicators.js";
import { assignmentTypeName } from "~/infrastructure/constants/assignmentType.js";
import userIcon from "~/components/Layout/userIcon.vue";
import WorkflowEntityTextType from "~/infrastructure/constants/workflowEntityTextType";
import moment from "moment";
export default {
  components: {
    threadTextComponentAuthor,
    userIcon,
    isReadIndicator,
    threadTextComponent: () =>
      import("~/components/workFlow/thread-text/thread-text-component.vue"),
  },
  name: "task-item",
  props: ["data"],

  methods: {
    isReadStatusText(isRead) {
      return isRead ? this.$t("shared.read") : this.$t("shared.unread");
    },
    isReadStatusIcon(isRead) {
      return isRead ? this.readIcon : this.unreadIcon;
    },
    toDetailAssignment(params) {
      this.$popup.assignmentCard(this, {
        params: { assignmentId: params.id },
      });
    },
    parseSubject(value) {
      return assignmentTypeName(this)[value]?.text;
    },
    formatDate(date) {
      return moment(date).format("DD.MM.YYYY HH:mm");
    },
    displayDeadline(type) {
      return type !== WorkflowEntityTextType.Notice;
    },
  },
};
</script>

