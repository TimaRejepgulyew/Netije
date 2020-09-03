<template>
  <div>
    <div class="d-flex align-center">
      <label
        class="control__label align-content-center"
        for="newDeadLine"
      >{{$t("assignment.fields.newDeadline")}}</label>
      <div class="f-grow-1">
        <DxDateBox
          :readOnly="!inProcess|| !canUpdate"
          type="datetime"
          name="newDeadLine"
          :min="new Date().getTime()"
          :value.sync="newDeadline"
          @valueChanged="newDeadlineChanged"
          styling-mode="outlined"
        ></DxDateBox>
      </div>
    </div>
    <DxTextArea
      v-if="inProcess && canUpdate"
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
  },
  data() {
    return {
      newDeadline: this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].newDeadline,
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
  padding: 15px 15px;
}
</style>
