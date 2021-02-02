<template>
  <div id="form-demo">
    <DxForm
      ref="form"
      :read-only="readOnly"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      :validation-group="taskValidatorName"
    >
      <DxGroupItem>
        <DxGroupItem :col-count="10">
          <DxSimpleItem :editor-options="subjectOptions" :col-span="8" data-field="subject">
            <DxLabel location="left" :text="$t('task.fields.subjectTask')" />
            <DxRequiredRule :message="$t('task.validation.subjectRequired')" />
          </DxSimpleItem>
          <DxSimpleItem
            :col-span="2"
            data-field="needsReview"
            :editor-options="needsReviewOptions"
            editor-type="dxCheckBox"
          >
            <DxLabel location="left" :text="$t('task.fields.needsReview')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :col-count="3">
          <DxSimpleItem
            :col-span="2"
            data-field="deadline"
            :editor-options="deadlineOptions"
            editor-type="dxDateBox"
          >
            <DxLabel location="left" :text="$t('task.fields.deadLine')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="isElectronicAcquaintance"
            :editor-options="isElectronicAcquaintanceOptions"
            editor-type="dxCheckBox"
          >
            <DxLabel location="left" :text="$t('task.fields.isElectronicAcquaintance')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxSimpleItem data-field="performers" template="performers">
          <DxRequiredRule :message="$t('task.validation.acquaintMembersRequired')" />
          <DxLabel location="left" :text="$t('task.fields.acquaintMembers')" />
        </DxSimpleItem>
        <DxSimpleItem template="observers" data-field="observers">
          <DxLabel location="left" :text="$t('task.fields.observers')" />
        </DxSimpleItem>
        <DxSimpleItem template="excludedPerformers" data-field="excludedPerformers">
          <DxLabel location="left" :text="$t('task.fields.excludedPerformers')" />
        </DxSimpleItem>

        <DxSimpleItem v-if="isDraft" data-field="body" editor-type="dxTextArea" template="autoText">
          <DxLabel location="left" :text="$t('task.fields.comment')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #autoText>
        <auto-text :value="body" :options="autoComleteOptions" @valueChanged="setBody" />
      </template>
      <template #performers>
        <recipient-tag-box
          :read-only="readOnly"
          :validatorGroup="taskValidatorName"
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
      <template #excludedPerformers>
        <recipient-tag-box
          :read-only="readOnly"
          :recipients="excludedPerformers"
          @setRecipients="setExcludedPerformers"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import recipientTagBox from "~/components/recipient/tag-box/index.vue";
import AutoText from "~/components/autocomplete-text/text-area/index.vue";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    recipientTagBox,
    AutoText
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
    setExcludedPerformers(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_EXCLUDED_PERFORMERS`, value);
    },
    setBody(value) {
      this.$store.commit(`tasks/${this.taskId}/SET_BODY`, value);
    }
  },
  computed: {
    readOnly() {
      return !this.isDraft || !this.canUpdate;
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
    excludedPerformers(value) {
      return this.task.excludedPerformers;
    },
    body() {
      return this.task.body;
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
    autoComleteOptions() {
      return {
        category: "Task",
        entityType: this.task.taskType,
        height: 250
      };
    },
    subjectOptions() {
      return {
        readOnly: true,
        value: this.task.subject,
        onValueChanged: e => {
          this.$store.commit(`tasks/${this.taskId}/SET_SUBJECT`, e.value);
        }
      };
    },
    deadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.task.deadline,
        useMaskBehavior: true,
        openOnFieldClick: true,
        onValueChanged: e => {
          this.$store.commit(`tasks/${this.taskId}/SET_DEADLINE`, e.value);
        }
      };
    },
    needsReviewOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.task.needsReview,
        onValueChanged: e => {
          this.$store.commit(`tasks/${this.taskId}/SET_NEEDS_REVIEW`, e.value);
        }
      };
    },
    isElectronicAcquaintanceOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.task.isElectronicAcquaintance,
        onValueChanged: e => {
          this.$store.commit(
            `tasks/${this.taskId}/SET_IS_ELECTRONIC_ACQUAINTANCE`,
            e.value
          );
        }
      };
    }
  }
};
</script>
