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
          <div @click="() => toDetailTask(data.item.entity)" class="link">
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
            v-if="data.item.entity.maxDeadline"
            :class="{ expired: data.item.isExpired }"
          >
            {{ $t("translations.fields.deadLine") }}:
            {{ formatDate(data.item.entity.maxDeadline) }}
          </div>
          <status-indicator :data="data.item.entity" />
        </div>
      </div>
      <div v-if="data.item.body" class="list__content message-body">
        {{ data.item.body }}
      </div>
    </div>
    <tread-text-component
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
import TaskThreadTextModel from "../infrastructure/models/ThreadText/TaskThreadText.js";
import { load } from "../infrastructure/services/taskService.js";
import ActionItemType from "../infrastructure/constants/actionItemType.js";
import TaskTypeGuid from "../infrastructure/constants/taskType.js";
import statusIndicator from "./indicator-state/task-indicators/status-indicator.vue";
import threadTextComponentAuthor from "./thread-text-item-components/author.vue";
import TaskType from "../infrastructure/models/TaskType.js";
import userIcon from "~/components/Layout/userIcon.vue";
import WorkflowEntityTextType from "../infrastructure/constants/workflowEntityTextType";
import moment from "moment";
export default {
  components: {
    statusIndicator,
    threadTextComponentAuthor,
    userIcon,
    treadTextComponent: () => import("./thread-text-component.vue"),
  },
  name: "task-item",
  props: ["data"],
  computed: {
    taskThreadText() {
      return new TaskThreadTextModel(this);
    },
  },
  methods: {
    // TODO maybe in future need to  use this functionality
    // isLinkTask({ taskType }) {
    //   switch (taskType) {
    //     case TaskTypeGuid.IntranetExchangeDocumentProcessingTask:
    //       return false;
    //     default:
    //       return true;
    //   }
    // },
    toDetailTask({ id, taskType }) {
      this.taskThreadText.showCard(this, { id, taskType });
    },
    parseSubject(entity) {
      return this.taskThreadText.generateSubject(entity);
    },
    formatDate(date) {
      console.log(date);
      if (date) return this.taskThreadText.formatDate(date);
    },
  },
};
</script>

<style lang="scss" >
</style>
