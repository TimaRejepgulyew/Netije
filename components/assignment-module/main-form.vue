<template>
  <form class="d-flex">
    <Header
      :isbackButton="!isCard"
      :showTitle="!isCard"
      :headerTitle="headerTitle"
    >
    </Header>
    <simple-assignment
      @onComplete="onComplete"
      @pasteAttachment="pasteAttachment"
      :assignmentId="assignmentId"
      :isCard="isCard"
    >
      <important-indicator
        tag="span"
        slot="importanceIndicator"
        v-if="isImportant"
        :isImportant="isImportant"
      ></important-indicator>
    </simple-assignment>

    <thread-texts
      slot="thread-texts"
      :isRefreshing="threadTextsResreshTracker"
      @refreshed="() => changeThreadTextsResreshTracker(false)"
      class="comments"
      :id="assignmentId"
      entityType="assignment"
    ></thread-texts>

    <attachment
      slot="attachment"
      :assignmentId="assignmentId"
      @detach="detach"
      @pasteAttachment="pasteAttachment"
      @reloadAttachment="reload"
      :attachmentGroups="attachmentGroups"
    />
  </form>
</template>
<script>
import { unload } from "~/infrastructure/services/assignmentService.js";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import importantIndicator from "~/components/assignment/impartant-indicator.vue";
import Importance from "~/infrastructure/constants/assignmentImportance.js";




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
    threadTexts: () =>
      import("~/components/workFlow/thread-text/thread-texts.vue"),
    attachment: () => import("~/components/workFlow/attachment/index.vue"),
    Header,
    importantIndicator,
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
<style scoped>
.comments {
  overflow: auto;
  max-height: 50vh;
}
@media screen and (min-device-height: 910px) {
  .comments {
    max-height: 60vh;
  }
}
</style>
