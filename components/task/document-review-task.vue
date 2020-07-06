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
        <DxSimpleItem :editor-options="subjectOptions" data-field="subject">
          <DxLabel location="top" :text="$t('translations.fields.subjectTask')" />
          <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
        </DxSimpleItem>

        <DxGroupItem :col-count="2">
          <DxSimpleItem data-field="addresseeId" template="addresseeId">
            <DxRequiredRule :message="$t('translations.fields.addresseeIdRequired')" />
            <DxLabel location="top" :text="$t('translations.fields.addresseeId')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="deadline"
            :editor-options="deadlineOptions"
            editor-type="dxDateBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.deadLine')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxSimpleItem template="resolutionObservers" data-field="resolutionObservers">
          <DxLabel location="top" :text="$t('translations.fields.observers')" />
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
      <template #addresseeId>
        <employee-select-box
          :read-only="!isDraft"
          :messageRequired="validatorGroup"
          :value="addresseeId"
          @valueChanged="setAddresseeId"
        />
      </template>
      <template #resolutionObservers>
        <employee-tag-box
          :read-only="!isDraft"
          :value="resolutionObservers"
          @valueChanged="setResolutionObservers"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
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
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    employeeSelectBox,
    employeeTagBox
  },
  data() {
    return {
      validatorGroup: "task"
    };
  },
  methods: {
    setResolutionObservers(value) {
      this.$store.commit("currentTask/SET_RESOLUTION_OBSERVERS", value);
    },
    setAddresseeId(value) {
      this.$store.commit("currentTask/SET_ADDRESSEE_ID", value);
    }
  },
  computed: {
    resolutionObservers() {
      return this.$store.getters["currentTask/task"].resolutionObservers;
    },
    addresseeId() {
      return this.$store.getters["currentTask/task"].addresseeId;
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
    }
  }
};
</script>
