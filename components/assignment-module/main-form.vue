<template>
  <form>
    <Header
      :isbackButton="!isCard"
      :showTitle="!isCard"
      :headerTitle="headerTitle"
    >
    </Header>
    <component
      :is="assignmentFormByType"
      @onComplete="onComplete"
      @pasteAttachment="pasteAttachment"
      :assignmentId="assignmentId"
      :isCard="isCard"
    >
      <CreateChildTaskBtn
        slot="createChildTask"
        :parentAssignmentId="assignmentId"
      />
      <important-indicator
        tag="span"
        slot="importanceIndicator"
        v-if="isImportant"
        :isImportant="isImportant"
      ></important-indicator>
      <Info slot="info" :assignmentId="assignmentId" />
      <thread-texts
        slot="thread-texts"
        :isRefreshing="threadTextsResreshTracker"
        @refreshed="() => changeThreadTextsResreshTracker(false)"
        class="comments"
        :id="assignmentId"
        entityType="assignment"
      ></thread-texts>
      <attachment
        slot="attachments"
        :assignmentId="assignmentId"
        @detach="detach"
        @pasteAttachment="pasteAttachment"
        @reloadAttachment="reload"
        :attachmentGroups="attachmentGroups"
      />
    </component>
  </form>
</template>
<script>
import DxForm, { DxGroupItem } from "devextreme-vue/form";
import Header from "~/components/page/page__header";
import dataApi from "~/static/dataApi";
import Importance from "~/infrastructure/constants/taskImportance.js";
import { unload } from "./infrastructure/services/assignmentService.js";

import CreateChildTaskBtn from "./form-components/toolbar-components/create-children-task-btn";
import AssignmentFormComponent from "./form-by-type/free-approval/AssignmentFormComponent.js";
import Info from "./form-components/info-form.vue";
import importantIndicator from "./form-components/impartant-indicator";
export default {
  components: {
    threadTexts: () =>
      import("~/components/workFlow/thread-text/thread-texts.vue"),
    attachment: () => import("~/components/workFlow/attachment/index.vue"),
    Info,
    Header,
    importantIndicator,
    CreateChildTaskBtn,
  },
  name: "assignment",
  props: ["assignmentId", "isCard"],
  destroyed() {
    this.onClosed();
    unload(this, this.assignmentId);
  },
  data() {
    return {
      threadTextsResreshTracker: false,
    };
  },
  computed: {
    assignmentFormByType() {
      return AssignmentFormComponent(this.assignment.assignmentType);
    },
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    isImportant() {
      return this.assignment.importance === Importance.High;
    },
    headerTitle() {
      return this.assignment?.subject;
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
@media screen and (min-device-height: 910px) {
  .comments {
    max-height: 60vh;
  }
}
</style>
