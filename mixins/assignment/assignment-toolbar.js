import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxPopup } from "devextreme-vue/popup";
import attachmentAccessRightDialog from "~/components/access-right/attachment-access-right-dialog.vue";
import dataApi from "~/static/dataApi.js";
import createChildTaskBtn from "~/components/assignment/components/create-children-task-btn.vue";
export default {
  components: {
    DxToolbar,
    DxItem,
    DxPopup,
    attachmentAccessRightDialog,
    createChildTaskBtn
  },
  props: ["assignmentId"],
  inject: ["isValidForm"],
  data() {
    return {
      confirm,
      isPopupAccesRight: false
    };
  },
  methods: {
    async sendRecipientAccessRight(accessRightId) {
      await this.$axios.post(dataApi.assignment.GrantPermissions, {
        assignmentId: this.assignmentId,
        assignmentType: this.assignment.assignmentType,
        accessRight: accessRightId
      });
      await this.sendResult();
      this.tooglePopupAccessRight();
    },

    tooglePopupAccessRight() {
      this.isPopupAccesRight = !this.isPopupAccesRight;
    },
    async checkRecipientAccessRight() {
      const {
        data: { succeeded }
      } = await this.$axios.get(
        `${dataApi.assignment.CheckMembersPermissions}${this.assignment?.assignmentType}/${this.assignmentId}`
      );
      if (!succeeded) {
        this.tooglePopupAccessRight();
        return false;
      } else return true;
    },

    setResult(result) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_RESULT`, result);
    },

    async completeAssignment(params) {
      const hasRecipientAccessRight = await this.checkRecipientAccessRight();
      if (!hasRecipientAccessRight) return false;
      this.sendResult(params);
    },
    //TODO remane this function
    sendResult(params) {
      this.$awn.asyncBlock(
        this.$store.dispatch(
          `assignments/${this.assignmentId}/complete`,
          params
        ),
        e => {
          this.$listeners.complete();
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  },
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    }
  }
};
