import DxForm, { DxGroupItem } from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxForm
  },
  props: ["assignmentId", "isCard"],
  provide: function() {
    return {
      assignmentValidatorName: this.assignmentValidatorName,
      isValidForm: this.validateForm
    };
  },

  methods: {
    validateForm() {
      if (this.$refs["form"].instance.validate().isValid) {
        return true;
      } else {
        return false;
      }
    },
    pasteAttachment(options) {
      this.$emit("pasteAttachment", options);
    },
    onComplete() {
      console.log("form-by-type");
      this.$emit("onComplete");
    }
  },

  computed: {
    assignmentValidatorName() {
      return `assignment/${this.assignmentId}`;
    },
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    }
  }
};
