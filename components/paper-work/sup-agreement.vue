<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="validatorGroup"
  >
    <DxSimpleItem
      :col-span="2"
      data-field="isStandard"
      editor-type="dxCheckBox"
      :editor-options="isStandardOptions"
    >
      <DxLabel location="left" :text="$t('translations.fields.IsStandardSupAgreement')" />
    </DxSimpleItem>

    <DxSimpleItem
      :isRequired="true"
      :col-span="2"
      data-field="leadingDocumentId"
      editor-type="dxSelectBox"
      :editor-options="leadingDocumentOptions"
      :help-text="counterpartyId?'':$t('translations.fields.counterPartRequired')"
    >
      <DxLabel location="left" :text="$t('document.fields.contract')" />
    </DxSimpleItem>

    <DxGroupItem :col-span="2" :col-count="1" :caption="$t('translations.fields.counterPart')">
      <DxSimpleItem data-field="counterpartyId" template="counterparty">
        <DxLabel location="left" :text="$t('translations.fields.counterPart')" />
        <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
      </DxSimpleItem>
      <DxGroupItem :col-count="2">
        <DxSimpleItem data-field="counterpartySignatoryId" template="counterPartSignatury">
          <DxLabel location="left" :text="$t('translations.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="contactId" template="contact">
          <DxLabel location="left" :text="$t('translations.fields.contactId')" />
        </DxSimpleItem>
      </DxGroupItem>
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

      <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
        <DxLabel location="left" :text="$t('translations.fields.signatory')" />
      </DxSimpleItem>
      <DxSimpleItem template="responsibleEmployee" data-field="responsibleEmployeeId">
        <DxLabel location="left" :text="$t('translations.fields.responsibleEmployeeId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.conditions')">
      <DxSimpleItem
        data-field="validFrom"
        :editor-options="validFromOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.validFrom')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="validTill"
        :editor-options="validTillOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.validTill')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="totalAmount"
        :editor-options="totalAmountOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('translations.fields.totalAmount')" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="1"
        data-field="currencyId"
        editor-type="dxSelectBox"
        :editor-options="currencyIdOptions"
      >
        <DxLabel location="left" :text="$t('translations.fields.currencyId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #counterparty>
      <custom-select-box
        @selectionChanged="handlerCorrespondentSelectionChanged"
        validatorGroup="OfficialDocument"
        @valueChanged="setCounterparty"
        messageRequired="translations.fields.counterPartRequired"
        :value="counterpartyId"
      />
    </template>
    <template #contact>
      <custom-select-box-contact
        :disabled="!isCompany"
        :correspondentId="counterpartyId"
        @valueChanged="setContact"
        :value="contactId"
      />
    </template>
    <template #counterPartSignatury>
      <custom-select-box-contact
        :disabled="!isCompany"
        :correspondentId="counterpartyId"
        @valueChanged="setCounterpartySignatoryId"
        :value="counterpartySignatoryId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        valueExpr="id"
        :value="ourSignatoryId"
        :storeApi="signatoryApi"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #responsibleEmployee>
      <employee-select-box
        valueExpr="id"
        :value="responsibleEmployeeId"
        @valueChanged="setResponsibleEmployeeId"
      />
    </template>
  </DxForm>
</template>
<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import customSelectBoxContact from "~/components/parties/contact/custom-select-box.vue";
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentQuery from "~/infrastructure/constants/documentQuery.js";
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
    customSelectBoxContact,
    employeeSelectBox,
  },
  props: ["documentId"],
  data() {
    return {
      selectedCorrespondentType: null,
      signatoryApi: dataApi.signatureSettings.Members,
      validatorGroup: "OfficialDocument",
    };
  },
  methods: {
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
    },
    setCounterparty(data) {
      if (data == null) {
        if (this.selectedCorrespondentType)
          this.selectedCorrespondentType.type = null;
      }
      this.$store.dispatch("documents/${this.documentId}/setLeadingDocumentId", null);
      this.$store.dispatch("documents/${this.documentId}/setCounterparty", data);
      this.$store.commit("documents/${this.documentId}/SET_CONTACT_ID", null);
      this.$store.commit("documents/${this.documentId}/SET_COUNTERPART_SIGNATORY_ID", null);
    },
    setContact(data) {
      this.$store.commit("documents/${this.documentId}/SET_CONTACT_ID", data && data.id);
    },
    setCounterpartySignatoryId(data) {
      this.$store.commit(
        "documents/${this.documentId}/SET_COUNTERPART_SIGNATORY_ID",
        data && data.id
      );
    },
    setOurSignatoryId(data) {
      this.$store.commit("documents/${this.documentId}/SET_OUR_SIGNATORY_ID", data);
    },
    setResponsibleEmployeeId(data) {
      return this.$store.commit(
        "documents/${this.documentId}/SET_RESPONSIBLE_EMPLOYEE_ID",
        data
      );
    },
  },

  computed: {
    document(){
      return this.$store.getters[`documents/${this.documentId}/document`]
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    counterpartyId() {
      return this.$store.getters[`documents/${this.documentId}/document`].counterpartyId;
    },
    departmentId() {
      return this.$store.getters[`documents/${this.documentId}/document`].departmentId;
    },
    contactId() {
      return this.$store.getters[`documents/${this.documentId}/document`].contactId;
    },
    counterpartySignatoryId() {
      return this.$store.getters[`documents/${this.documentId}/document`]
        .counterpartySignatoryId;
    },
    ourSignatoryId() {
      return this.$store.getters[`documents/${this.documentId}/document`].ourSignatoryId;
    },
    responsibleEmployeeId() {
      return this.$store.getters[`documents/${this.documentId}/document`]
        .responsibleEmployeeId;
    },
    isStandardOptions() {
      return {
        readOnly: this.isRegistered,
        value: this.$store.getters[`documents/${this.documentId}/document`].isStandard,
        onValueChanged: (e) => {
          this.$store.commit(`documents/${this.documentId}/SET_IS_STANDARD`, e.value);
        },
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
            : [],
        }),
        value: this.$store.getters[`documents/${this.documentId}/document`]
          .leadingDocumentId,
        onValueChanged: (e) => {
          this.$store.dispatch(`documents/${this.documentId}/setLeadingDocumentId`, e.value);
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
        value: this.$store.getters[`documents/${this.documentId}/document`].currencyId,
        onValueChanged: (e) => {
          this.$store.commit(`documents/${this.documentId}/SET_CURRENCY_ID`, e.value);
        },
      };
    },
    totalAmountOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        format: "#,##0.00",
        readOnly: this.isRegistered,
        value: this.$store.getters[`documents/${this.documentId}/document`].totalAmount,
        onValueChanged: (e) => {
          this.$store.commit(`documents/${this.documentId}/SET_TOTAL_AMOUNT`, e.value);
        },
      };
    },
    validFromOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.$store.getters["documents/${this.documentId}/document"].validFrom,
        onValueChanged: (e) => {
          this.$store.commit("documents/${this.documentId}/SET_VALID_FROM", null);
        },
      };
    },
    validTill() {
      return this.$store.getters["documents/${this.documentId}/document"].validTill;
    },
    validTillOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.validTill,
        onValueChanged: (e) => {
          this.$store.commit("documents/${this.documentId}/SET_VALID_TILL", e.value);
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
        value: this.$store.getters["documents/${this.documentId}/document"].businessUnitId,
        onValueChanged: (e) => {
          this.$store.commit("documents/${this.documentId}/SET_BUSINESS_UNIT_ID", e.value);
          this.$store.commit("documents/${this.documentId}/SET_ADDRESSE_ID", null);
          this.$store.commit("documents/${this.documentId}/SET_DEPARTMENT_ID", null);
        },
      };
    },
    deparmentOptions() {
      let businessUnitId = this.$store.getters["documents/${this.documentId}/document"]
        .businessUnitId;
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
        value: this.$store.getters["documents/${this.documentId}/document"].departmentId,
        onValueChanged: (e) => {
          this.$store.commit("documents/${this.documentId}/SET_ADDRESSE_ID", null);
          this.$store.commit("documents/${this.documentId}/SET_DEPARTMENT_ID", e.value);
        },
      };
    },
    isCompany() {
      return (
        this.selectedCorrespondentType != null &&
        this.selectedCorrespondentType?.type !== "Person"
      );
    },
  },
};
</script>

