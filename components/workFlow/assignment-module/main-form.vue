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
      @created="() => changeThreadTextsResreshTracker(true)"
      @pasteAttachment="pasteAttachment"
      :assignmentId="assignmentId"
      :isCard="isCard"
    >
      <CreateChildTaskBtn
        @created="() => changeThreadTextsResreshTracker(true)"
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
      <MarkAsUnread slot="markAsUnread" @onClose="onClose" :assignmentId="assignmentId" />
    </component>
  </form>
</template>
<script>
//services and constants
import Importance from "../infrastructure/constants/taskImportance.js";
import { unload } from "../infrastructure/services/assignmentService.js";

//components
import Header from "~/components/page/page__header";
import CreateChildTaskBtn from "./form-components/toolbar-components/create-children-task-btn";
import AssignmentFormComponent from "./form-by-type/exchange/AssignmentFormComponent";
import Info from "./form-components/info-form.vue";
import importantIndicator from "./form-components/impartant-indicator";
import MarkAsUnread from "./form-components/toolbar-components/mark-as-unread";
export default {
  components: {
    threadTexts: () => import("../thread-text/thread-texts.vue"),
    attachment: () => import("../attachment/index.vue"),
    Info,
    Header,
    importantIndicator,
    CreateChildTaskBtn,
    MarkAsUnread,
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
      if (value) {
        setTimeout(() => {
          this.threadTextsResreshTracker = value;
        }, 3000);
      } else this.threadTextsResreshTracker = value;
    },
    onClose() {
      this.$emit("onClose");
    },
    onClosed() {
      this.$emit("onClosed", {
        assignmentId: this.assignmentId,
        assignmentType: this.assignment.assignmentType,
      });
    },
    onComplete() {
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
