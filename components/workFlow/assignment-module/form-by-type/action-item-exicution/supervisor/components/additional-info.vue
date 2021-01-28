<template>
  <div>
    <div class="d-flex align-center">
      <label class="control__label align-content-center" for="newDeadLine">
        {{
        $t("assignment.fields.newDeadline")
        }}
      </label>
      <div class="f-grow-1">
        <DxDateBox
          :readOnly="!inProcess || !canUpdate"
          :useMaskBehavior="true"
          :openOnFieldClick="true"
          type="datetime"
          name="newDeadLine"
          :min="new Date().getTime()"
          :value.sync="newDeadline"
          @valueChanged="newDeadlineChanged"
          styling-mode="outlined"
        ></DxDateBox>
      </div>
    </div>
    <auto-text
      v-if="inProcess && canUpdate"
      :value="value"
      :options="autoComleteOptions"
      @valueChanged="onValueChanged"
    />
  </div>
</template>

<script>
import assignmentComment from "~/components/workFlow/assignment-module/infrastructure/mixins/assignmentComment.js";
import { DxDateBox } from "devextreme-vue/date-box";
const millisecondsInDay = 24 * 60 * 60 * 1000;
export default {
  components: {
    DxDateBox
  },
  mixins: [assignmentComment],
  data() {
    return {
      newDeadline: this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].newDeadline,
      placeholder: this.$t("assignment.body.actionAtiemExecution"),
      isRequired: true,
      todayButton: {
        text: "Today",
        onClick: () => {
          this.$store.commit(
            `assignments/${this.assignmentId}/SET_NEW_DEADLINE`,
            new Date().getTime()
          );
        }
      }
    };
  },
  computed: {
    autoComleteOptions() {
      return {
        category: "Assignment",
        entityType: this.assignment.assignmentType,
        placeholder: this.placeholder,
        height: this.height,
        maxLength: this.maxLength,
        validationGroup: this.assignmentValidatorName,
        isRequired: this.isRequired,
        requiredMessage: this.placeholder
      };
    }
  },
  methods: {
    newDeadlineChanged(e) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_NEW_DEADLINE`,
        e.value
      );
    }
  }
};
</script>
<style lang="scss">
.control__label {
  display: block;
  padding: 15px 15px;
}
</style>


