import { confirm } from "devextreme/ui/dialog";

export default {
    async handleConfirm(context) {
        const isDataChanged = context.$store.getters["currentDocument/isDataChanged"];
        if (isDataChanged) {
            return await confirm(context.$t("document.fields.areYouSureCancelDocument"), context.$t("shared.confirm"));
        }
        return true;
    },
};
