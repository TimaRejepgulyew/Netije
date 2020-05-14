<template>
  <div>
    <Header :headerTitle="$t('translations.headers.addDocumentRegistry')"></Header>
    <toolbar @saveChanges="handleSubmit" :canSave="true" />
    <DxForm
      ref="form"
      :form-data.sync="documentRegister"
      :show-colon-after-label="true"
      :show-validation-summary="false"
    >
      <template #number-format-items-template>
        <div>
          <DxDataGrid
            :show-borders="true"
            :data-source="documentRegister.numberFormatItems"
            :errorRowEnabled="false"
            :allow-column-reordering="true"
            :allow-column-resizing="true"
            :column-auto-width="true"
          >
            <DxEditing
              :allow-updating="true"
              :allow-deleting="true"
              :allow-adding="true"
              :useIcons="true"
              mode="raw"
            />

            <DxColumn data-field="number" :caption="$t('translations.fields.number')">
              <DxRequiredRule :message="$t('translations.fields.numberRequired')" />
            </DxColumn>

            <DxColumn data-field="element" :caption="$t('translations.fields.element')">
              <DxRequiredRule :message="$t('translations.fields.elementRequired')" />
              <DxLookup
                :data-source="elements"
                :allowClearing="true"
                valueExpr="id"
                displayExpr="name"
              />
            </DxColumn>
            <DxColumn data-field="separator" :caption="$t('translations.fields.separator')">
              <DxPatternRule
                :ignore-empty-value="false"
                :pattern="codePattern"
                :message="$t('validation.valueMustNotContainsSpaces')"
              />
            </DxColumn>
          </DxDataGrid>
        </div>
      </template>
      <DxGroupItem>
        <DxSimpleItem data-field="name">
          <DxLabel location="top" :text="$t('translations.fields.name')" />
          <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="index">
          <DxLabel location="top" :text="$t('translations.fields.index')" />
          <DxRequiredRule :message="$t('translations.fields.indexRequired')" />
          <DxPatternRule
            :ignore-empty-value="false"
            :pattern="codePattern"
            :message="$t('validation.valueMustNotContainsSpaces')"
          />
        </DxSimpleItem>

        <DxSimpleItem
          editor-type="dxNumberBox"
          :editor-options="numberOfDigitsInNumber"
          data-field="numberOfDigitsInNumber"
        >
          <DxLabel location="top" :text="$t('translations.fields.numberOfDigitsInNumber')" />
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
          <DxLabel location="top" :text="$t('translations.fields.documentFlow')" />
          <DxRequiredRule :message="$t('translations.fields.documentFlowRequired')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="registerType"
          :editor-options="registerTypeOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.registerType')" />
          <DxRequiredRule :message="$t('translations.fields.registerTypeRequired')" />
        </DxSimpleItem>

        <DxSimpleItem
          :visible="isRegistrible"
          data-field="registrationGroupId"
          :editor-options="registrationGroupOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.registrationGroupId')" />
          <DxRequiredRule :message="$t('translations.fields.registrationGroupIdRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          editor-type="dxSelectBox"
          :editor-options="numberingSectionOptions"
          data-field="numberingSection"
        >
          <DxLabel location="top" :text="$t('translations.fields.numberingSection')" />
          <DxRequiredRule :message="$t('translations.fields.numberingSectionRequired')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="numberingPeriod"
          :editor-options="numberingPeriodOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.numberingPeriod')" />
          <DxRequiredRule
            numberingPeriodOptions
            :message="$t('translations.fields.numberingPeriodRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="status" :editor-options="statusOptions" editor-type="dxSelectBox">
          <DxLabel location="top" :text="$t('translations.fields.status')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxSimpleItem template="number-format-items-template" />
    </DxForm>
  </div>
</template>
<script>
import Toolbar from "~/components/shared/base-toolbar.vue";
import Status from "~/infrastructure/constants/status";
import RegisterType from "~/infrastructure/constants/registerTypes";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule
} from "devextreme-vue/form";

import {
  DxSearchPanel,
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxLookup
} from "devextreme-vue/data-grid";

export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxForm,
    DxSearchPanel,
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    Toolbar
  },

  data() {
    return {
      documentRegister: {
        name: null,
        status: 0,
        index: null,
        hasDocuments: false,
        registrationGroupId: null,
        hasRegistrationSettings: false,
        numberOfDigitsInNumber: null,
        documentFlow: null,
        numberingPeriod: null,
        numberingSection: null,
        registerType: null,
        numberFormatItems: [
          {
            number: 1,
            element: 1
          }
        ]
      },
      elements: this.$store.getters["docflow/numberFormatItems"](this),
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  computed: {
    isRegistrible() {
      return this.documentRegister.registerType == RegisterType.Registration;
    },
    documentFlowOptions() {
      return {
        valueExpr: "id",
        displayExpr: "name",
        dataSource: this.$store.getters["docflow/docflow"](this)
      };
    },
    registrationGroupOptions() {
      let filter = [];
      filter.push(["status", "=", Status.Active]);
      if (!this.$store.getters["permissions/IsAdmin"]) {
        filter.push("and");
        filter.push([
          "responsibleEmployeeId",
          "=",
          +this.$store.getters["permissions/employeeId"]
        ]);
      }
      return {
        valueExpr: "id",
        displayExpr: "name",
        dataSource: {
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.RegistrationGroup
          }),
          paginate: true,
          filter: filter
        }
      };
    },
    numberingSectionOptions() {
      return {
        valueExpr: "id",
        displayExpr: "name",
        dataSource: this.$store.getters["docflow/numberingSection"](this)
      };
    },
    numberingPeriodOptions() {
      return {
        valueExpr: "id",
        displayExpr: "name",
        dataSource: this.$store.getters["docflow/numberingPeriod"](this)
      };
    },
    registerTypeOptions() {
      return {
        valueExpr: "id",
        displayExpr: "name",
        dataSource: this.$store.getters["docflow/registerType"](this),
        onValueChanged: e => {
          this.documentRegister.registrationGroupId = null;
        }
      };
    },
    statusOptions() {
      return {
        valueExpr: "id",
        displayExpr: "status",
        dataSource: this.$store.getters["status/status"](this)
      };
    },
    numberOfDigitsInNumber() {
      return {
        max: 9,
        min: 0
      };
    }
  },
  methods: {
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(
          dataApi.docFlow.DocumentRegistry,
          this.documentRegister
        ),
        res => {
          this.$router.go(-1);
          this.$awn.success();
        },
        err => this.$awn.alert()
      );
    }
  }
};
</script>