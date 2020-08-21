import DocumentCreateBtn from "~/infrastructure/models/DocumentCreateBtn.js";
import TaskCreateBtn from "~/infrastructure/models/TaskCreateBtn.js";
import financialArchiveIcon from "~/static/icons/document-type/financial-archive.svg";
import contractIcon from "~/static/icons/document-type/contract.svg";
export default function(context) {
  const paperWorkDocumentBtns = Object.values(
    new DocumentCreateBtn(context).init().filterPaperWorkDocument()
  );
  const financialArchiveDocumentBtns = Object.values(
    new DocumentCreateBtn(context).init().filterFinancialArchive()
  );
  const contractDocumentBtns = Object.values(
    new DocumentCreateBtn(context).init().filterContract()
  );
  const taskBtn = Object.values(new TaskCreateBtn(context).init().getAll());
  return [
    {
      text: context.$t("createItemDialog.recordManagementGroup"),
      icon: "file",
      items: paperWorkDocumentBtns
    },
    {
      text: context.$t("createItemDialog.taskGroup"),
      icon: "selectall",
      items: taskBtn
    },

    {
      text: context.$t("createItemDialog.accountingDocumentsGroup"),
      icon: financialArchiveIcon,
      items: financialArchiveDocumentBtns,
      visible:
        context.$store.getters["permissions/isResponsibleFinansicalArchive"]
    },
    {
      text: context.$t("createItemDialog.contractualDocumentsGroup"),
      icon: contractIcon,
      items: contractDocumentBtns,
      visible: context.$store.getters["permissions/isResponsibleForContracts"]
    }
  ];
}
