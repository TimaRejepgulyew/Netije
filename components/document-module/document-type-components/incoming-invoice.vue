<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.account')">
      <DxSimpleItem
        :isRequired="true"
        data-field="number"
        :editor-options="numberOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('document.fields.accountNumber')" />
      </DxSimpleItem>
      <DxSimpleItem
        :isRequired="true"
        data-field="date"
        :editor-options="dateOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('document.fields.accountDate')" />
      </DxSimpleItem>

      <DxSimpleItem
        :isRequired="true"
        data-field="totalAmount"
        :editor-options="totalAmountOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('document.fields.totalAmount')" />
      </DxSimpleItem>
      <DxSimpleItem
        :isRequired="true"
        :col-span="1"
        data-field="currencyId"
        editor-type="dxSelectBox"
        :editor-options="currencyIdOptions"
      >
        <DxLabel location="left" :text="$t('document.fields.currencyId')" />
      </DxSimpleItem>
    </DxGroupItem>

    <DxGroupItem
      :col-span="2"
      :col-count="1"
      :caption="$t('document.fields.counterPart')"
    >
      <DxSimpleItem data-field="counterpartyId" template="counterparty">
        <DxLabel location="left" :text="$t('document.fields.counterPart')" />
        <DxRequiredRule
          :message="$t('document.validation.counterPartRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="2"
        data-field="leadingDocumentId"
        editor-type="dxSelectBox"
        :editor-options="leadingDocumentOptions"
      >
        <DxLabel location="left" :text="$t('document.fields.contract')" />
        <DxRequiredRule :message="$t('document.validation.contractRequired')" />
      </DxSimpleItem>
    </DxGroupItem>

    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.ourSide')">
      <DxSimpleItem
        data-field="businessUnitId"
        :editor-options="businessUnitOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.businessUnitId')" />
        <DxRequiredRule
          :message="$t('document.validation.businessUnitIdRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="departmentId"
        :editor-options="deparmentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.departmentId')" />
        <DxRequiredRule
          :message="$t('document.validation.departmentIdRequired')"
        />
      </DxSimpleItem>
    </DxGroupItem>
    <template #counterparty>
      <custom-select-box
        value-expr="id"
        :readOnly="isRegistered"
        :validatorGroup="documentValidatorName"
        @valueChanged="setCounterparty"
        messageRequired="document.validation.counterPartRequired"
        :value="counterpartyId"
      />
    </template>
  </DxForm>
</template>
<script>
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentQuery from "~/infrastructure/constants/query/documentQuery.js";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    customSelectBox,
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  methods: {
    setCounterparty(data) {
      this.$store.commit(`documents/${this.documentId}/SET_COUNTERPARTY`, data);
      this.$store.dispatch(
        `documents/${this.documentId}/setLeadingDocumentId`,
        null
      );
    },
  },

  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    counterpartyId() {
      return this.document.counterpartyId;
    },
    departmentId() {
      return this.document.departmentId;
    },
    numberOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.number,
        onValueChanged: (e) => {
          this.$store.commit(`documents/${this.documentId}/NUMBER`, e.value);
        },
      };
    },
    dateOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.date,
        onValueChanged: (e) => {
          this.$store.commit(`documents/${this.documentId}/DATE`, e.value);
        },
      };
    },
    leadingDocumentOptions() {
      return {
        readOnly: !this.counterpartyId,
        deferRendering: false,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: `${dataApi.documentModule.Documents}${DocumentQuery.Contract}`,
          filter: this.counterpartyId
            ? ["counterpartyId", "=", this.counterpartyId]
            : [],
        }),
        value: this.document.leadingDocumentId,
        onValueChanged: (e) => {
          this.$store.dispatch(
            `documents/${this.documentId}/setLeadingDocumentId`,
            e.value
          );
        },
      };
    },
    currencyIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Currency,
          filter: ["status", "=", 0],
        }),
        readOnly: this.isRegistered,
        value: this.document.currencyId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_CURRENCY_ID`,
            e.value
          );
        },
      };
    },
    totalAmountOptions() {
      return {
        format: "#,##0.00",
        readOnly: this.isRegistered,
        value: this.document.totalAmount,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_TOTAL_AMOUNT`,
            e.value
          );
        },
      };
    },
    businessUnitOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0],
        }),
        value: this.document.businessUnitId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,
            e.value
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_DEPARTMENT_ID`,
            null
          );
        },
      };
    },
    deparmentOptions() {
      let businessUnitId = this.document.businessUnitId;
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [
            ["businessUnitId", "=", businessUnitId],
            "and",
            ["status", "=", 0],
          ],
        }),
        value: this.document.departmentId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_DEPARTMENT_ID`,
            e.value
          );
        },
      };
    },
  },
};
</script>

