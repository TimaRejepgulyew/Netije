<template>
  <DxForm
    :store.sync="store"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :caption="$t('translations.fields.whom')">
      <DxSimpleItem data-field="correspondentId" template="correspondent">
        <DxLabel location="top" :text="$t('translations.fields.counterPart')" />
        <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
      </DxSimpleItem>

      <DxSimpleItem data-field="addresseeId" template="contact">
        <DxLabel location="top" :text="$t('translations.fields.addresseeId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="inResponseToId"
        :editor-options="inResponseToIdOptions"
        editor-type="dxSelectBox"
        :help-text="correspondentId?'':$t('translations.fields.counterPartRequired')"
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
    </DxGroupItem>
    <DxGroupItem :col-count="2" :caption="$t('translations.fields.fromWhom')">
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
      <DxSimpleItem template="prepared" data-field="preparedById">
        <DxRequiredRule :message="$t('translations.fields.preparedRequired')" />
        <DxLabel location="top" :text="$t('translations.fields.prepared')" />
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
        :disabled="!isCompany"
        :correspondentId="correspondentId"
        @valueChanged="setAddressee"
        :value="addresseeId"
      />
    </template>

    <template #prepared>
      <employee-select-box
        validatorGroup="OfficialDocument"
        :value="preparedById"
        @valueChanged="setPreparedById"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        :value="ourSignatoryId"
        :storeApi="signatoryApi"
        @valueChanged="setOurSignatoryId"
      />
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
    customSelectBox,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    customSelectBoxContact,
    employeeSelectBox
  },
  data() {
    return {
      selectedCorrespondentType: null,
      signatoryApi: dataApi.signatureSettings.Members,
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
      this.$store.commit("currentDocument/IN_RESPONSE_TO_ID", null);
      this.$store.commit("currentDocument/SET_ADDRESSE_ID", null);
      this.$store.dispatch("currentDocument/setCorrespondent", data);
    },
    setAddressee(data) {
      this.$store.commit("currentDocument/SET_ADDRESSE_ID", data && data.id);
    },
    setPreparedById(data) {
      this.$store.commit("currentDocument/SET_PREPARED_BY_ID", data);
    },
    setOurSignatoryId(data) {
      this.$store.commit("currentDocument/SET_OUR_SIGNATORY_ID", data);
    },
    handlerCorrespondentSelectionChanged(data) {
      this.selectedCorrespondentType = data;
    }
  },
  computed: {
    preparedById() {
      return this.$store.getters["currentDocument/document"].preparedById;
    },
    ourSignatoryId() {
      return this.$store.getters["currentDocument/document"].ourSignatoryId;
    },
    addresseeId() {
      return this.$store.getters["currentDocument/document"].addresseeId;
    },
    isCompany() {
      return (
        this.selectedCorrespondentType != null &&
        this.selectedCorrespondentType?.type !== "Person"
      );
    },
    isRegistered() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    store() {
      return this.$store.getters["currentDocument/document"];
    },
    correspondentId() {
      return this.$store.getters["currentDocument/document"].correspondentId;
    },
    businessUnitId() {
      return this.$store.getters["currentDocument/document"].businessUnitId;
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
          this.$store.commit("currentDocument/SET_OUR_SIGNATORY_ID", null);
          this.$store.commit("currentDocument/SET_PREPARED_BY_ID", null);
          this.$store.commit("currentDocument/SET_DEPARTMENT_ID", null);
        }
      };
    },
    deparmentOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [
            ["businessUnitId", "=", this.businessUnitId],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"].departmentId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_PREPARED_BY_ID", null);
          this.$store.commit("currentDocument/SET_DEPARTMENT_ID", e.value);
        }
      };
    },

    inResponseToIdOptions() {
      return {
        readOnly: !this.correspondentId,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: `${dataApi.paperWork.Documents}${DocumentTypeGuid.IncomingLetter}`,
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
    }
  }
};
</script>
