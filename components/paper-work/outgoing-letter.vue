<template>
  <DxForm
    :col-count="1"
    :store.sync="store"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :col-count="2">
      <DxGroupItem :caption="$t('translations.fields.fromWhom')">
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

        <DxSimpleItem
          data-field="ourSignatoryId"
          :editor-options="ourSignatoryOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="preparedById"
          :editor-options="preparedByOptions"
          editor-type="dxSelectBox"
        >
          <DxRequiredRule :message="$t('translations.fields.preparedRequired')" />
          <DxLabel location="top" :text="$t('translations.fields.prepared')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem :caption="$t('translations.fields.whom')">
        <DxSimpleItem data-field="correspondentId" template="correspondent">
          <DxLabel location="top" :text="$t('translations.fields.counterPart')" />
          <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="contactId" :visible="isCompany" template="contact">
          <DxLabel location="top" :text="$t('translations.fields.addresseeId')" />
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
      </DxGroupItem>
    </DxGroupItem>
    <template #correspondent>
      <custom-select-box
        validatorGroup="OfficialDocument"
        @setСounterPart="setCorrenspondent"
        messageRequired="translations.fields.counterPartRequired"
        :counterPart="correspondentId"
      />
    </template>
    <template #contact>
      <custom-select-box-contact @setСounterPart="setContact" :counterPart="contactId" />
    </template>
  </DxForm>
</template>
<script>
import customSelectBoxContact from "~/components/parties/custom-select-box-contact.vue";
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
    customSelectBoxContact
  },
  data() {
    return {
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
      this.$store.dispatch("currentDocument/setCorrespondent", data);
      this.$store.commit("currentDocument/SET_CONTACT_ID", null);
    },
    setContact(data) {
      this.$store.commit("currentDocument/SET_CONTACT_ID", data && data.id);
    }
  },
  computed: {
    contactId() {
      return this.$store.getters["currentDocument/document"].contactId;
    },
    isCompany() {
      if (this.$store.getters["currentDocument/document"].correspondent.id)
        return (
          this.$store.getters["currentDocument/document"].correspondent.type !==
          "Person"
        );
      else return false;
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
    contactOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.contragents.Contact,
          filter: [
            ["companyId", "=", this.correspondentId],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"].contactId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_CONTACT_ID", e.value);
        }
      };
    },
    correspondentOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.contragents.CounterPart
        }),
        value: this.$store.getters["currentDocument/document"].correspondentId,
        onSelectionChanged: e => {
          if (e.selectedItem) {
          }
          this.$store.dispatch(
            "currentDocument/setCorrespondent",
            e.selectedItem
          );
        },
        onValueChanged: () => {
          this.$store.commit("currentDocument/SET_CONTACT_ID", null);
          this.$store.commit(
            "currentDocument/SET_COUNTERPART_SIGNATORY_ID",
            null
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
    ourSignatoryOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [
            ["businessUnitId", "=", this.businessUnitId],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"].ourSignatoryId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_OUR_SIGNATORY_ID", e.value);
        }
      };
    },
    preparedByOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [
            [
              "departmentId",
              "=",
              this.$store.getters["currentDocument/document"].departmentId
            ],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"].preparedById,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_PREPARED_BY_ID", e.value);
        }
      };
    },
    inResponseToIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: `${dataApi.paperWork.Documents}${DocumentTypeGuid.IncomingLetter}`
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
