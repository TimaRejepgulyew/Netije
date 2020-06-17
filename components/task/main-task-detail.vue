<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="$t('translations.headers.moreAbout')"></Header>

      <simple-toolbar />
      <form class="d-flex">
        <div class="item f-grow-3">
          <DxForm
            :col-count="1"
            :form-data.sync="task"
            :read-only="true"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            validation-group="task"
          >
            <DxGroupItem :col-span="3" :caption="$t('translations.fields.main')">
              <DxGroupItem :col-count="2">
                <DxSimpleItem :editor-options="subjectOptions" :col-span="2" data-field="subject">
                  <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
                </DxSimpleItem>
                <DxSimpleItem
                  data-field="authorId"
                  :editor-options="employeeOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel location="top" :text="$t('translations.fields.authorId')" />
                </DxSimpleItem>
                <DxSimpleItem
                  data-field="deadline"
                  :editor-options="dateTimeOptions"
                  editor-type="dxDateBox"
                >
                  <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
                </DxSimpleItem>
              </DxGroupItem>
              <DxSimpleItem template="individual"></DxSimpleItem>
              <DxSimpleItem data-field="id" template="comments">
                <DxLabel location="top" :text="$t('translations.fields.comments')" />
              </DxSimpleItem>
            </DxGroupItem>
            <template #comments>
              <div>
                <status-message />
                <Assignment-comments v-if="!isReload" :url="commentsUrl"></Assignment-comments>
              </div>
            </template>
            <template #employee="employee">
              <employeeList :employee="employee.data.editorOptions.value"></employeeList>
            </template>
            <template #individual>
              <slot name="information"></slot>
            </template>
          </DxForm>
        </div>
        <div class="item">
          <attachmentDetails v-if="!isReload" :url="attachmentsUrl" :readOnly="true"></attachmentDetails>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import simpleToolbar from "~/components/task/simpleToolbar.vue";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import attachmentDetails from "~/components/task/attachment-details";
import AssignmentComments from "~/components/workFlow/assignment-comments";
import statusMessage from "~/components/task/status-message";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    simpleToolbar,
    statusMessage,
    AssignmentComments,
    attachmentDetails,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm
  },
  data() {
    return {
      attachmentsUrl: dataApi.attachment.AttachmentByTask,
      commentsUrl: dataApi.task.TextsByTask,
      dateTimeOptions: {
        type: "datetime"
      },
      employeeOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee
      })
    };
  },
  computed: {
    subjectOptions() {
      return {
        onClick: e => {
          this.$store.commit("currentTask/SET_SUBJECT", e.value);
        }
      };
    },
    task() {
      return this.$store.getters["currentTask/task"];
    },
    isReload() {
      return this.$store.getters["currentTask/reload"];
    }
  }
};
</script>
<style scoped>
.navBar {
  display: flex;
  justify-content: flex-end;
  justify-items: flex-end;
}
</style>

