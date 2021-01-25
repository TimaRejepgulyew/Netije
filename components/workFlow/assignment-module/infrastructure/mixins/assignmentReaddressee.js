import employeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    employeeSelectBox
  },
  props: ["assignmentId"],

  methods: {
    valueChanged(value) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_ADDRESSEE`,
        value
      );
    }
  },
  computed: {
    showReaddressee() {
      return (
        (this.inProcess && !this.isRework) ||
        (this.complete && Boolean(this.addressee))
      );
    },
    isRework() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .isRework;
    },
    addressee() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .addressee;
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    }
  }
};
