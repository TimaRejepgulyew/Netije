<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxSimpleItem
      :col-span="1"
      data-field="documentGroupId"
      editor-type="dxSelectBox"
      :editor-options="documentGroupIdOptions"
    >
      <DxLabel location="left" :text="$t('document.fields.documentGroupId')" />
      <DxRequiredRule
        :message="$t('document.validation.documentGroupIdRequired')"
      />
    </DxSimpleItem>
    <DxSimpleItem
      :col-span="1"
      data-field="isStandard"
      editor-type="dxCheckBox"
      :editor-options="isStandardOptions"
    >
      <DxLabel location="left" :text="$t('document.fields.isStandard')" />
    </DxSimpleItem>
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
      <DxGroupItem :col-count="2">
        <DxSimpleItem
          data-field="counterpartySignatoryId"
          template="counterPartSignatury"
        >
          <DxLabel location="left" :text="$t('document.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="contactId" template="contact">
          <DxLabel location="left" :text="$t('document.fields.contactId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.ourSide')">
      <DxSimpleItem data-field="businessUnit" template="businessUnitSelectBox">
        <DxLabel location="left" :text="$t('document.fields.businessUnitId')" />
        <DxRequiredRule
          :message="$t('document.validation.businessUnitIdRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem data-field="department" template="departmentSelectBox">
        <DxLabel location="left" :text="$t('document.fields.departmentId')" />
        <DxRequiredRule
          :message="$t('document.validation.departmentIdRequired')"
        />
      </DxSimpleItem>

      <DxSimpleItem data-field="ourSignatory" template="ourSignatory">
        <DxLabel location="left" :text="$t('document.fields.signatory')" />
      </DxSimpleItem>
      <DxSimpleItem
        template="responsibleEmployee"
        data-field="responsibleEmployee"
      >
        <DxLabel
          location="left"
          :text="$t('document.fields.responsibleEmployeeId')"
        />
      </DxSimpleItem>
    </DxGroupItem>
    <DxGroupItem
      :col-span="2"
      :col-count="3"
      :caption="$t('shared.conditions')"
    >
      <DxSimpleItem
        :isRequired="validFromRequired"
        data-field="validFrom"
        :editor-options="validFromOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('document.fields.validFrom')" />
      </DxSimpleItem>
      <DxSimpleItem
        :isRequired="validTillRequired"
        data-field="validTill"
        :editor-options="validTillOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="left" :text="$t('document.fields.validTill')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="daysToFinishWorks"
        :editor-options="daysToFinishWorksOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel
          location="left"
          :text="$t('document.fields.daysToFinishWorks')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="totalAmount"
        :editor-options="totalAmountOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="left" :text="$t('document.fields.totalAmount')" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="1"
        data-field="currencyId"
        editor-type="dxSelectBox"
        :editor-options="currencyIdOptions"
      >
        <DxLabel location="left" :text="$t('document.fields.currencyId')" />
      </DxSimpleItem>

      <DxSimpleItem
        :col-span="1"
        data-field="isAutomaticRenewal"
        editor-type="dxCheckBox"
        :editor-options="isAutomaticRenewalOptions"
      >
        <DxLabel
          location="left"
          :text="$t('document.fields.isAutomaticRenewal')"
        />
      </DxSimpleItem>
    </DxGroupItem>
    <template #counterparty>
      <custom-select-box
        :readOnly="readOnly"
        @selectionChanged="handlerCorrespondentSelectionChanged"
        :isRequired="true"
        :validatorGroup="documentValidatorName"
        @valueChanged="setCounterparty"
        messageRequired="document.validation.counterPartRequired"
        :value="counterpartyId"
      />
    </template>
    <template #contact>
      <custom-select-box-contact
        :readOnly="readOnly"
        :disabled="!isCompany"
        :correspondentId="counterpartyId"
        @valueChanged="setContact"
        :value="contactId"
      />
    </template>
    <template #counterPartSignatury>
      <custom-select-box-contact
        :readOnly="readOnly"
        :disabled="!isCompany"
        :correspondentId="counterpartyId"
        @valueChanged="setCounterpartySignatoryId"
        :value="counterpartySignatoryId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        :readOnly="readOnly"
        :value="ourSignatory"
        :storeApi="signatoryApi"
        @valueChanged="setOurSignatory"
      />
    </template>
    <template #responsibleEmployee>
      <employee-select-box
        :readOnly="readOnly"
        :value="responsibleEmployee"
        @valueChanged="setResponsibleEmployee"
      />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :isRequired="true"
        :value="businessUnit"
        @valueChanged="
          (data) => {
            setBusinessUnit(data);
            setAddressee(null);
            setDepartment(null);
          }
        "
      />
    </template>
    <template #departmentSelectBox>
      <department-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :isRequired="true"
        :value="department"
        :businessUnitId="businessUnitId"
        @valueChanged="
          (data) => {
            setDepartment(data);
            setAddressee(null);
          }
        "
      />
    </template>
  </DxForm>
</template>
<script>
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import customSelectBoxContact from "~/components/parties/contact/custom-select-box.vue";
import customSelectBox from "~/components/parties/custom-select-box.vue";
import Status from "~/infrastructure/constants/status";
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
    BusinessUnitSelectBox,
    DepartmentSelectBox,
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  data() {
    return {
      selectedCorrespondentType: null,
      signatoryApi: dataApi.signatureSettings.Members,
    };
  },
  computed: {
    isCompany() {
      return (
        this.selectedCorrespondentType != null &&
        this.selectedCorrespondentType?.type !== "Person"
      );
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    validTillRequired() {
      return this.isAutomaticRenewal || Boolean(this.daysToFinishWorks);
    },
    validFromRequired() {
      return this.isAutomaticRenewal;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    counterpartyId() {
      return this.document.counterpartyId;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    department() {
      return this.document.department;
    },
    contactId() {
      return this.document.contactId;
    },
    businessUnit() {
      return this.document.businessUnit;
    },
    businessUnitId() {
      return this.businessUnit?.id;
    },
    counterpartySignatoryId() {
      return this.document.counterpartySignatoryId;
    },
    ourSignatory() {
      return this.document.ourSignatory;
    },
    responsibleEmployee() {
      return this.document.responsibleEmployee;
    },
    daysToFinishWorks() {
      return this.document.daysToFinishWorks;
    },
    validTill() {
      return this.document.validTill;
    },
    isAutomaticRenewal() {
      return this.document.isAutomaticRenewal;
    },
    isStandardOptions() {
      return {
        readOnly: this.readOnly,
        value: this.document.isStandard,
        onValueChanged: (e) => {
          this.setIsStandard(e.value);
        },
      };
    },
    currencyIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Currency,
          filter: ["status", "=", Status.Active],
        }),
        readOnly: this.readOnly,
        value: this.document.currencyId,
        onValueChanged: (e) => {
          this.setCurrencyId(e.value);
        },
      };
    },
    totalAmountOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        format: "#,##0.00",
        readOnly: this.readOnly,
        value: this.document.totalAmount,
        onValueChanged: (e) => {
          this.setTotalAmount(e.value);
        },
      };
    },
    isAutomaticRenewalOptions() {
      return {
        value: this.isAutomaticRenewal,
        onValueChanged: (e) => {
          this.setAutomaticRenewal(e.value);
        },
      };
    },
    documentGroupIdOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.ContractCategories,
          filter: ["status", "=", Status.Active],
        }),
        value: this.document.documentGroupId,
        onValueChanged: (e) => {
          this.setDocumentGroupId(e.value);
        },
      };
    },
    validFromOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        useMaskBehavior: true,
        openOnFieldClick: true,
        value: this.document.validFrom,
        onValueChanged: (e) => {
          this.setValidFrom(e.value);
        },
      };
    },
    validTillOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        useMaskBehavior: true,
        openOnFieldClick: true,
        value: this.validTill,
        onValueChanged: (e) => {
          this.setValidTill(e.value);
        },
      };
    },
    daysToFinishWorksOptions() {
      return {
        readOnly: this.readOnly,
        value: this.daysToFinishWorks,
        onValueChanged: (e) => {
          this.setDaysToFinishWorks(e.value);
        },
      };
    },
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
      this.dispatchCounterparty(data);
      this.setContact(null);
      this.setCounterpartySignatoryId(null);
    },
    setContact(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_CONTACT_ID`,
        data && data.id
      );
    },
    dispatchCounterparty(data) {
      this.$store.dispatch(
        `documents/${this.documentId}/setCounterparty`,
        data
      );
    },
    setCounterpartySignatoryId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_COUNTERPART_SIGNATORY_ID`,
        data && data.id
      );
    },
    setOurSignatory(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_OUR_SIGNATORY`,
        data
      );
    },
    setResponsibleEmployee(data) {
      return this.$store.commit(
        `documents/${this.documentId}/SET_RESPONSIBLE_EMPLOYEE`,
        data
      );
    },
    setAddressee(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE`, data);
    },
    setBusinessUnit(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_BUSINESS_UNIT`,
        data
      );
    },
    setDepartment(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT`, data);
    },
    setDaysToFinishWorks(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_DAYS_TO_FINISH_WORKS`,
        data
      );
    },
    setValidTill(data) {
      this.$store.commit(`documents/${this.documentId}/SET_VALID_TILL`, data);
    },
    setValidFrom(data) {
      this.$store.commit(`documents/${this.documentId}/SET_VALID_FROM`, data);
    },
    setDocumentGroupId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_DOCUMENT_GROUP_ID`,
        data
      );
    },
    setAutomaticRenewal(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_AUTOMATIC_RENEWAL`,
        data
      );
    },
    setTotalAmount(data) {
      this.$store.commit(`documents/${this.documentId}/SET_TOTAL_AMOUNT`, data);
    },
    setCurrencyId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_CURRENCY_ID`, data);
    },
    setIsStandard(data) {
      this.$store.commit(`documents/${this.documentId}/SET_IS_STANDARD`, data);
    },
  },
};
</script>
