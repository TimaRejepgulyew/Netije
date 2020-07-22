<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="validatorGroup"
  >
    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.account')">
      <DxSimpleItem
        :isRequired="true"
        data-field="number"
        :editor-options="numberOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.accountNumber')" />
      </DxSimpleItem>
      <DxSimpleItem
        :isRequired="true"
        data-field="date"
        :editor-options="dateOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.accountDate')" />
      </DxSimpleItem>

      <DxSimpleItem
        :isRequired="true"
        data-field="totalAmount"
        :editor-options="totalAmountOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.totalAmount')" />
      </DxSimpleItem>
      <DxSimpleItem
        :isRequired="true"
        :col-span="1"
        data-field="currencyId"
        editor-type="dxSelectBox"
        :editor-options="currencyIdOptions"
      >
        <DxLabel location="left" :text="$t('translations.fields.currencyId')" />
      </DxSimpleItem>
    </DxGroupItem>

    <DxGroupItem :col-span="2" :col-count="1" :caption="$t('translations.fields.counterPart')">
      <DxSimpleItem data-field="counterpartyId" template="counterparty">
        <DxLabel location="left" :text="$t('translations.fields.counterPart')" />
        <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="2"
        data-field="leadingDocumentId"
        editor-type="dxSelectBox"
        :editor-options="leadingDocumentOptions"
        :help-text="counterpartyId?'':$t('translations.fields.counterPartRequired')"
      >
        <DxLabel location="left" :text="$t('document.fields.contract')" />
      </DxSimpleItem>
    </DxGroupItem>

    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.ourSide')">
      <DxSimpleItem
        data-field="businessUnitId"
        :editor-options="businessUnitOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.businessUnitId')" />
        <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="departmentId"
        :editor-options="deparmentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.departmentId')" />
        <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #counterparty>
      <custom-select-box
        :readOnly="isRegistered"
        validatorGroup="OfficialDocument"
        @valueChanged="setCounterparty"
        messageRequired="translations.fields.counterPartRequired"
        :value="counterpartyId"
      />
    </template>
  </DxForm>
</template>
<script>
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentQuery from "~/infrastructure/constants/documentQuery.js";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    customSelectBox
  },
  data() {
    return {
      validatorGroup: "OfficialDocument"
    };
  },
  methods: {
    setCounterparty(data) {
      this.$store.dispatch("currentDocument/setCounterparty", data);
      this.$store.dispatch("currentDocument/setLeadingDocumentId", null);
    }
  },

  computed: {
    isRegistered() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    counterpartyId() {
      return this.$store.getters["currentDocument/document"].counterpartyId;
    },
    departmentId() {
      return this.$store.getters["currentDocument/document"].departmentId;
    },
    numberOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentDocument/document"].number,
        onValueChanged: e => {
          this.$store.commit("currentDocument/NUMBER", e.value);
        }
      };
    },
    dateOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentDocument/document"].date,
        onValueChanged: e => {
          this.$store.commit("currentDocument/DATE", e.value);
        }
      };
    },
    leadingDocumentOptions() {
      return {
        readOnly: !this.counterpartyId,
        deferRendering: false,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: `${dataApi.paperWork.Documents}${DocumentQuery.Contract}`,
          filter: this.counterpartyId
            ? ["counterpartyId", "=", this.counterpartyId]
            : []
        }),
        value: this.$store.getters["currentDocument/document"]
          .leadingDocumentId,
        onValueChanged: e => {
          this.$store.dispatch("currentDocument/setLeadingDocumentId", e.value);
        }
      };
    },
    currencyIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Currency,
          filter: ["status", "=", 0]
        }),
        readOnly: this.isRegistered,
        value: this.$store.getters["currentDocument/document"].currencyId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_CURRENCY_ID", e.value);
        }
      };
    },
    totalAmountOptions() {
      return {
        format: "#,##0.00",
        readOnly: this.isRegistered,
        value: this.$store.getters["currentDocument/document"].totalAmount,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_TOTAL_AMOUNT", e.value);
        }
      };
    },
    businessUnitOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0]
        }),
        value: this.$store.getters["currentDocument/document"].businessUnitId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_BUSINESS_UNIT_ID", e.value);
          this.$store.commit("currentDocument/SET_DEPARTMENT_ID", null);
        }
      };
    },
    deparmentOptions() {
      let businessUnitId = this.$store.getters["currentDocument/document"]
        .businessUnitId;
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [
            ["businessUnitId", "=", businessUnitId],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"].departmentId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_DEPARTMENT_ID", e.value);
        }
      };
    }
  }
};
</script>

