<template>
  <DxForm
    ref="form"
    :read-only="!isDraft"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="validatorGroup"
  >
    <DxGroupItem :caption="$t('translations.fields.main')">
      <DxGroupItem :col-count="10">
        <DxSimpleItem :editor-options="subjectOptions" :col-span="8" data-field="subject">
          <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
          <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="needsReview"
          :editor-options="needsReviewOptions"
          editor-type="dxCheckBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.needsReview')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-count="2">
        <DxSimpleItem
          data-field="maxDeadline"
          :editor-options="maxDeadlineOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="routeType"
          editor-type="dxSelectBox"
          :editor-options="routeTypeOptions"
        >
          <DxLabel location="top" :text="$t('translations.fields.start')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxSimpleItem :disabled="true" template="observers" data-field="observers">
        <DxLabel location="top" :text="$t('translations.fields.observers')" />
      </DxSimpleItem>

      <DxSimpleItem template="performers" data-field="performers">
        <DxRequiredRule :message="$t('translations.fields.performersRequired')" />
        <DxLabel location="top" :text="$t('translations.fields.performers')" />
      </DxSimpleItem>

      <DxSimpleItem
        v-if="isDraft"
        data-field="body"
        :editor-options="bodyOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="top" :text="$t('translations.fields.body')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #performers>
      <employee-tag-box
        :read-only="!isDraft"
        :messageRequired="$t('translations.fields.performersRequired')"
        :validator-group="validatorGroup"
        :value="performers"
        @valueChanged="setPerformers"
      />
    </template>
    <template #observers>
      <employee-tag-box :read-only="inProcess" :value="observers" @valueChanged="setObservers" />
    </template>
  </DxForm>
</template>
<script>
import employeeTagBox from "~/components/employee/custom-tag-box.vue";
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
    employeeTagBox,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm
  },
  props: ["taskId"],
  data() {
    return {
      validatorGroup: "task"
    };
  },
  methods: {
    setObservers(value) {
      this.$store.commit("currentTask/SET_OBSERVERS", value);
    },
    setPerformers(value) {
      this.$store.commit("currentTask/SET_PERFORMERS", value);
    }
  },
  computed: {
    observers() {
      return this.$store.getters["currentTask/task"].observers;
    },
    performers() {
      return this.$store.getters["currentTask/task"].performers;
    },
    inProcess() {
      return this.$store.getters["currentTask/inProcess"];
    },
    isNew() {
      return this.$store.getters["currentTask/isNew"];
    },
    isDraft() {
      return this.$store.getters["currentTask/isDraft"];
    },
    subjectOptions() {
      return {
        value: this.$store.getters["currentTask/task"].subject,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_SUBJECT", e.value);
        }
      };
    },
    bodyOptions() {
      return {
        height: 250,
        value: this.$store.getters["currentTask/task"].body,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_BODY", e.value);;
        }
      };
    },
    maxDeadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.$store.getters["currentTask/task"].maxDeadline,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_MAX_DEADLINE", e.value);
        }
      };
    },
    needsReviewOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentTask/task"].needsReview,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_NEEDS_REVIEW", e.value);
        }
      };
    },
    routeTypeOptions() {
      return {
        displayExpr: "name",
        valueExpr: "id",
        dataSource: [
          { id: 0, name: this.$t("translations.fields.gradually") },
          { id: 1, name: this.$t("translations.fields.parallel") }
        ],
        value: this.$store.getters["currentTask/task"].routeType,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_ROUTE_TYPE", e.value);
        }
      };
    }
  }
};
</script>


