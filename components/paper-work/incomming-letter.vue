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
        <DxSimpleItem data-field="inNumber" :editor-options="inNumberOptions">
          <DxLabel location="top" :text="$t('translations.fields.regNumberDocument')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="dated" :editor-options="datedOptions" editor-type="dxDateBox">
          <DxLabel location="top" :text="$t('translations.fields.dated')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="correspondentId"
          :editor-options="correspondentOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.counterPart')" />
          <DxRequiredRule :message="$t('translations.fields.counterPartRequired')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="deliveryMethodId"
          :editor-options="deliveryMethodOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.mailDeliveryMethod')" />
        </DxSimpleItem>

        <DxGroupItem :visible="isCompany">
          <DxSimpleItem
            data-field="contactId"
            :editor-options="contactOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.contactId')" />
          </DxSimpleItem>

          <DxSimpleItem
            data-field="counterpartySignatoryId"
            :editor-options="counterpartySignatoryOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.signatory')" />
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

        <DxSimpleItem
          data-field="addresseeId"
          :editor-options="addresseeOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.whom')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="inResponseToId"
          :editor-options="inResponseToIdOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.inResponseToId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
  </DxForm>
</template>
<script>
import DocumentType from "~/infrastructure/constants/documentType";
import MainForm from "~/components/paper-work/main-doc-form/main";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
export default {
  components: {
    MainForm,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule
  },

  data() {
    return {
      isCompany: false,

      correspondentOptions: {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.contragents.CounterPart
        }),

        onSelectionChanged: e => {
          if (e.selectedItem) {
            this.isCompany = e.selectedItem.type != "Person";
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
      },
      deliveryMethodOptions: {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.MailDeliveryMethod
        }),

        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_DELIVERY_METHOD_ID", e.value);
        }
      }
    };
  },
  computed: {
    store() {
      return this.$store.getters["currentDocument/document"];
    },
    correspondentId() {
      return this.$store.getters["currentDocument/document"].correspondent.id;
    },
    departmentId() {
      return this.$store.getters["currentDocument/document"].departmentId;
    },
    contactOptions() {
      return {
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
    counterpartySignatoryOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.contragents.Contact,
          filter: [
            ["companyId", "=", this.correspondentId],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"]
          .counterpartySignatoryId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_CONTACT_ID", e.value);
        }
      };
    },
    businessUnitOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0]
        }),

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
    addresseeOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [
            ["departmentId", "=", this.departmentId],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"].addresseeId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_ADDRESSE_ID", e.value);
        }
      };
    },
    inResponseToIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.paperWork.OutgoingLetter
        }),

        onValueChanged: e => {
          this.$store.commit("currentDocument/IN_RESPONSE_TO_ID", e.value);
        }
      };
    },
    inNumberOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        onValueChanged: e => {
          this.$store.commit("currentDocument/IN_NUMBER", e.value);
        }
      };
    },
    datedOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        onValueChanged: e => {
          this.$store.commit("currentDocument/DATED", e.value);
        }
      };
    }
  }
};
</script>
