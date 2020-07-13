<template>
  <div id="form-demo">
    <Header :headerTitle="headerTitle" :isNew="isNew" :isbackButton="!isCard"></Header>
    <toolbar @backTo="backTo" />
    <DxForm
      ref="form"
      :col-count="10"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      validation-group="task"
    >
      <DxGroupItem :col-span="7">
        <DxGroupItem template="mainForm"></DxGroupItem>
        <DxSimpleItem v-if="!isDraft" template="comments">
          <DxLabel :visible="false" location="top" :text="$t('translations.headers.attachment')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-span="3">
        <DxSimpleItem template="attachments">
          <DxLabel :visible="false" location="top" :text="$t('translations.headers.attachment')" />
        </DxSimpleItem>
      </DxGroupItem>

      <template #mainForm>
        <component :is="taskType"></component>
      </template>
      <template #attachments>
        <attachment
          @pasteAttachment="pasteAttachment"
          @detach="detach"
          :attachmentGroups="attachmentGroups"
        />
      </template>
      <template #comments>
        <thread-texts v-if="!isDraft" entityType="task" :id="$store.getters['currentTask/task'].id"></thread-texts>
      </template>
    </DxForm>
  </div>
</template>
<script>
import documentReviewTask from "~/components/task/document-review-task.vue";
import simpleTask from "~/components/task/simple-task.vue";
import acquaintanceTask from "~/components/task/acquaintance-task.vue";
import actionItemExecutionTask from "~/components/task/action-item-execution-task.vue";
import TaskType from "~/infrastructure/constants/taskType.js";
import toolbar from "~/components/task/toolbar.vue";
import threadTexts from "~/components/workFlow/thread-text/thread-texts.vue";
import Header from "~/components/page/page__header";
import attachment from "~/components/workFlow/attachment.vue";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    simpleTask,
    acquaintanceTask,
    actionItemExecutionTask,
    threadTexts,
    toolbar,
    attachment,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    documentReviewTask
  },
  props: {
    isCard: {
      default: false
    }
  },
  data() {
    return {
      taskTypeNames: null,
      taskTypeGuid: this.$store.getters["currentTask/task"].taskType,
      commentsUrl: dataApi.task.TextsByTask
    };
  },
  created() {
    const taskTypeNames = new Map();
    for (let item in TaskType) {
      taskTypeNames.set(
        TaskType[item],
        this.$t(`createItemDialog.${item[0].toLowerCase() + item.slice(1)}`)
      );
    }
    this.taskTypeNames = taskTypeNames;
  },
  methods: {
    backTo() {
      if (this.isCard) {
        const taskId = this.$store.getters["currentTask/task"].id;
        this.$emit("closeTask", taskId);
      } else this.$router.go(-1);
    },
    detach(attachmentId) {
      this.$awn.async(
        this.$store.dispatch("currentTask/detachAttachment", attachmentId),
        () => {},
        () => {}
      );
    },
    pasteAttachment(options) {
      this.$awn.async(
        this.$store.dispatch("currentTask/pasteAttachment", options),
        () => {},
        () => {}
      );
    }
  },
  computed: {
    headerTitle() {
      return this.isNew
        ? this.taskTypeNames.get(this.taskTypeGuid)
        : this.$store.getters["currentTask/task"].subject;
    },
    attachmentGroups() {
      return this.$store.getters["currentTask/task"].attachmentGroups;
    },
    isDraft() {
      return this.$store.getters["currentTask/isDraft"];
    },
    isNew() {
      return this.$store.getters["currentTask/isNew"];
    },
    taskType() {
      switch (this.taskTypeGuid) {
        case TaskType.SimpleTask:
          return "simple-task";
        case TaskType.AcquaintanceTask:
          return "acquaintance-task";
        case TaskType.ActionItemExecutionTask:
          return "action-item-execution-task";
        case TaskType.DocumentReviewTask:
          return "document-review-task";
      }
    }
  }
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

