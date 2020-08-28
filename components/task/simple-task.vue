<template>
  <DxForm
    ref="form"
    :read-only="readOnly"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="taskValidatorName"
  >
    <DxGroupItem>
      <DxGroupItem :col-count="10">
        <DxSimpleItem :editor-options="subjectOptions" :col-span="8" data-field="subject">
          <DxLabel location="left" :text="$t('task.fields.subjectTask')" />
          <DxRequiredRule :message="$t('task.validation.subjectRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="needsReview"
          :editor-options="needsReviewOptions"
          editor-type="dxCheckBox"
        >
          <DxLabel location="left" :text="$t('task.fields.needsReview')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-count="2">
        <DxSimpleItem
          data-field="maxDeadline"
          :editor-options="maxDeadlineOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="left" :text="$t('task.fields.deadLine')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="routeType"
          editor-type="dxSelectBox"
          :editor-options="routeTypeOptions"
        >
          <DxLabel location="left" :text="$t('task.fields.start')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxSimpleItem template="performers" data-field="performers">
        <DxRequiredRule :message="$t('task.validation.performersRequired')" />
        <DxLabel location="left" :text="$t('task.fields.performers')" />
      </DxSimpleItem>
      <DxSimpleItem :disabled="true" template="observers" data-field="observers">
        <DxLabel location="left" :text="$t('task.fields.observers')" />
      </DxSimpleItem>

      <DxSimpleItem
        v-if="isDraft"
        data-field="body"
        :editor-options="bodyOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="left" :text="$t('task.fields.comment')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #performers>
      <recipient-tag-box
        :messageRequired="$t('task.validation.performersRequired')"
        :validator-group="taskValidatorName"
        :read-only="readOnly"
        :recipients="performers"
        @setRecipients="setPerformers"
      />
    </template>
    <template #observers>
      <recipient-tag-box
        :read-only="readOnly"
        :recipients="observers"
        @setRecipients="setObservers"
      />
    </template>
  </DxForm>
</template>
<script>
import recipientTagBox from "~/components/page/recipient-tag-box.vue";
import "devextreme-vue/text-area";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    recipientTagBox,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
  },
  props: ["taskId", "canUpdate"],
  inject: ["taskValidatorName"],
  methods: {
    setObservers(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_OBSERVERS`, value);
    },
    setPerformers(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_PERFORMERS`, value);
    },
  },
  computed: {
    readOnly() {
      return !this.isDraft && !this.canUpdate;
    },
    task() {
      return this.$store.getters[`tasks/${this.taskId}/task`];
    },
    observers() {
      return this.task.observers;
    },
    performers() {
      return this.task.performers;
    },
    inProcess() {
      return this.$store.getters[`tasks/${this.taskId}/inProcess`];
    },
    isNew() {
      return this.$store.getters[`tasks${this.taskId}/isNew`];
    },
    isDraft() {
      return this.$store.getters[`tasks/${this.taskId}/isDraft`];
    },
    subjectOptions() {
      return {
        value: this.task.subject,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_SUBJECT`, e.value);
        },
      };
    },
    bodyOptions() {
      return {
        height: 250,
        value: this.task.body,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_BODY`, e.value);
        },
      };
    },
    maxDeadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.task.maxDeadline,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_MAX_DEADLINE`, e.value);
        },
      };
    },
    needsReviewOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.task.needsReview,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_NEEDS_REVIEW`, e.value);
        },
      };
    },
    routeTypeOptions() {
      return {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: [
          { id: 0, name: this.$t("task.fields.gradually") },
          { id: 1, name: this.$t("task.fields.parallel") },
        ],
        value: this.task.routeType,
        onValueChanged: (e) => {
          this.$store.commit(`tasks/${this.taskId}/SET_IMPORTANCE`, e.value);
        },
      };
    },
  },
};
</script>


