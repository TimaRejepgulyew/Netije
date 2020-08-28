<template>
  <div id="form-demo">
    <Header :headerTitle="headerTitle" :isNew="isNew" :isbackButton="!isCard"></Header>
    <toolbar
      v-if="canUpdate"
      :taskId="taskId"
      @onRemove="onRemove"
      @onClose="onClose"
      @onSave="onSave"
      @onStart="onStart"
    />
    <DxForm
      ref="form"
      :col-count="10"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :validation-group="taskValidatorName"
    >
      <DxGroupItem :col-span="7">
        <DxGroupItem template="mainForm"></DxGroupItem>
        <DxSimpleItem v-if="!isDraft" template="comments"></DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-span="3">
        <DxSimpleItem template="attachments">
          <DxLabel :visible="false" location="left" :text="$t('task.attachment')" />
        </DxSimpleItem>
      </DxGroupItem>

      <template #mainForm>
        <component :canUpdate="canUpdate" :taskId="taskId" :is="taskTypeComponent"></component>
      </template>
      <template #attachments>
        <attachment
          @pasteAttachment="pasteAttachment"
          @detach="detach"
          :attachmentGroups="attachmentGroups"
        />
      </template>
      <template #comments>
        <thread-texts v-if="!isDraft" entityType="task" :id="taskId"></thread-texts>
      </template>
    </DxForm>
  </div>
</template>
<script>
import TaskTypeModel from "~/infrastructure/models/TaskType.js";
import taskChangeTracker from "~/infrastructure/services/taskChangeTracker.js";
import documentReviewTask from "~/components/task/document-review-task.vue";
import simpleTask from "~/components/task/simple-task.vue";
import acquaintanceTask from "~/components/task/acquaintance-task.vue";
import actionItemExecutionTask from "~/components/task/action-item-execution-task.vue";
import TaskType from "~/infrastructure/constants/taskType.js";
import toolbar from "~/components/task/toolbar.vue";
import Header from "~/components/page/page__header";
import attachment from "~/components/workFlow/attachment.vue";
import { unload } from "~/infrastructure/services/taskService.js";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  name: "task",
  components: {
    simpleTask,
    acquaintanceTask,
    actionItemExecutionTask,
    threadTexts: () =>
      import("~/components/workFlow/thread-text/thread-texts.vue"),
    toolbar,
    attachment,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    documentReviewTask,
  },
  props: {
    taskId: {
      type: Number,
    },
    isCard: {
      default: false,
    },
  },
  provide: function () {
    return {
      taskValidatorName: this.taskValidatorName,
      isValidTask: this.validateForm,
    };
  },
  destroyed() {
    unload(this, this.taskId);
  },
  data() {
    return {
      taskValidatorName: `task/${this.taskId}`,
      commentsUrl: dataApi.task.TextsByTask,
    };
  },

  methods: {
    validateAttachment() {
      let isValid = true;
      let attachments = this.$store.getters[
        `tasks/${this.taskId}/task`
      ].attachmentGroups.filter((attachment) => attachment.isRequired);
      attachments.forEach((attachment) => {
        if (!attachment.entities) isValid = false;
      });
      if (!isValid) {
        alert(this.generateHtmlError(attachments), this.$t("shared.error"));
      }
      return isValid;
    },
    validateForm() {
      if (this.validateAttachment())
        return this.$refs["form"].instance.validate().isValid;
    },
    onClose() {
      this.$emit("onClose", this.taskId);
    },
    onSave() {
      this.$emit("onSave", {
        taskId: this.taskId,
        taskType: this.task.taskType,
      });
    },
    onStart() {
      this.$emit("onStart", {
        taskId: this.taskId,
        taskType: this.task.taskType,
      });
      this.$emit("onClose", this.taskId);
    },
    onRemove() {
      this.$emit("onRemove", this.taskId);
      this.$emit("onClose", this.taskId);
    },
    detach(attachmentId) {
      this.$awn.async(
        this.$store.dispatch(
          `tasks/${this.taskId}/detachAttachment`,
          attachmentId
        ),
        () => {},
        () => {}
      );
    },
    pasteAttachment(options) {
      this.$awn.async(
        this.$store.dispatch(`tasks/${this.taskId}/pasteAttachment`, options),
        () => {},
        () => {}
      );
    },
  },
  computed: {
    taskTypeModel() {
      return new TaskTypeModel(this);
    },
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    },
    canUpdate() {
      return this.$store.getters[`tasks/${this.taskId}/canUpdate`];
    },
    taskType() {
      return this.task.taskType;
    },
    headerTitle() {
      return this.isNew
        ? this.taskTypeModel.getById(this.taskType).text
        : this.task.subject;
    },
    attachmentGroups() {
      return this.task.attachmentGroups;
    },
    isDraft() {
      return this.$store.getters[`tasks/${this.taskId}/isDraft`];
    },
    isNew() {
      return this.$store.getters[`tasks/${this.taskId}/isNew`];
    },

    taskTypeComponent() {
      switch (this.taskType) {
        case TaskType.SimpleTask:
          return "simple-task";
        case TaskType.AcquaintanceTask:
          return "acquaintance-task";
        case TaskType.ActionItemExecutionTask:
          return "action-item-execution-task";
        case TaskType.DocumentReviewTask:
          return "document-review-task";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.message--error {
  display: inline;
  color: #d9534f;
  border-bottom: 1px dashed #d9534f;
  i {
    font-size: 25px;
  }
}
</style>

