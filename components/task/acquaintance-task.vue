<template>
  <div id="form-demo">
    <DxForm
      ref="form"
      :read-only="!isDraft"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      :validation-group="validatorGroup"
    >
      <DxGroupItem :caption="$t('translations.fields.main')">
        <DxGroupItem :col-count="10">
          <DxSimpleItem :editor-options="subjectOptions" :col-span="8" data-field="subject">
            <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
            <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
          </DxSimpleItem>
          <DxSimpleItem
            :col-span="2"
            data-field="needsReview"
            :editor-options="needsReviewOptions"
            editor-type="dxCheckBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.needsReview')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :col-count="3">
          <DxSimpleItem
            :col-span="2"
            data-field="deadline"
            :editor-options="deadlineOptions"
            editor-type="dxDateBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="isElectronicAcquaintance"
            :editor-options="isElectronicAcquaintanceOptions"
            editor-type="dxCheckBox"
          >
            <DxLabel location="top" :text="$t('workFlow.isElectronicAcquaintance')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxSimpleItem template="observers" data-field="observers">
          <DxLabel location="top" :text="$t('translations.fields.observers')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="performers" template="performers">
          <DxRequiredRule :message="$t('translations.fields.acquaintMembersRequired')" />
          <DxLabel location="top" :text="$t('translations.fields.acquaintMembers')" />
        </DxSimpleItem>
        <DxSimpleItem template="excludedPerformers" data-field="excludedPerformers">
          <DxLabel location="top" :text="$t('workFlow.excludedPerformers')" />
        </DxSimpleItem>

        <DxSimpleItem
          v-if="isDraft"
          data-field="body"
          :editor-options="bodyOptions"
          editor-type="dxTextArea"
        >
          <DxLabel location="top" :text="$t('translations.fields.comment')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #performers>
        <recipient-tag-box
          :read-only="!isDraft"
          :messageRequired="$t('translations.fields.acquaintMembersRequired')"
          :validator-group="validatorGroup"
          :recipients="performers"
          @setRecipients="setPerformers"
        />
      </template>
      <template #observers>
        <recipient-tag-box
          :read-only="!isDraft"
          :recipients="observers"
          @setRecipients="setObservers"
        />
      </template>
      <template #excludedPerformers>
        <recipient-tag-box
          :read-only="!isDraft"
          :recipients="excludedPerformers"
          @setRecipients="setExcludedPerformers"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import recipientTagBox from "~/components/page/recipient-tag-box.vue";
import "devextreme-vue/text-area";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    recipientTagBox
  },
  props: ["taskId"],
  data() {
    return {
      validatorGroup: "task"
    };
  },
  methods: {
    setObservers(value) {
      this.$store.commit("currentTask/SET_OBSERVERS", {
        key: this.taskId,
        payload: value
      });
    },
    setPerformers(value) {
      this.$store.commit("currentTask/SET_PERFORMERS", {
        key: this.taskId,
        payload: value
      });
    },
    setExcludedPerformers(value) {
      this.$store.commit("currentTask/SET_EXCLUDED_PERFORMERS", {
        key: this.taskId,
        payload: value
      });
    }
  },
  computed: {
    observers() {
      return this.$store.getters["currentTask/task"](this.taskId).observers;
    },
    performers() {
      return this.$store.getters["currentTask/task"](this.taskId).performers;
    },
    excludedPerformers(value) {
      return this.$store.getters["currentTask/task"](this.taskId)
        .excludedPerformers;
    },
    inProcess() {
      return this.$store.getters["currentTask/inProcess"](this.taskId);
    },
    isNew() {
      return this.$store.getters["currentTask/isNew"](this.taskId);
    },
    isDraft() {
      return this.$store.getters["currentTask/isDraft"](this.taskId);
    },
    subjectOptions() {
      return {
        value: this.$store.getters["currentTask/task"](this.taskId).subject,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_SUBJECT", {
            key: this.taskId,
            payload: e.value
          });
        }
      };
    },
    bodyOptions() {
      return {
        height: 250,
        value: this.$store.getters["currentTask/task"](this.taskId).body,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_BODY", {
            key: this.taskId,
            payload: e.value
          });
        }
      };
    },
    deadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.$store.getters["currentTask/task"](this.taskId).deadline,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_DEADLINE", {
            key: this.taskId,
            payload: e.value
          });
        }
      };
    },
    needsReviewOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentTask/task"](this.taskId).needsReview,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_NEEDS_REVIEW", {
            key: this.taskId,
            payload: e.value
          });
        }
      };
    },
    isElectronicAcquaintanceOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentTask/task"](this.taskId)
          .isElectronicAcquaintance,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_IS_ELECTRONIC_ACQUAINTANCE", {
            key: this.taskId,
            payload: e.value
          });
        }
      };
    }
  }
};
</script>
