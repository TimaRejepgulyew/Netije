<template>
  <div>
    <div>
      <Header
        :isbackButton="!isCard"
        :showTitle="!isCard"
        :headerTitle="headerTitle"
      >
      </Header>
      <Tollbar
        @pasteAttachment="pasteAttachment"
        v-if="canUpdate"
        @complete="onComplete"
      >
        <slot name="importanceIndicator" slot="importanceIndicator"> </slot>
      </Tollbar>

      <form class="d-flex">
        <div class="item f-grow-3">
          <DxForm
            ref="form"
            :col-count="10"
            :form-data.sync="assignment"
            :show-colon-after-label="true"
            :show-validation-summary="true"
            :validation-group="assignmentValidatorName"
          >
            <DxGroupItem :col-span="7">
              <DxGroupItem template="info" :col-span="2"> </DxGroupItem>
            </DxGroupItem>
            <DxGroupItem template="attachments" :col-span="3" />
            <template #info>
              <slot name="info"></slot>
            </template>

            <template #comments>
              <slot name="thread-texts" />
            </template>
            <template #body>
              <div>
                <component
                  :value="body"
                  :assignmentId="assignmentId"
                  :is="componentByType('body')"
                />
              </div>
            </template>
            <template #additional>
              <div>
                <component
                  :assignmentId="assignmentId"
                  :is="componentByType('additional')"
                ></component>
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
import * as bodies from "~/components/assignment/body/index.js";
import * as toolbars from "~/components/assignment/toolbars/index.js";
import * as additional from "~/components/assignment/additional/index.js";
import { ComponentsByAssignmentType } from "~/infrastructure/services/generatorComponentByType.js";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import acquaintanceAssignmentDescription from "~/components/assignment/additional/acquaintance-assignment-description.vue";
import Header from "~/components/page/page__header";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import "devextreme-vue/text-area";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
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
    attachment: () => import("~/components/workFlow/attachment/index.vue"),
    Header,
    acquaintanceAssignmentDescription,
    importantIndicator,
    employeeSelectBox,
    ...toolbars,
    ...additional,
    ...bodies,
  },
  name: "assignment",
  props: ["assignmentId", "isCard"],
  provide: function () {
    return {
      assignmentValidatorName: this.assignmentValidatorName,
      isValidForm: this.validateForm,
    };
  },
  destroyed() {
    this.onClosed();
    unload(this, this.assignmentId);
  },
  data() {
    return {
      threadTextsResreshTracker: false,
      assignmentValidatorName: `assignment/${this.assignmentId}`,
      attachmentsUrl: dataApi.attachment.AttachmentByAssignment,
      commentsUrl: dataApi.assignment.TextsByAssignment,
      employeeOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Employee,
      }),
    };
  },
  computed: {
    body() {
      return this.$store.getters[`assignments/${this.assignmentId}/body`];
    },
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
        readOnly: true,
      };
    },
    dateTimeOptions() {
      return {
        readOnly: true,
        type: "datetime",
      };
    },

    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    isImportant() {
      return this.assignment.importance === Importance.High;
    },
    headerTitle() {
      return this.assignment.subject;
    },
    attachmentGroups() {
      return this.assignment.attachmentGroups;
    },
  },
  methods: {
    changeThreadTextsResreshTracker(value) {
      this.threadTextsResreshTracker = value;
    },
    onClosed() {
      this.$emit("onClosed", {
        assignmentId: this.assignmentId,
        assignmentType: this.assignment.assignmentType,
      });
    },
    onComplete(res) {
      this.changeThreadTextsResreshTracker(true);
    },
    validateForm() {
      if (this.$refs["form"].instance.validate().isValid) {
        return true;
      } else {
        return false;
      }
    },
    componentByType(componentName) {
      if (ComponentsByAssignmentType.has(this.assignment.assignmentType))
        return ComponentsByAssignmentType.get(this.assignment.assignmentType)[
          componentName
        ];
    },
    reload() {
      this.$store.dispatch(`assignments/${this.assignmentId}/reload`);
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
    },
  },
};
</script>


