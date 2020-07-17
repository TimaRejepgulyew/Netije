<template>
  <div>
    <div>
      <Header :isbackButton="true" :headerTitle="headerTitle">
        <important-indicator :isImportant="isImportant" slot="indicator"></important-indicator>
      </Header>
      <component :assignmentId="assignmentId" :is="componentByType('toolbar')" />
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
                  <DxSimpleItem template="authorId" data-field="authorId">
                    <DxLabel location="top" :text="$t('shared.from')" />
                  </DxSimpleItem>
                  <DxSimpleItem data-field="performerId" template="performerId">
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
                  <DxSimpleItem
                    data-field="body"
                    :editor-options="bodyOptions"
                    editor-type="dxTextArea"
                  >
                    <DxLabel location="top" :visible="false" />
                  </DxSimpleItem>
                </DxGroupItem>
              </DxGroupItem>
            </DxGroupItem>
            <DxGroupItem template="attachments" :col-span="3"></DxGroupItem>
            <template #authorId>
              <employee-select-box :value="authorId" :readOnly="true" />
            </template>
            <template #performerId>
              <employee-select-box :readOnly="true" :value="performerId" />
            </template>
            <template #comments>
              <div>
                <thread-texts class="comments" :id="assignmentId" entityType="assignment"></thread-texts>
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
import threadTexts from "~/components/workFlow/thread-text/thread-texts.vue";
import { mapGetters } from "vuex";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    threadTexts,
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
  props: ["assignmentId"],

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
    ...mapGetters({
      assignmentData: "currentAssignment/assignment"
    }),
    assignment() {
      return this.assignmentData(this.assignmentId);
    },
    performerId() {
      return this.assignmentData(this.assignmentId).performerId;
    },
    authorId() {
      return this.assignmentData(this.assignmentId).authorId;
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
        visible: this.$store.getters["currentAssignment/canUpdate"](
          this.assignmentId
        ),
        onValueChanged: e => {
          this.$store.commit("currentAssignment/SET_BODY", {
            key: this.assignmentId,
            payload: e.value
          });
        }
      };
    },
    InProcess() {
      return this.$store.getters["currentAssignment/inProcess"](
        this.assignmentId
      );
    },
    placeholder() {
      switch (
        this.$store.getters["currentAssignment/assignmentType"](
          this.assignmentId
        )
      ) {
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
      return (
        this.$store.getters["currentAssignment/assignment"](this.assignmentId)
          .importance === Importance.High
      );
    },
    headerTitle() {
      return this.$store.getters["currentAssignment/assignment"](
        this.assignmentId
      ).subject;
    },
    attachmentGroups() {
      return this.$store.getters["currentAssignment/assignment"](
        this.assignmentId
      ).attachmentGroups;
    }
  },
  methods: {
    componentByType(componentName) {
      const assignmentType = this.$store.getters[
        "currentAssignment/assignment"
      ](this.assignmentId).assignmentType;
      if (ComponentsByAssignmentType.has(assignmentType))
        return ComponentsByAssignmentType.get(assignmentType)[componentName];
    },
    detach(attachmentId) {
      this.$awn.async(
        this.$store.dispatch("currentAssignment/detachAttachment", {
          key: this.assignmentId,
          payload: attachmentId
        }),
        () => {},
        () => {}
      );
    },
    pasteAttachment(options) {
      this.$awn.async(
        this.$store.dispatch("currentAssignment/pasteAttachment", {
          key: this.assignmentId,
          payload: options
        }),
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



