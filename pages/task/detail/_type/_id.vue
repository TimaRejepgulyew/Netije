<template>
  <div id="form-demo">
    <Header :headerTitle="$t('translations.fields.createSimpleTask')"></Header>
    <toolbar />
    <DxForm
      ref="form"
      :col-count="3"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      validation-group="task"
    >
      <DxGroupItem :col-span="2">
        <DxGroupItem template="mainForm"></DxGroupItem>
        <DxSimpleItem v-if="!isDraft" template="comments">
          <DxLabel :visible="false" location="top" :text="$t('translations.headers.attachment')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem>
        <DxSimpleItem template="attachments">
          <DxLabel :visible="false" location="top" :text="$t('translations.headers.attachment')" />
        </DxSimpleItem>
      </DxGroupItem>

      <template #mainForm>
        <component :is="taskType"></component>
      </template>
      <template #attachments>
        <!-- <attachments></attachments> -->
      </template>
      <template #comments>
        <!-- <comments :url="commentsUrl"></comments> -->
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
  asyncData({ app, params }) {
    app.store.dispatch("currentTask/load", {
      type: +params.type,
      id: +params.id
    });
  },
  data() {
    return {
      commentsUrl: dataApi.task.TextsByTask
    };
  },
  computed: {
    isDraft() {
      return this.$store.getters["currentTask/isDraft"];
    },
    taskType() {
      switch (+this.$route.params.type) {
        case TaskType.SimpleTask:
          return "simple-task";
        case TaskType.AcquaintanceTask:
          return "acquaintance-task";
        case TaskType.ActionItemExecutionTask:
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

