<template>
  <DxForm
    :col-count="1"
    :read-only="false"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="task"
  >
    <DxGroupItem :caption="$t('translations.fields.main')">
      <DxSimpleItem data-field="subject">
        <DxLabel
          location="top"
          :editor-options="subjectOptions"
          :text="$t('translations.fields.subjectTask')"
        />
        <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="needsReview"
        :editor-options="needsReviewOptions"
        editor-type="dxCheckBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.needsReview')" />
      </DxSimpleItem>
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
      <DxSimpleItem
        :editor-options="observersOptions"
        editor-type="dxTagBox"
        data-field="observers"
      >
        <DxLabel location="top" :text="$t('translations.fields.observers')" />
      </DxSimpleItem>

      <DxSimpleItem
        :editor-options="performersOptions"
        editor-type="dxTagBox"
        data-field="performers"
      >
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
  </DxForm>
</template>
<script>
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
    DxForm
  },
  data() {
    return {
      commentOptions: {
        height: 250,
        value: this.$store["currentTask/task"].deadline,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_COMMENT", e.value);
        }
      },
      deadlineOptions: {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        type: "datetime",
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        value: this.$store["currentTask/task"].deadline,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_DEADLINE", e.value);
        }
      },
      needsReviewOptions: {
        value: this.$store["currentTask/task"].needsReview,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_NEEDS_REVIEW", e.value);
        }
      },
      routeTypeOptions: {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        dataSource: [
          { id: 0, name: this.$t("translations.fields.gradually") },
          { id: 1, name: this.$t("translations.fields.parallel") }
        ],
        value: this.$store["currentTask/task"].routeType,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_ROUTE_TYPE", e.value);
        }
      }
    };
  },

  computed: {
    isNew() {
      return this.$store.getters["currentTask/"];
    },
    subjectOptions() {
      return {
        value: this.$store["currentTask/task"].subject,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_SUBJECT", e.value);
        }
      };
    },
    performersOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee
        }),
        value: this.$store["currentTask/task"].performers,
        showSelectionControls: true,
        maxDisplayedTags: 5,
        acceptCustomValue: true,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_PERFORMERS", e.value);
        }
      };
    },
    observersOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee
        }),
        value: this.$store["currentTask/task"].observers,
        showSelectionControls: true,
        maxDisplayedTags: 5,
        acceptCustomValue: true,
        onValueChanged: e => {
          this.$store.commit("currentTask/SET_OBSERVERS", e.value);
        }
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.message--error {
  display: inline;
  color: #d9534f;
  border-bottom: 1px dashed #d9534f;
  i {
    font-size: 25px;
  }
}
</style>

