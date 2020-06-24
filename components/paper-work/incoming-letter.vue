<template>
  <DxForm
    :col-count="2"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="validatorGroup"
  >
    <DxGroupItem :caption="$t('translations.fields.fromWhom')">
      <DxSimpleItem data-field="correspondentId" template="correspondent">
        <DxLabel location="top" :text="$t('translations.fields.counterPart')" />
        <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="dated" :editor-options="datedOptions" editor-type="dxDateBox">
        <DxLabel location="top" :text="$t('translations.fields.dated')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="inNumber" :editor-options="inNumberOptions">
        <DxLabel location="top" text="№" />
      </DxSimpleItem>

      <DxSimpleItem
        data-field="inResponseToId"
        :editor-options="inResponseToIdOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('translations.fields.inResponseToId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="deliveryMethodId"
        :editor-options="deliveryMethodOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('document.fields.deliveryMethodId')" />
      </DxSimpleItem>

      <DxGroupItem :visible="isOrganization">
        <DxSimpleItem data-field="counterpartySignatoryId" template="counterPartSignatury">
          <DxLabel location="top" :text="$t('translations.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="contactId" template="contact">
          <DxLabel location="top" :text="$t('translations.fields.contactId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>

    <DxGroupItem :caption="$t('translations.fields.whom')">
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

      <DxSimpleItem data-field="addresseeId" template="addressee">
        <DxLabel location="top" :text="$t('translations.fields.addresseeId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="assigneeId" template="assignee">
        <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
      </DxSimpleItem>
    </DxGroupItem>
    <template #correspondent>
      <custom-select-box
        validatorGroup="OfficialDocument"
        @valueChanged="setCorrenspondent"
        @selectionChanged="handlerCorrespondentSelectionChanged"
        messageRequired="translations.fields.counterPartRequired"
        :value="correspondentId"
      />
    </template>
    <template #contact>
      <custom-select-box-contact
        :correspondentId="correspondentId"
        @valueChanged="setContact"
        :value="contactId"
      />
    </template>
    <template #counterPartSignatury>
      <custom-select-box-contact
        :correspondentId="correspondentId"
        @valueChanged="setCounterpartySignatoryId"
        :value="counterpartySignatoryId"
      />
    </template>
    <template #addressee>
      <employee-select-box :value="addresseeId" @valueChanged="setAddresseeId" />
    </template>
    <template #assignee>
      <employee-select-box :value="assigneeId" @valueChanged="setAssigneeId" />
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
    setCorrenspondent(data) {
      if (data == null) {
        if (this.selectedCorrespondentType)
          this.selectedCorrespondentType.type = null;
      }
      this.$store.dispatch("currentDocument/setCorrespondent", data);
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
    setAddresseeId(data) {
      this.$store.commit("currentDocument/SET_ADDRESSE_ID", data);
    },
    setAssigneeId(data) {
      this.$store.commit("currentDocument/SET_ASSIGNEE_ID", data);
    },
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
      this.setContact(null);
      this.setCounterpartySignatoryId(null);
      this.$store.commit("currentDocument/IN_RESPONSE_TO_ID", null);
    }
  },
  computed: {
    isOrganization() {
      return (
        this.selectedCorrespondentType != null &&
        this.selectedCorrespondentType?.type !== "Person"
      );
    },
    store() {
      return this.$store.getters["currentDocument/document"];
    },
    isRegistered() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    correspondentId() {
      return this.$store.getters["currentDocument/document"].correspondentId;
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
    addresseeId() {
      return this.$store.getters["currentDocument/document"].addresseeId;
    },
    assigneeId() {
      return this.$store.getters["currentDocument/document"].assigneeId;
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
    inResponseToIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: `${dataApi.paperWork.Documents}${DocumentTypeGuid.OutgoingLetter}`,
          filter: [
            "correspondentId",
            "=",
            this.$store.getters["currentDocument/document"].correspondentId
          ]
        }),
        value: this.$store.getters["currentDocument/document"].inResponseToId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/IN_RESPONSE_TO_ID", e.value);
        }
      };
    },
    inNumberOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentDocument/document"].inNumber,
        onValueChanged: e => {
          this.$store.commit("currentDocument/IN_NUMBER", e.value);
        }
      };
    },
    datedOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentDocument/document"].dated,
        onValueChanged: e => {
          this.$store.commit("currentDocument/DATED", e.value);
        }
      };
    }
  }
};
</script>

