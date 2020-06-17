<template>
  <div id="form-demo">
    <Header :headerTitle="header"></Header>
    <toolbar />
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
        <attachments></attachments>
      </template>
      <template #comments>
        <comments :url="commentsUrl"></comments>
      </template>
    </DxForm>
  </div>
</template>
<script>
import simpleTask from "~/components/task/simple-task.vue";
import acquaintanceTask from "~/components/task/acquaintance-task.vue";
import actionItemExecutionTask from "~/components/task/action-item-execution-task.vue";
import TaskType from "~/infrastructure/constants/taskType.js";
import toolbar from "~/components/task/toolbar.vue";
import comments from "~/components/workFlow/assignment-comments.vue";
import Header from "~/components/page/page__header";
import attachments from "~/components/task/attachment-details";
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
    comments,
    toolbar,
    attachments,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm
  },
  data() {
    return {
      taskTypeGuid: this.$store.getters["currentTask/task"].taskType,
      commentsUrl: dataApi.task.TextsByTask,
      header: ""
    };
  },
  computed: {
    isDraft() {
      return this.$store.getters["currentTask/isDraft"];
    },
    taskType() {
      switch (this.taskTypeGuid) {
        case TaskType.SimpleTask:
          this.header = this.$t("translations.fields.createSimpleTask");
          return "simple-task";
        case TaskType.AcquaintanceTask:
          this.header = this.$t("translations.fields.createAcquaintanceTask");
          return "acquaintance-task";
        case TaskType.ActionItemExecutionTask:
          this.header = this.$t(
            "translations.fields.createActionItemExecutionTask"
          );
          return "action-item-execution-task";
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

