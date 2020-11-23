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
          <div @click="() => toDetailTask(data.entity)" class="link">
            <span class="text-italic">{{ parseSubject(data.entity) }}</span>
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
          <div
            class="task__item"
            v-if="data.entity.maxDeadline && displayDeadline(data.type)"
            :class="{ expired: data.isExpired }"
          >
            {{ $t("translations.fields.deadLine") }}:
            {{ formatDate(data.entity.maxDeadline) }}
          </div>
          <status-indicator :data="data.entity" />
        </div>
      </div>
      <div v-if="data.entity.body" class="list__content message-body">
        {{ data.entity.body }}
      </div>
    </div>
    <tread-text-component
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
import ActionItemType from "~/infrastructure/constants/actionItemType.js";
import TaskTypeGuid from "~/infrastructure/constants/taskType.js";
import statusIndicator from "~/components/workFlow/thread-text/indicator-state/task-indicators/status-indicator.vue";
import threadTextComponentAuthor from "~/components/workFlow/thread-text/thread-text-item-components/author.vue";
import TaskType from "~/infrastructure/models/TaskType.js";
import userIcon from "~/components/Layout/userIcon.vue";
import WorkflowEntityTextType from "~/infrastructure/constants/workflowEntityTextType";
import moment from "moment";
export default {
  components: {
    statusIndicator,
    threadTextComponentAuthor,
    userIcon,
    treadTextComponent: () =>
      import("~/components/workFlow/thread-text/thread-text-component.vue"),
  },
  name: "task-item",
  props: ["data"],

  methods: {
    toDetailTask(params) {
      this.$emit("toDetailTask", params);
    },
    parseSubject(value) {
      if (
        value.taskType == TaskTypeGuid.ActionItemExecutionTask &&
        value?.actionItemType === ActionItemType.Component
      ) {
        return this.$t("task.actionItemType.Component");
      } else return new TaskType(this).getById(value.taskType).text;
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

<style lang="scss" scoped></style>
