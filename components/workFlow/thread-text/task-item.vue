<template>
  <div>
    <div
      class="comment__item mY-1 ml-1"
      :class="{ 'current-comment': comment.isCurrent }"
    >
      <div class="d-flex js-space-between">
        <div>
          <user-icon class="f-size-30" :fullName="comment.author.name" :path="comment.author.personalPhotoHash" />
        </div>
        <div>
          <div @click="() => toDetailTask(comment.entity)" class="link">
            <span class="text-italic">{{ parseSubject(comment.entity) }}</span>
          </div>

          <div class="list__content d-flex">
            <threadTextComponentAuthor
              :author="comment.author"
              @toDetailAuthor="toDetailAuthor"
            />
            <div>
              <i class="dx-icon dx-icon-event"></i>
              {{ formatDate(comment.modificationDate) }}
            </div>
          </div>
        </div>
        <div class="task-state">
          <div
            class="task__item"
            v-if="comment.entity.maxDeadline && displayDeadline(comment.type)"
            :class="{ expired: comment.isExpired }"
          >
            {{ $t("translations.fields.deadLine") }}:
            {{ formatDate(comment.entity.maxDeadline) }}
          </div>
          <status-indicator :data="comment.entity" />
        </div>
      </div>
      <div v-if="comment.entity.body" class="list__content message-body">
        {{ comment.entity.body }}
      </div>
    </div>
    <tread-text-mediator
      class="ml-1"
      @toDetailAuthor="id => toDetail('toDetailAuthor', id)"
      @toDetailTask="params => toDetail('toDetailTask', params)"
      @toDetailAssignment="params => toDetail('toDetailAssignment', params)"
      :v-if="comment.children && comment.children.length"
      v-for="(item, index) in comment.children"
      :comment="item"
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
    treadTextMediator: () =>
      import("~/components/workFlow/thread-text/text-mediator.vue")
  },
  name: "task-item",
  props: ["comment"],

  methods: {
    toDetail(emitName, params) {
      this.$emit(emitName, params);
    },
    toDetailTask(params) {
      this.$emit("toDetailTask", params);
    },
    toDetailAuthor(id) {
      this.$emit("toDetailAuthor", id);
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
      switch (type) {
        case WorkflowEntityTextType.Notice:
          return false;
        default:
          return true;
      }
    }
  },
  filters: {}
};
</script>

<style lang="scss" scoped></style>
