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
import dataApi from "~/static/dataApi";
import DocumentTypyModel from "~/infrastructure/models/DocumentType.js";
import financialArchiveIcon from "~/static/icons/document-type/financial-archive.svg";
import contractIcon from "~/static/icons/document-type/contract.svg";
import DxMenu from "devextreme-vue/menu";
import dynamicDocumentIcon from "~/static/icons/document-type/dynamic-document.svg";
import { DynamicDocumentCreateBtn } from "~/infrastructure/models/DynamicDocumentCreateBtn";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
export default {
  components: {
    DxMenu,
  },
  async created() {
    const filter = `["documentTypeGuid","=",${DocumentTypeGuid.DynamicDocument}]`;
    const { data } = await this.$axios.get(
      `${dataApi.docFlow.DocumentType}?filter=${filter}`
    );
    this.dynamicDocumentCreateBtn = new Array(
      ...Object.values(new DynamicDocumentCreateBtn(data.data).getAll())
    );
  },
  data() {
    return {
      dynamicDocumentCreateBtn: [],
    };
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
                  items: Object.values(this.paperWorkGroupBtns),
                },
                {
                  text: this.$t("createItemDialog.accountingDocumentsGroup"),
                  icon: financialArchiveIcon,
                  items: Object.values(this.filterContractBtns),
                  visible: this.$store.getters[
                    "permissions/isResponsibleFinansicalArchive"
                  ],
                },
                {
                  text: this.$t("createItemDialog.contractualDocumentsGroup"),
                  icon: contractIcon,
                  items: Object.values(this.filterFinancialArchiveBtns),
                  visible: this.$store.getters[
                    "permissions/isResponsibleForContracts"
                  ],
                },
                {
                  text: this.$t("createItemDialog.dynamicDocuments"),
                  icon: dynamicDocumentIcon,
                  items: this.dynamicDocumentCreateBtn,
                },
              ],
            },
          ],
        },
      ];
    },
  },
  methods: {
    itemClick({ itemData }) {
      console.log(itemData);
      if (!itemData.items) {
        if (itemData.type === "select") this.$emit("showDocumentGrid");
        else
          this.$emit("createDocument", {
            documentTypeId: itemData.id,
            documentTypeGuid: itemData.documentTypeGuid,
          });
      }
    },
  },
};
</script>

<style></style>
