<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
      <form @submit="handleSubmit">
        <DxForm
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="customerData"
        >
          <template #avatar-template>
            <div>
              <DxDataGrid
                :show-borders="true"
                :data-source="store.numberFormatItems"
                key-expr="id"
                :errorRowEnabled="true"
                :allow-column-reordering="true"
                :allow-column-resizing="true"
                :column-auto-width="true"
              >
                <DxExport
                  :enabled="true"
                  :allow-export-selected-data="true"
                  :file-name="$t('translations.fields.documentRegistry')"
                />

                <DxEditing
                  :allow-updating="isOwnerGroup"
                  :allow-deleting="allowDeleting&&isOwnerGroup"
                  :allow-adding="isOwnerGroup"
                  :useIcons="true"
                  mode="raw"
                />

                <DxScrolling mode="virtual" />

                <DxColumn data-field="number" :caption="$t('translations.fields.number')">
                  <DxRequiredRule :message="$t('translations.fields.numberRequired')" />
                </DxColumn>

                <DxColumn data-field="element" :caption="$t('translations.fields.element')">
                  <DxRequiredRule :message="$t('translations.fields.elementRequired')" />
                  <DxLookup
                    :data-source="element"
                    :allowClearing="true"
                    valueExpr="id"
                    displayExpr="name"
                  />
                </DxColumn>
                <DxColumn data-field="separator" :caption="$t('translations.fields.separator')">
                  <DxRequiredRule :message="$t('translations.fields.separatorRequired')" />
                </DxColumn>
              </DxDataGrid>
            </div>
          </template>
          <DxGroupItem>
            <DxSimpleItem data-field="name" :editor-options="nameOptions">
              <DxLabel :text="$t('translations.fields.name')" />
              <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
            </DxSimpleItem>
            <DxSimpleItem data-field="index" :editor-options="indexOptions">
              <DxLabel :text="$t('translations.fields.index')" />
              <DxRequiredRule :message="$t('translations.fields.indexRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              editor-type="dxNumberBox"
              :editor-options="numberOfDigitsInNumber"
              data-field="numberOfDigitsInNumber"
            >
              <DxLabel :text="$t('translations.fields.numberOfDigitsInNumber')" />
              <DxRequiredRule
                :message="
                  $t('translations.fields.numberOfDigitsInNumberRequired')
                "
              />
            </DxSimpleItem>
            <DxSimpleItem
              data-field="documentFlow"
              :editor-options="documentFlowOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.documentFlow')" />
              <DxRequiredRule :message="$t('translations.fields.documentFlowRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
            :visible='isRegistrible'
              data-field="registrationGroupId"
              :editor-options="registrationGroupIdOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.registrationGroupId')" />
              <DxRequiredRule :message="$t('translations.fields.registrationGroupIdRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="registerType"
              :editor-options="registerTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.registerType')" />
              <DxRequiredRule :message="$t('translations.fields.registerTypeRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              editor-type="dxSelectBox"
              :editor-options="numberingSectionOptions"
              data-field="numberingSection"
            >
              <DxLabel :text="$t('translations.fields.numberingSection')" />
              <DxRequiredRule :message="$t('translations.fields.numberingSectionRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="numberingPeriod"
              :editor-options="numberingPeriodOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.numberingPeriod')" />
              <DxRequiredRule
                numberingPeriodOptions
                :message="$t('translations.fields.numberingPeriodRequired')"
              />
            </DxSimpleItem>
            <DxSimpleItem
              data-field="status"
              :editor-options="statusOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.status')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxSimpleItem template="avatar-template" />

          <DxGroupItem :col-count="12" :col-span="2">
            <DxButtonItem
              :col-span="11"
              :button-options="addButtonOptions"
              horizontal-alignment="right"
            />
            <DxButtonItem
              :col-span="1"
              :button-options="cancelButtonOptions"
              horizontal-alignment="right"
            />
          </DxGroupItem>
        </DxForm>
      </form>
    </div>
  </div>
</template>
<script>
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxAsyncRule
} from "devextreme-vue/form";

import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxHeaderFilter,
  DxScrolling,
  DxLookup,
  DxExport,
  DxSelection,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxStateStoring
} from "devextreme-vue/data-grid";
import { DxButton } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";
function BasicOptions(
  dataSource,
  disabled = false,
  showClearButton,
  displayExpr = "name"
) {
  return {
    dataSource,
    disabled,
    showClearButton,
    valueExpr: "id",
    displayExpr
  };
}
export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxForm,
    DxAsyncRule,
    notify,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxHeaderFilter,
    DxScrolling,
    DxLookup,
    DxExport,
    DxSelection,
    DxColumnChooser,
    DxColumnFixing,
    DxFilterRow,
    DxStateStoring,
    DxButton
  },
  async created() {
    if (this.$route.params.id != "newDocRegistry") {
      this.isUpdating = true;
      this.address = `${dataApi.docFlow.DocumentRegistry}/${this.$route.params.id}`;
      this.store = await this.getDataById(this.address);
    }
  },
  computed: {
    isOwnerGroup() {
      if (this.isUpdating) {
        const ownerId = this.store.responsibleEmployeeId;
        const myId = this.$store.getters["oidc/oidcUser"]["ИД сотрудника"];
        return ownerId == myId;
      } else {
        return true;
      }
    },
    isRegistered() {
      let { hasDocuments, hasRegistrationSettings } = this.store;
      return hasDocuments && hasRegistrationSettings;
    },
    isRegistrible(){
      return this.store.registerType == 1 
    },
    documentFlowOptions() {
      return new BasicOptions(
        this.documentFlow,
        !this.isRegistered && !this.isOwnerGroup,
        true
      );
    },
    registrationGroupIdOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.docFlow.ResponsibleForGroupOnMe,
        disabled: !this.isRegistered && !this.isOwnerGroup
      });
    },

    numberingSectionOptions() {
      return new BasicOptions(
        this.numberingSection,
        !this.isRegistered && !this.isOwnerGroup,
        true
      );
    },
    numberingPeriodOptions() {
      return new BasicOptions(
        this.numberingPeriod,
        !this.isRegistered && !this.isOwnerGroup,
        true
      );
    },
    registerTypeOptions() {
      return new BasicOptions(
        this.registerType,
        !this.isRegistered && !this.isOwnerGroup,
        true
      );
    },
    statusOptions() {
      return new BasicOptions(
        this.$store.getters["status/status"],
        !this.isOwnerGroup,
        true,
        "status"
      );
    },
    numberOfDigitsInNumber() {
      return {
        disabled: !this.isOwnerGroup,
        max: 9,
        min: 0
      };
    },

    
    elementOptions() {
      return {
        dataSource: this.element,
        allowClearing: true,
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    nameOptions() {
      return {
        disabled: !this.isOwnerGroup
      };
    },
    indexOptions() {
      return {
        disabled: !this.isOwnerGroup
      };
    }
  },
  data() {
    return {
      address: dataApi.docFlow.DocumentRegistry,
      isUpdating: false,
      headerTitle: this.$t("translations.headers.addDocumentRegistry"),
      store: {
        name: null,
        status: 0,
        index: null,
        hasDocuments: false,
        hasRegistrationSettings: false,
        numberOfDigitsInNumber: null,
        documentFlow: null,
        numberingPeriod: null,
        numberingSection: null,
        registerType: null,
        numberFormatItems: [
          {
            number: 1,
            element: 1,
            id: "default"
          }
        ]
      },
      element: [
        {
          id: 1,
          name: this.$t("translations.fields.number")
        },
        {
          id: 2,
          name: this.$t("translations.fields.year2Place")
        },
        {
          id: 3,
          name: this.$t("translations.fields.year4Place")
        },
        {
          id: 4,
          name: this.$t("translations.fields.quarter")
        },
        {
          id: 5,
          name: this.$t("translations.fields.month")
        },
        {
          id: 6,
          name: this.$t("translations.fields.leadingNumber")
        },
        {
          id: 7,
          name: this.$t("translations.fields.log")
        },
        {
          id: 8,
          name: this.$t("translations.fields.caseFile")
        },
        {
          id: 9,
          name: this.$t("translations.fields.departmentCode")
        },
        {
          id: 10,
          name: this.$t("translations.fields.buCode")
        },
        {
          id: 11,
          name: this.$t("translations.fields.docKindCode")
        },
        {
          id: 12,
          name: this.$t("translations.fields.cPartyCode")
        },
        {
          id: 13,
          name: this.$t("translations.fields.customString")
        }
      ],
      numberingSection: [
        {
          name: this.$t("translations.fields.noSection"),
          id: 0
        }
      ],
      documentFlow: [
        { id: 0, name: this.$t("translations.fields.incomingEnum") },
        { id: 1, name: this.$t("translations.fields.outcomingEnum") },
        { id: 2, name: this.$t("translations.fields.inner") },
        { id: 3, name: this.$t("translations.fields.contracts") }
      ],

      registerType: [
        {
          id: 1,
          name: this.$t("translations.fields.registration")
        },
        {
          id: 2,
          name: this.$t("translations.fields.numbering")
        }
      ],
      numberingPeriod: [
        {
          id: 0,
          name: this.$t("translations.fields.year")
        },
        {
          id: 1,
          name: this.$t("translations.fields.quarter")
        },
        {
          id: 2,
          name: this.$t("translations.fields.month")
        },
        {
          id: 3,
          name: this.$t("translations.fields.continuous")
        }
      ],
      addButtonOptions: {
        width: 100,
        height: 50,
        text: this.$t("translations.links.add"),
        useSubmitBehavior: true,
        type: "success"
      },
      cancelButtonOptions: {
        onClick: this.backTo,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      allowDeleting(e) {
        if (e.row.data.id != "default") {
          return true;
        } else {
          return false;
        }
      }
    };
  },
  methods: {
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.EmployeeDataFieldValueNotExists(
        {
          [dataField]: params.value
        },
        dataField
      );
    },
    async getDataById(url) {
      const res = await this.$axios.get(url);
      let count = 0;
      res.data.numberFormatItems = res.data.numberFormatItems.map(element => {
        element.id = count;
        count++;
        return element;
      });
      return res.data;
    },
    async getData(url) {
      const res = await this.$axios.get(url);
      return res.data.data;
    },
backTo() {
      this.$router.go(-1);
    },
    notify(msgTxt, msgType) {
      notify(
        {
          message: msgTxt,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        msgType,
        3000
      );
    },
    handleSubmit(e) {
      if (this.isUpdating) {
        const object = { id: parseInt(this.$route.params.id), ...this.store };
        this.$axios
          .put(this.address, object)
          .then(res => {
            this.backTo();
            this.notify(
              this.$t("translations.headers.updateDocRegistrySucces"),
              "success"
            );
          })
          .catch(e => {
            this.notify(
              this.$t("translations.headers.updateDocRegistryError"),
              "error"
            );
          });
      } else {
        const object = this.store;
        this.$axios
          .post(this.address, object)
          .then(res => {
            this.backTo();
            this.notify(
              this.$t("translations.headers.addDoctRegistrySucces"),
              "success"
            );
          })
          .catch(e => {
            this.notify(
              this.$t("translations.headers.addDoctRegistryError"),
              "error"
            );
          });
      }

      e.preventDefault();
    }
  }
};
</script>
<style>
form {
  margin: 10px;
}
</style>
