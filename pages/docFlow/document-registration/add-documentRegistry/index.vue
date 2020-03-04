<template>
  <div id="form-demo">
    <div class="widget-container">
      <form @submit="handleSubmit">
        <DxForm
          :form-data.sync="documentRegistry"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="customerData"
        >
          <DxGroupItem
            :caption="$t('translations.headers.addDocumentRegistry')"
          >
            <DxSimpleItem data-field="name" data-type="string">
              <DxLabel :text="$t('translations.fields.name')" />
              <!-- <DxAsyncRule
                :validation-callback="validateEntityExists"
                :message="$t('translations.fields.userNameRule')"
              /> -->
              <DxRequiredRule
                :message="$t('translations.fields.nameRequired')"
              />
            </DxSimpleItem>
            <DxSimpleItem data-field="index">
              <DxLabel :text="$t('translations.fields.index')" />
              <DxRequiredRule
                :message="$t('translations.fields.indexRequired')"
              />
              <!-- <DxAsyncRule
                :validation-callback="validateEntityExists"
                :message="$t('translations.fields.haveRegistredEmail')"
              /> -->
            </DxSimpleItem>
            <DxSimpleItem data-field="numberOfDigitsInNumber">
              <DxLabel
                :text="$t('translations.fields.numberOfDigitsInNumber')"
              />
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
              <DxRequiredRule
                :message="$t('translations.fields.documentFlowRequired')"
              />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="registerType"
              :editor-options="registerTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.registerType')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="numberingSection">
              <DxLabel :text="$t('translations.fields.numberingSection')" />
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

          </DxGroupItem>
<!--
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
          </DxGroupItem> -->
        </DxForm>
        <DxDataGrid
              :show-borders="true"
              :data-source="documentRegistry.numberFormatItems"
              key-expr="id"
              :remote-operations="true"
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
                :allow-updating="true"
                :allow-deleting="true"
                :allow-adding="true"
                :useIcons="true"
                mode="raw"
              />

              <DxScrolling mode="virtual" />

              <DxColumn
                data-field="number"
                :caption="$t('translations.fields.number')"
              >
                <DxRequiredRule
                  :message="$t('translations.fields.numberRequired')"
                />
              </DxColumn>

              <DxColumn
                data-field="element"
                :caption="$t('translations.fields.element')"
              >
                <DxRequiredRule
                  :message="$t('translations.fields.elementRequired')"
                />
              </DxColumn>
              <DxColumn
                data-field="separator"
                :caption="$t('translations.fields.separator')"
              >
                <DxRequiredRule
                  :message="$t('translations.fields.separatorRequired')"
                />
              </DxColumn>
            </DxDataGrid>

             <DxButton
              :width="120"
              text="Contained"
              type="success"
              :button-options="addButtonOptions"
              styling-mode="contained"
              horizontal-alignment="right"
            />
      </form>
    </div>
  </div>
</template>
<script>
import "devextreme-vue/text-area";
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
  DxEmailRule,
  DxAsyncRule,
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
import { DxButton } from 'devextreme-vue';
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";

export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxEmailRule,
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
  computed: {
    documentFlowOptions() {
      return {
        dataSource: this.documentFlow,
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    numberingPeriodOptions() {
      return {
        dataSource: this.numberingPeriod,
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    registerTypeOptions() {
      return {
        dataSource: this.registerType,
        valueExpr: "id",
        displayExpr: "name"
      };
    }
  },
  data() {
    return {
      documentRegistry: {
        name: null,
        status: 0,
        index: null,
        numberOfDigitsInNumber: null,
        documentFlow: null,
        numberingPeriod: null,
        numberingSection: null,
        registerType: null,
        numberFormatItems: []
      },
      addButtonOptions: {
        width: 100,
        height: 50,
        text: this.$t("translations.links.add"),
        useSubmitBehavior: true,
        type: "success"
      },
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

      cancelButtonOptions: {
        onClick: this.backToEmployee,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },

      departmentOptions: {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.Department
          }),
          filter: ["status", "=", 0]
        }),
        valueExpr: "id",
        displayExpr: "name"
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
    backToDocumentRegistry() {
      this.$router.push("/docFlow/document-registration");
    },
    handleSubmit(e) {
      this.$axios
        .post(dataApi.company.Employee, this.employee)
        .then(res => {
          this.backToEmployee();
          notify(
            {
              message: this.$t("translations.menu.addEmployeeSucces"),
              position: {
                my: "center top",
                at: "center top"
              }
            },
            "success",
            3000
          );
        })
        .catch(e => {
          notify(
            {
              message: this.$t("translations.menu.addEmployeeError"),
              position: {
                my: "center top",
                at: "center top"
              }
            },
            "error",
            3000
          );
        });

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
