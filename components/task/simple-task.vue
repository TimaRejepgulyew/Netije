<template>
  <DxForm
    :col-count="1"
    :read-only="false"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="validatorGroup"
    @optionChanged="changeTracker"
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
          data-field="deadline"
          :editor-options="deadlineOptions"
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
      <DxSimpleItem template="observers" data-field="observers">
        <DxLabel location="top" :text="$t('translations.fields.observers')" />
      </DxSimpleItem>

      <DxSimpleItem template="performers" data-field="performers">
        <DxRequiredRule :message="$t('translations.fields.performersRequired')" />
        <DxLabel location="top" :text="$t('translations.fields.performers')" />
      </DxSimpleItem>

      <DxSimpleItem
        v-if="isDraft"
        data-field="comment"
        :editor-options="commentOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="top" :text="$t('translations.fields.comment')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #performers="performers">
      <employee-tag-box
        :messageRequired="$t('translations.fields.performersRequired')"
        :validator-group="validatorGroup"
        :value="performers.data.editorOptions.value"
        @valueChanged="setPerformers"
      />
    </template>
    <template #observers="observers">
      <employee-tag-box :value="observers.data.editorOptions.value" @valueChanged="setObservers" />
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
  data() {
    return {
      validatorGroup: "task"
    };
  },
  methods: {
    changeTracker(e) {
      this.$store.commit("currentTask/SET_IS_DATA_CHANGED", true);
    },
    setObservers(value) {
      this.$store.commit("currentTask/SET_OBSERVERS", value);
      this.$store.commit("currentTask/SET_IS_DATA_CHANGED", true);
    },
    setPerformers(value) {
      this.$store.commit("currentTask/SET_PERFORMERS", value);
      this.$store.commit("currentTask/SET_IS_DATA_CHANGED", true);
    }
  },
  computed: {
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
    commentOptions() {
      return {
        height: 250,
        value: this.$store.getters["currentTask/task"].comment,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_COMMENT", e.value);
        }
      };
    },
    deadlineOptions() {
      return {
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.$store.getters["currentTask/task"].deadline,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_DEADLINE", e.value);
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


