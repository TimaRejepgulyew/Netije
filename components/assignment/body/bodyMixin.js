import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DxTextArea from "devextreme-vue/text-area";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTextArea,
  },
  props: ["assignmentId"],
  inject: ["assignmentValidatorName"],
  data() {
    return {
      height: 90,
      maxLength: 271,
    };
  },
  computed: {
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`]
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`]
    },
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
    },
    value() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`].body
    }
  },
  methods: {
    onValueChanged(e) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_BODY`, e.value);
    },
  },
}
