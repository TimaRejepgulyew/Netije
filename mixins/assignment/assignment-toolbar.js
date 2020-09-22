import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

export default {
  components: {
    DxToolbar,
    DxItem,
  },
  props: ["assignmentId"],
  inject: ["isValidForm"],
  data() {
    return {
      confirm
    }
  },
  methods: {
    setResult(result) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_RESULT`, result);
    },
    completeAssignment(params) {
      this.$awn.asyncBlock(
        this.$store.dispatch(`assignments/${this.assignmentId}/complete`, params),
        (e) => {
          this.$emit("complete")
          this.$awn.success();
        },
        (e) => this.$awn.alert()
      );
    }
  },
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]

    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
  }
}