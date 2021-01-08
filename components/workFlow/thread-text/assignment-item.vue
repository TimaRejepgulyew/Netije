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
              parseSubject(data.item.entity)
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
          <div
            class="task__item"
            v-if="data.item.entity.deadline && displayDeadline(data.item.type)"
            :class="{ expired: data.item.isExpired }"
          >
            {{ $t("translations.fields.deadLine") }}:
            {{ formatDate(data.item.entity.deadline) }}
          </div>
          <component
            :is="showIndicatorComponent(data.item.entity)"
            :data="data.item.entity"
          />
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
import AssignmentStatus from "../infrastructure/constants/assignmentStatus.js";
import * as indicators from "./indicator-state/assignment-indicators/indicators.js";
import { assignmentTypeName } from "../infrastructure/constants/assignmentType.js";
import userIcon from "~/components/Layout/userIcon.vue";
import WorkflowEntityTextType from "../infrastructure/constants/workflowEntityTextType";
import moment from "moment";
export default {
  components: {
    threadTextComponentAuthor,
    ...indicators,
    userIcon,
    threadTextComponent: () =>
      import("./thread-text-component.vue"),
  },
  name: "task-item",
  props: ["data"],
  methods: {
    showIndicatorComponent(data) {
      if (data.status === AssignmentStatus.Completed) {
        return "result-indicator";
      } else if (data.status === AssignmentStatus.Aborted) {
        return "status-indicator";
      } else if (data.status === AssignmentStatus.InProcess) {
        if (data.isRead) {
          return "status-indicator";
        } else {
          return "isRead-indicator";
        }
      }
    },
    toDetailAssignment(params) {
      this.$popup.assignmentCard(this, {
        params: { assignmentId: params.id },
      });
    },
    parseSubject(value) {
      return assignmentTypeName(this)[value.assignmentType]?.text;
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
<style></style>
