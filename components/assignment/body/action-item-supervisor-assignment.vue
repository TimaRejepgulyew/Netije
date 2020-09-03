<template>
  <div>
    <label class="control__label" for="newDeadLine">{{$t("assignment.fields.newDeadline")}}</label>
    <DxDateBox
      :readOnly="!inProcess|| !canUpdate"
      type="datetime"
      name="newDeadLine"
      :min="new Date().getTime()"
      :value.sync="newDeadline"
      valueChanged="newDeadlineChanged"
      styling-mode="outlined"
    >
      <DxDateBoxButton :options="todayButton" name="today" location="before" />
      <DxDateBoxButton :options="prevDateButton" name="prevDate" location="before" />
      <DxDateBoxButton :options="nextDateButton" name="nextDate" location="after" />
      <DxDateBoxButton name="dropDown" />
    </DxDateBox>
    <DxTextArea
      v-if="inProcess&& canUpdate"
      :placeholder="placeholder"
      :height="height"
      :max-length="maxLength"
      :value.sync="value"
      @valueChanged="onValueChanged"
    >
      <DxValidator v-if="isRequired" :validationGroup="assignmentValidatorName">
        <DxRequiredRule :message="placeholder" />
      </DxValidator>
    </DxTextArea>
  </div>
</template>

<script>
const millisecondsInDay = 24 * 60 * 60 * 1000;
import bodyMixin from "./bodyMixin.js";
import {
  DxDateBox,
  DxButton as DxDateBoxButton,
} from "devextreme-vue/date-box";
export default {
  mixins: [bodyMixin],
  components: {
    DxDateBox,
    DxDateBoxButton,
  },
  data() {
    return {
      // validationMessage: $t("assignment.validation.actionItemRequired"),
      placeholder: this.$t("assignment.body.actionItemSupervisorAssignment"),
      isRequired: false,
      todayButton: {
        text: "Today",
        onClick: () => {
          this.$store.commit(
            `assignments/${this.assignmentId}/SET_NEW_DEADLINE`,
            new Date().getTime()
          );
        },
      },
    };
  },
  computed: {
    nextDateButton() {
      return {
        icon: "spinnext",
        stylingMode: "text",
        onClick: () => {
          const newValue = this.newDeadline + millisecondsInDay;
          this.$store.commit(
            `assignments/${this.assignmentId}/SET_NEW_DEADLINE`,
            newValue
          );
        },
      };
    },
    prevDateButton() {
      return {
        icon: "spinprev",
        stylingMode: "text",
        onClick: () => {
          const newValue = this.newDeadline - millisecondsInDay;
          this.$store.commit(
            `assignments/${this.assignmentId}/SET_NEW_DEADLINE`,
            newValue
          );
        },
      };
    },
    newDeadline() {
      const deadline = this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].newDeadline;
      return deadline;
    },
  },
  methods: {
    newDeadlineChanged(e) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_NEW_DEADLINE`,
        e.value
      );
    },
  },
};
</script>
<style lang="scss" >
.control__label {
  display: block;
  padding: 15px 0;
}
</style>
