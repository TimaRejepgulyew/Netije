<template>
  <div id>
    <div class>
      <Header :isbackButton="true" :headerTitle="headerTitle"></Header>
      <component :is="componentByType('toolbar')" />

      <form class="d-flex">
        <div class="item f-grow-3">
          <DxForm
            :col-count="10"
            :form-data.sync="assignment"
            :read-only="true"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            validation-group="assignment"
          >
            <DxGroupItem :col-span="7">
              <DxGroupItem :col-span="2">
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
              <DxGroupItem :col-span="3" template="additional" />
              <DxGroupItem :col-span="3">
                <DxGroupItem>
                  <DxSimpleItem template="comments">
                    <DxLabel location="top" :visible="false" />
                  </DxSimpleItem>
                </DxGroupItem>
              </DxGroupItem>
            </DxGroupItem>
            <DxGroupItem template="attachments" :col-span="3"></DxGroupItem>

            <template #comments>
              <div>
                <status-message />
                <Assignment-comments :url="commentsUrl"></Assignment-comments>
              </div>
            </template>
            <template #additional>
              <div>
                <component :is="componentByType('additional')"></component>
              </div>
            </template>
            <template #attachments>
              <div>
                <attachment
                  @detach="detach"
                  @pasteAttachment="pasteAttachment"
                  :attachmentGroups="attachmentGroups"
                />
              </div>
            </template>
          </DxForm>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import * as toolbars from "~/components/assignment/toolbars/index.js";
import * as additional from "~/components/assignment/additional/index.js";
import { ComponentsByAssignmentType } from "~/infrastructure/services/generatorComponentByType.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import acquaintanceAssignmentDescription from "~/components/assignment/additional/acquaintance-assignment-description.vue";
import Header from "~/components/page/page__header";
import attachment from "~/components/workFlow/attachment.vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { DxTextArea } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import AssignmentComments from "~/components/workFlow/assignment-comments";
import Toolbar from "~/components/assignment/toolbar.vue";
import statusMessage from "~/components/assignment/status-message";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
console.log("oh work ,", additional);
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTextArea,
    Toolbar,
    statusMessage,
    AssignmentComments,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm,
    attachment,
    Header,
    acquaintanceAssignmentDescription,
    ...toolbars,
    ...additional
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
  computed: {
    headerTitle() {
      return this.$store.getters["currentAssignment/assignment"].subject;
    },
    attachmentGroups() {
      return this.$store.getters["currentAssignment/assignment"]
        .attachmentGroups;
    }
  },
  methods: {
    componentByType(componentName) {
      const assignmentType = this.$store.getters["currentAssignment/assignment"]
        .assignmentType;
      console.log(
        ComponentsByAssignmentType.get(assignmentType)[componentName]
      );
      if (ComponentsByAssignmentType.has(assignmentType))
        return ComponentsByAssignmentType.get(assignmentType)[componentName];
    },
    detach(attachmentId) {
      this.$awn.async(
        this.$store.dispatch(
          "currentAssignment/detachAttachment",
          attachmentId
        ),
        () => {},
        () => {}
      );
    },
    pasteAttachment(options) {
      this.$awn.async(
        this.$store.dispatch("currentAssignment/pasteAttachment", options),
        () => {},
        () => {}
      );
    }
  }
};
</script>



