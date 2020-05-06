<template>
  <div id="form-demo">
    <div class="widget-container">
      <DxLoadPanel :visible.sync="isReload" id="large-indicator" :indicatorSrc="icon" />
      <Header :headerTitle="$t('translations.headers.moreAbout')"></Header>
      <status-message :importance="assignmentProp.importance" :completed="assignmentProp.status" />
      <div class="navBar">
        <slot name="navbarBtn"></slot>
        <DxButton icon="refresh" :on-click="reload" />
      </div>
      <form class="d-flex">
        <div class="item f-grow-3">
          <slot name="information"></slot>
          <DxForm
            :col-count="1"
            :form-data.sync="assignment"
            :read-only="true"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            validation-group="assignment"
          >
            <DxGroupItem :col-span="3">
              <DxGroupItem>
                <DxSimpleItem data-field="id" template="comments">
                  <DxLabel location="top" :text="$t('translations.fields.comments')" />
                </DxSimpleItem>
              </DxGroupItem>
              <DxButtonItem :button-options="cancelButtonOptions" horizontal-alignment="left" />
            </DxGroupItem>
            <template #comments>
              <div>
                <Assignment-comments v-if="!isReload" :url="commentsUrl"></Assignment-comments>
                <slot name="comment" />
              </div>
            </template>
            <template #employee="employee">
              <employeeList :employee="employee.data.editorOptions.value"></employeeList>
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
import dataApi from "~/static/dataApi";
import { DxLoadPanel } from "devextreme-vue/load-panel";
import Header from "~/components/page/page__header";
import attachmentDetails from "~/components/assignment/attachment-details";
import DxButton from "devextreme-vue/button";
import AssignmentComments from "~/components/workFlow/assignment-comments";
import statusMessage from "~/components/workFlow/status-message";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    statusMessage,
    AssignmentComments,
    attachmentDetails,
    DxButton,
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxForm,
    DxLoadPanel
  },
  props: ["assignment"],

  data() {
    return {
      attachmentsUrl: dataApi.attachment.AttachmentByAssignment,
      commentsUrl: dataApi.assignment.TextsByAssignment,
      dateTimeOptions: {
        type: "datetime"
      },
      isReload: false,
      icon: require("~/static/icons/loading.gif")
    };
  },
  methods: {
    async reload() {
      this.isReload = true;
      setTimeout(() => {
        this.isReload = false;
      }, 1000);
    },
    backTo() {
      this.$router.go(-1);
    }
  },
  computed: {
    assignmentProp() {
      return this.assignment;
    },
    cancelButtonOptions() {
      return this.$store.getters["globalProperties/btnCancel"](
        this,
        this.backTo
      );
    }
  }
};
</script>
<style scoped>
form {
  margin: 10px;
}
.navBar {
  display: flex;
  justify-content: flex-end;
  justify-items: flex-end;
}
</style>

