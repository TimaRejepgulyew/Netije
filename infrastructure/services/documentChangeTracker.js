import { confirm } from "devextreme/ui/dialog";

export default {
  async handleConfirm(context, documentId) {
    const isDataChanged =
      context.$store.getters[`document${documentId}/isDataChanged`];
    if (!isDataChanged) {
      return await confirm(
        context.$t("document.fields.areYouSureCancelDocument"),
        context.$t("shared.confirm")
      );
    }
    return true;
  }
};
