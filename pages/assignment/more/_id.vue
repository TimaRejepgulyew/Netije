<template>
  <div id>
    <div class>
      <toolbar />
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
            <DxGroupItem :col-span="2" :caption="$t('translations.headers.moreAbout')">
              <DxSimpleItem :col-span="4" data-field="subject">
                <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
              </DxSimpleItem>
              <DxGroupItem :col-count="3">
                <DxSimpleItem
                  data-field="deadline"
                  :editor-options="dateTimeOptions"
                  editor-type="dxDateBox"
                >
                  <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
                </DxSimpleItem>
                <DxSimpleItem
                  data-field="performerId"
                  :editor-options="employeeOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel location="top" :text="$t('shared.from')" />
                </DxSimpleItem>
                <DxSimpleItem
                  data-field="performerId"
                  :editor-options="employeeOptions"
                  editor-type="dxSelectBox"
                >
                  <DxLabel location="top" :text="$t('shared.whom')" />
                </DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>

            <DxGroupItem :col-span="3">
              <DxGroupItem>
                <DxSimpleItem template="comments">
                  <DxLabel location="top" :visible="false" />
                </DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
            <template #comments>
              <div>
                <status-message />
                <Assignment-comments :url="commentsUrl"></Assignment-comments>
                <slot name="Test"></slot>
              </div>
            </template>
          </DxForm>
        </div>
        <div class="item">
          <attachmentDetails :url="attachmentsUrl" :readOnly="true"></attachmentDetails>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { DxTextArea } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import attachmentDetails from "~/components/assignment/attachment-details";
import AssignmentComments from "~/components/workFlow/assignment-comments";
import Toolbar from "~/components/assignment/toolbar.vue";
import statusMessage from "~/components/assignment/status-message";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTextArea,
    Toolbar,
    statusMessage,
    AssignmentComments,
    attachmentDetails,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm
  },
  async asyncData({ app, params }) {
    await app.store.dispatch("currentAssignment/load", params.id);
    return {
      assignment: app.store.getters["currentAssignment/assignment"]
    };
  },
  data() {
    return {
      attachmentsUrl: dataApi.attachment.AttachmentByAssignment,
      commentsUrl: dataApi.assignment.TextsByAssignment,
      dateTimeOptions: {
        type: "datetime"
      },
      dateTimeOptions: {
        type: "datetime"
      },
      employeeOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee
      })
    };
  },
};
</script>



