<template>
  <div>
    <div>
      <Header :isbackButton="true" :headerTitle="headerTitle">
        <important-indicator :isImportant="isImportant" slot="indicator"></important-indicator>
      </Header>
      <component v-if="canUpdate" :assignmentId="assignmentId" :is="componentByType('toolbar')" />
      <form class="d-flex">
        <div class="item f-grow-3">
          <DxForm
            :col-count="10"
            :form-data.sync="assignment"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            validation-group="assignment"
          >
            <DxGroupItem :col-span="7">
              <DxGroupItem :col-span="2">
                <DxSimpleItem :editor-options="subjectOptions" :col-span="4" data-field="subject">
                  <DxLabel location="left" :text="$t('translations.fields.subjectTask')" />
                </DxSimpleItem>
                <DxGroupItem :col-count="3">
                  <DxSimpleItem
                    data-field="deadline"
                    :editor-options="dateTimeOptions"
                    editor-type="dxDateBox"
                  >
                    <DxLabel location="left" :text="$t('translations.fields.deadLine')" />
                  </DxSimpleItem>
                  <DxSimpleItem template="authorId" data-field="authorId">
                    <DxLabel location="left" :text="$t('shared.from')" />
                  </DxSimpleItem>
                  <DxSimpleItem data-field="performerId" template="performerId">
                    <DxLabel location="left" :text="$t('shared.whom')" />
                  </DxSimpleItem>
                </DxGroupItem>
              </DxGroupItem>
              <DxGroupItem :col-span="3" template="additional" />
              <DxGroupItem :col-span="3">
                <DxGroupItem>
                  <DxSimpleItem template="comments">
                    <DxLabel location="left" :visible="false" />
                  </DxSimpleItem>
                  <DxSimpleItem :editor-options="bodyOptions" editor-type="dxTextArea">
                    <DxLabel location="left" :visible="false" />
                  </DxSimpleItem>
                </DxGroupItem>
              </DxGroupItem>
            </DxGroupItem>
            <DxGroupItem template="attachments" :col-span="3"></DxGroupItem>
            <template #authorId>
              <employee-select-box valueExpr="id" :value="authorId" :readOnly="true" />
            </template>
            <template #performerId>
              <employee-select-box valueExpr="id" :readOnly="true" :value="performerId" />
            </template>
            <template #comments>
              <div>
                <thread-texts class="comments" :id="assignmentId" entityType="assignment"></thread-texts>
              </div>
            </template>
            <template #additional>
              <div>
                <component :assignmentId="assignmentId" :is="componentByType('additional')"></component>
              </div>
            </template>
            <template #attachments>
              <div>
                <attachment
                  :assignmentId="assignmentId"
                  @detach="detach"
                  @pasteAttachment="pasteAttachment"
                  @reloadAttachment="reload"
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
import { unload } from "~/infrastructure/services/assignmentService.js";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import importantIndicator from "~/components/assignment/impartant-indicator.vue";
import Importance from "~/infrastructure/constants/assignmentImportance.js";
import * as toolbars from "~/components/assignment/toolbars/index.js";
import * as additional from "~/components/assignment/additional/index.js";
import { ComponentsByAssignmentType } from "~/infrastructure/services/generatorComponentByType.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import acquaintanceAssignmentDescription from "~/components/assignment/additional/acquaintance-assignment-description.vue";
import Header from "~/components/page/page__header";
import attachment from "~/components/workFlow/attachment.vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import "devextreme-vue/text-area";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    threadTexts: () =>
      import("~/components/workFlow/thread-text/thread-texts.vue"),
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm,
    attachment,
    Header,
    acquaintanceAssignmentDescription,
    importantIndicator,
    employeeSelectBox,
    ...toolbars,
    ...additional
  },
  name: "assignment",
  props: ["assignmentId"],
  destroyed() {
    unload(this, this.assignmentId);
  },
  data() {
    return {
      attachmentsUrl: dataApi.attachment.AttachmentByAssignment,
      commentsUrl: dataApi.assignment.TextsByAssignment,
      employeeOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee
      })
    };
  },
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
    performerId() {
      return this.assignment.performerId;
    },
    authorId() {
      return this.assignment.authorId;
    },
    subjectOptions() {
      return {
        readOnly: true
      };
    },
    dateTimeOptions() {
      return {
        readOnly: true,
        type: "datetime"
      };
    },
    bodyOptions() {
      return {
        placeholder: this.placeholder,
        visible: this.canUpdate,
        value: this.assignment.body,
        onValueChanged: e => {
          this.$store.commit(
            `assignments/${this.assignmentId}/SET_BODY`,
            e.value
          );
        }
      };
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    placeholder() {
      switch (this.assignment.assignmentType) {
        case AssignmentType.AcquaintanceFinishAssignment:
        case AssignmentType.SimpleAssignment:
        case AssignmentType.ActionItemSupervisorAssignment:
        case AssignmentType.ReviewAssignment:
        case AssignmentType.AcquaintanceAssignment:
          return this.$t("assignment.placeholderSimple");
        case AssignmentType.ActionItemExecutionAssignment:
          return this.$t("assignment.placeholderActionItemExicution");
        default:
          return this.$t("assignment.placeholderSimple");
      }
    },
    isImportant() {
      return this.assignment.importance === Importance.High;
    },
    headerTitle() {
      return this.assignment.subject;
    },
    attachmentGroups() {
      return this.assignment.attachmentGroups;
    }
  },
  methods: {
    componentByType(componentName) {
      if (ComponentsByAssignmentType.has(this.assignment.assignmentType))
        return ComponentsByAssignmentType.get(this.assignment.assignmentType)[
          componentName
        ];
    },
    reload() {
      this.$awn.asyncBlock(
        this.$store.dispatch(`assignments/${this.assignmentId}/reload`)
      );
    },
    detach(attachmentId) {
      this.$awn.async(
        this.$store.dispatch(
          `assignments/${this.assignmentId}/detachAttachment`,
          attachmentId
        ),
        () => {},
        () => {}
      );
    },
    pasteAttachment(options) {
      this.$awn.async(
        this.$store.dispatch(
          `assignments/${this.assignmentId}/pasteAttachment`,
          options
        ),
        () => {},
        () => {}
      );
    }
  }
};
</script>
<style  scoped>
.comments {
  overflow: auto;
  max-height: 50vh;
}
</style>



