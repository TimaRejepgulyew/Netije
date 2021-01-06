<template>
  <div>
    <div
      class="comment__item mY-1 ml-1"
      :class="{ 'current-comment': data.item.isCurrent }"
    >
      <div class="d-flex js-space-between">
        <div>
          <user-icon
            class="f-size-30"
            :fullName="data.item.author.name"
            :path="data.item.author.personalPhotoHash"
          />
        </div>
        <div>
          <div @click="() => toDetailAssignment(data.item.entity)" class="link">
            <span class="text-italic">{{
              parseSubject(data.item.entity.assignmentType)
            }}</span>
          </div>

          <div class="list__content d-flex">
            <threadTextComponentAuthor :author="data.item.author" />
            <div>
              <i class="dx-icon dx-icon-event"></i>
              {{ formatDate(data.item.modificationDate) }}
            </div>
          </div>
        </div>
        <div class="thread-text-status">
          <is-read-indicator :data="data.item.entity" />
        </div>
      </div>
      <div v-if="data.item.body" class="list__content message-body">
        {{ data.item.body }}
      </div>
    </div>
    <thread-text-component
      class="ml-1"
      :v-if="data.children && data.children.length"
      v-for="(item, index) in data.children"
      :data="item"
      :type="item.item.type"
      :key="index"
    />
  </div>
</template>
<script>
import threadTextComponentAuthor from "./thread-text-item-components/author.vue";
import { isReadIndicator } from "./indicator-state/assignment-indicators/indicators.js";
import { assignmentTypeName } from "../infrastructure/constants/assignmentType.js";
import userIcon from "~/components/Layout/userIcon.vue";
import WorkflowEntityTextType from "../infrastructure/constants/workflowEntityTextType";
import moment from "moment";
export default {
  components: {
    threadTextComponentAuthor,
    userIcon,
    isReadIndicator,
    threadTextComponent: () =>
      import("./thread-text-component.vue"),
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
