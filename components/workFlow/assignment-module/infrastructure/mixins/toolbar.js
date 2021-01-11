import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import dataApi from "~/static/dataApi.js";

export default {
  components: {
    DxToolbar,
    DxItem
  },
  props: ["assignmentId", "isCard"],
  inject: ["isValidForm", "assignmentValidatorName"],
  data() {
    return {
      confirm
    };
  },
  methods: {
    async sendRecipientAccessRight(accessRightId) {
      if (accessRightId !== undefined)
        await this.$axios.post(dataApi.assignment.GrantPermissions, {
          assignmentId: this.assignmentId,
          assignmentType: this.assignment.assignmentType,
          accessRight: accessRightId
        });
      await this.sendResult();
    },
    showAccessRightPopup(maxOperation) {
      this.$popup.attachmentAccessRightDialog(
        this,
        {
          maxOperation
        },
        {
          width: "auto",
          height: "auto",
          showLoadingPanel: false,
          listeners: [
            {
              eventName: "valueChanged",
              handlerName: "sendRecipientAccessRight"
            }
          ]
        }
      );
    },
    async checkRecipientAccessRight() {
      const {
        data: { succeeded, maxOperation }
      } = await this.$axios.get(
        `${dataApi.assignment.CheckMembersPermissions}${this.assignment?.assignmentType}/${this.assignmentId}`
      );
      if (!succeeded) {
        this.showAccessRightPopup(maxOperation);
        return false;
      } else return true;
    },

    setResult(result) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_RESULT`, result);
    },

    async completeAssignment(params) {
      const hasRecipientAccessRight = await this.checkRecipientAccessRight();
      if (!hasRecipientAccessRight) return false;
      await this.sendResult(params);
    },
    //TODO remane this function
    sendResult(params) {
      return new Promise((resolve, reject) => {
        this.$awn.asyncBlock(
          this.$store.dispatch(
            `assignments/${this.assignmentId}/complete`,
            params
          ),
          e => {
            this.$emit("onComplete");
            this.$awn.success();
            resolve();
          },
          e => {
            this.$awn.alert();
            reject();
          }
        );
      });
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
