import { confirm } from "devextreme/ui/dialog";

export default {
  async handleConfirm(context, taskId) {
    const isDataChanged =
      context.$store.getters[`tasks/${taskId}/isDataChanged`];
    console.log(isDataChanged, "taskIsDataChanged");
    if (isDataChanged) {
      return await confirm(
        context.$t("document.fields.areYouSureCancelDocument"),
        context.$t("shared.confirm")
      );
    }
    return true;
  }
};
