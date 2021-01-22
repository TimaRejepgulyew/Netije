import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxTextArea from "devextreme-vue/text-area";
import AutoText from "~/components/autocomplete-text-area/index.vue";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTextArea,
    AutoText
  },
  props: ["assignmentId"],
  inject: ["assignmentValidatorName"],
  data() {
    return {
      value: this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .body,
      height: 90,
      maxLength: 271
    };
  },
  computed: {
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    }
  },
  methods: {
    onValueChanged(value) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_BODY`, value);
    }
  }
};
