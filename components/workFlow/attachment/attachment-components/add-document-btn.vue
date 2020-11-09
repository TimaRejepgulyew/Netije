<template>
  <DxMenu
    :adaptivityEnabled="true"
    :data-source="subMenu"
    show-first-submenu-mode="onHover"
    orientation="vertical"
    submenu-direction="auto"
    :hide-submenu-on-mouse-leave="true"
    display-expr="text"
    @item-click="itemClick"
  />
</template>

<script>
import DocumentTypyModel from "~/infrastructure/models/DocumentType.js";
import financialArchiveIcon from "~/static/icons/document-type/financial-archive.svg";
import contractIcon from "~/static/icons/document-type/contract.svg";
import DxMenu from "devextreme-vue/menu";
export default {
  components: {
    DxMenu
  },
  created() {
    console.log(this.paperWorkGroupBtns);
  },
  computed: {
    documentTypeModel() {
      return new DocumentTypyModel(this);
    },
    paperWorkGroupBtns() {
      return this.documentTypeModel.filterPaperWorkDocument();
    },
    filterContractBtns() {
      return this.documentTypeModel.filterContract();
    },
    filterFinancialArchiveBtns() {
      return this.documentTypeModel.filterFinancialArchive();
    },
    subMenu() {
      return [
        {
          icon: "plus",
          items: [
            { text: this.$t("createItemDialog.select"), type: "select" },
            {
              text: this.$t("createItemDialog.create"),
              items: [
                {
                  text: this.$t("createItemDialog.recordManagementGroup"),
                  icon: "file",
                  items: Object.values(this.paperWorkGroupBtns)
                },
                {
                  text: this.$t("createItemDialog.accountingDocumentsGroup"),
                  icon: financialArchiveIcon,
                  items: Object.values(this.filterContractBtns),
                  visible: this.$store.getters[
                    "permissions/isResponsibleFinansicalArchive"
                  ]
                },
                {
                  text: this.$t("createItemDialog.contractualDocumentsGroup"),
                  icon: contractIcon,
                  items: Object.values(this.filterFinancialArchiveBtns),
                  visible: this.$store.getters[
                    "permissions/isResponsibleForContracts"
                  ]
                }
              ]
            }
          ]
        }
      ];
    }
  },
  methods: {
    itemClick({ itemData }) {
      if (!itemData.items) {
        if (itemData.type === "select") this.$emit("showDocumentGrid");
        else this.$emit("createDocument", itemData.id);
      }
    }
  }
};
</script>

<style></style>
