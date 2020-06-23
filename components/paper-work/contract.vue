<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="validatorGroup"
  >
    <DxSimpleItem
      :col-span="1"
      data-field="documentGroupId"
      editor-type="dxSelectBox"
      :editor-options="documentGroupIdOptions"
    >
      <DxLabel location="top" :text="$t('translations.fields.documentGroupId')" />
      <DxRequiredRule :message="$t('translations.fields.documentGroupIdRequired')" />
    </DxSimpleItem>
    <DxSimpleItem
      :col-span="1"
      data-field="isStandard"
      editor-type="dxCheckBox"
      :editor-options="isStandardOptions"
    >
      <DxLabel location="top" :text="$t('translations.fields.IsStandard')" />
    </DxSimpleItem>
    <DxGroupItem :col-span="2" :col-count="1" :caption="$t('translations.fields.counterPart')">
      <DxSimpleItem data-field="counterpartyId" template="counterparty">
        <DxLabel location="top" :text="$t('translations.fields.counterPart')" />
        <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
      </DxSimpleItem>
      <DxGroupItem :visible="isCompany" :col-count="2">
        <DxSimpleItem data-field="counterpartySignatoryId" template="counterPartSignatury">
          <DxLabel location="top" :text="$t('translations.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="contactId" template="contact">
          <DxLabel location="top" :text="$t('translations.fields.contactId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.ourSide')">
      <DxSimpleItem
        data-field="businessUnitId"
        :editor-options="businessUnitOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.businessUnitId')" />
        <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="departmentId"
        :editor-options="deparmentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.departmentId')" />
        <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
        <DxLabel location="top" :text="$t('translations.fields.signatory')" />
      </DxSimpleItem>
      <DxSimpleItem template="responsibleEmployee" data-field="responsibleEmployeeId">
        <DxLabel location="top" :text="$t('translations.fields.responsibleEmployeeId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <DxGroupItem :col-span="2" :col-count="2" :caption="$t('shared.conditions')">
      <DxSimpleItem
        data-field="validFrom"
        :editor-options="validFromOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.validFrom')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="validTill"
        :editor-options="validTillOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.validTill')" />
        <DxRequiredRule
          v-if="isvalidTillRequired"
          :message="$t('translations.fields.validTillRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="daysToFinishWorks"
        :editor-options="daysToFinishWorksOptions"
        editor-type="dxNumberBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.daysToFinishWorks')" />
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
        :correspondentId="counterpartyId"
        @valueChanged="setContact"
        :value="contactId"
      />
    </template>
    <template #counterPartSignatury>
      <custom-select-box-contact
        :correspondentId="counterpartyId"
        @valueChanged="setCounterpartySignatoryId"
        :value="counterpartySignatoryId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        :value="ourSignatoryId"
        :storeApi="signatoryApi"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #responsibleEmployee>
      <employee-select-box :value="responsibleEmployeeId" @valueChanged="setResponsibleEmployeeId" />
    </template>
  </DxForm>
</template>
<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
import customSelectBoxContact from "~/components/parties/contact/custom-select-box.vue";
import customSelectBox from "~/components/parties/custom-select-box.vue";
import DocumentTypeGuid from "~/infrastructure/constants/documentFilterType.js";
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
    customSelectBox,
    customSelectBoxContact,
    employeeSelectBox
  },
  data() {
    return {
      selectedCorrespondentType: null,
      signatoryApi: dataApi.signatureSettings.Members,
      validatorGroup: "OfficialDocument",
      deliveryMethodOptions: {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.MailDeliveryMethod
        }),
        value: this.$store.getters["currentDocument/document"].deliveryMethodId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_DELIVERY_METHOD_ID", e.value);
        }
      }
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
      this.$store.dispatch("currentDocument/setCounterparty", data);
      this.$store.commit("currentDocument/SET_CONTACT_ID", null);
    },
    setContact(data) {
      this.$store.commit("currentDocument/SET_CONTACT_ID", data && data.id);
    },
    setCounterpartySignatoryId(data) {
      this.$store.commit(
        "currentDocument/SET_COUNTERPART_SIGNATORY_ID",
        data && data.id
      );
    },
    setOurSignatoryId(data) {
      this.$store.commit("currentDocument/SET_OUR_SIGNATORY_ID", data);
    },
    setResponsibleEmployeeId(data) {
      return this.$store.commit(
        "currentDocument/SET_RESPONSIBLE_EMPLOYEE_ID",
        data
      );
    }
  },

  computed: {
    isvalidTillRequired() {
      return;
    },
    store() {
      return this.$store.getters["currentDocument/document"];
    },
    isRegistered() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    counterpartyId() {
      return this.$store.getters["currentDocument/document"].counterpartyId;
    },
    departmentId() {
      return this.$store.getters["currentDocument/document"].departmentId;
    },
    contactId() {
      return this.$store.getters["currentDocument/document"].contactId;
    },
    counterpartySignatoryId() {
      return this.$store.getters["currentDocument/document"]
        .counterpartySignatoryId;
    },
    ourSignatoryId() {
      return this.$store.getters["currentDocument/document"].ourSignatoryId;
    },
    validTill() {
      return this.$store.getters["currentDocument/document"].validTill;
    },
    daysToFinishWorks() {
      return this.$store.getters["currentDocument/document"].daysToFinishWorks;
    },
    responsibleEmployeeId() {
      return this.$store.getters["currentDocument/document"]
        .responsibleEmployeeId;
    },
    isStandardOptions() {
      return {
        readOnly: this.isRegistered,
        value: this.$store.getters["currentDocument/document"].isStandard,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_IS_STANDARD", e.value);
        }
      };
    },
    documentGroupIdOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.ContractCategory,
          filter: ["status", "=", 0]
        }),
        value: this.$store.getters["currentDocument/document"].documentGroupId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_BUSINESS_UNIT_ID", e.value);
          this.$store.commit("currentDocument/SET_ADDRESSE_ID", null);
          this.$store.commit("currentDocument/SET_DEPARTMENT_ID", null);
        }
      };
    },
    validFromOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentDocument/document"].validFrom,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_VALID_FROM", null);
        }
      };
    },
    validTillOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.validTill,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_VALID_TILL", e.value);
        }
      };
    },
    daysToFinishWorksOptions() {
      return {
        readOnly: this.isRegistered,
        value: this.daysToFinishWorks,
        onValueChanged: e => {
          checkValidDaysToFinishWorks(
            this.$store.getters["currentDocument/document"].validTill,
            e.value
          );
          this.$store.commit(
            "currentDocument/SET_DAYS_TO_FINISH_WORKS",
            e.value
          );
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
          this.$store.commit("currentDocument/SET_ADDRESSE_ID", null);
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
          this.$store.commit("currentDocument/SET_ADDRESSE_ID", null);
          this.$store.commit("currentDocument/SET_DEPARTMENT_ID", e.value);
        }
      };
    },
    isCompany() {
      return (
        this.selectedCorrespondentType != null &&
        this.selectedCorrespondentType?.type !== "Person"
      );
    }
  }
};
</script>

