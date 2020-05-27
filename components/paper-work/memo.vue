<template>
  <DxForm
    :col-count="1"
    :store.sync="store"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :col-count="2">
      <DxGroupItem>
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
      </DxGroupItem>

      <DxGroupItem>
        <DxSimpleItem
          data-field="ourSignatoryId"
          :editor-options="ourSignatoryOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.signatory')" />
          <DxRequiredRule :message="$t('translations.fields.signatoryRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="assigneeId"
          :editor-options="assigneeOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="preparedById"
          :editor-options="preparedByOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.prepared')" />
          <DxRequiredRule :message="$t('translations.fields.preparedRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="addresseeId"
          :editor-options="addresseeOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.addresseeId')" />
          <DxRequiredRule :message="$t('translations.fields.addresseeIdRequired')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
  </DxForm>
</template>
<script>
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
    DxRequiredRule
  },

  computed: {
    store() {
      return this.$store.getters["currentDocument/document"];
    },

    businessUnitId() {
      return this.$store.getters["currentDocument/document"].businessUnitId;
    },
    departmentId() {
      return this.$store.getters["currentDocument/document"].departmentId;
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
          this.$store.commit("currentDocument/SET_OUR_SIGNATORY_ID", null);
          this.$store.commit("currentDocument/SET_PREPARED_BY_ID", null);
          this.$store.commit("currentDocument/SET_DEPARTMENT_ID", null);
          this.$store.commit("currentDocument/SET_ADDRESSE_ID", null);
          this.$store.commit("currentDocument/SET_ASSIGNEE_ID", null);
        }
      };
    },
    deparmentOptions() {
      return {
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
          this.$store.commit("currentDocument/SET_DEPARTMENT_ID", e.value);
          this.$store.commit("currentDocument/SET_ADDRESSE_ID", e.value);
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
    assigneeOptions() {
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
        value: this.$store.getters["currentDocument/document"].assigneeId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_ASSIGNEE_ID", e.value);
        }
      };
    },
    preparedByOptions() {
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
        value: this.$store.getters["currentDocument/document"].preparedById,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_PREPARED_BY_ID", e.value);
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
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_ADDRESSE_ID", e.value);
        }
      };
    }
  }
};
</script>
