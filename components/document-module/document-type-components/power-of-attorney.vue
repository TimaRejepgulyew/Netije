<template>
  <DxForm
    :read-only="readOnly"
    :col-count="1"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem :col-count="2">
      <DxGroupItem>
        <DxSimpleItem
          data-field="businessUnit"
          template="businessUnitSelectBox"
        >
          <DxLabel
            location="left"
            :text="$t('document.fields.businessUnitId')"
          />
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
        <DxSimpleItem
          data-field="validTill"
          :editor-options="validTillOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="left" :text="$t('document.fields.validTill')" />
          <DxRequiredRule
            :message="$t('document.validation.validTillRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="issuedToId" template="issuedToId">
          <DxLabel location="left" :text="$t('document.fields.issuedToId')" />
          <DxRequiredRule
            :message="$t('document.validation.issuedToIdRequired')"
          />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem>
        <DxSimpleItem data-field="ourSignatory" template="ourSignatory">
          <DxLabel location="left" :text="$t('document.fields.signatory')" />
          <DxRequiredRule
            :message="$t('document.validation.ourSignatoryRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem template="prepared" data-field="preparedBy">
          <DxLabel location="left" :text="$t('document.fields.preparedById')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <template #ourSignatory>
      <employee-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :isRequired="true"
        :storeApi="signatoryApi"
        :value="ourSignatory"
        @valueChanged="setOurSignatory"
      />
    </template>
    <template #issuedToId>
      <employee-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :isRequired="true"
        :value="issuedTo"
        @valueChanged="setIssuedTo"
      />
    </template>
    <template #prepared>
      <employee-select-box
        :read-only="readOnly"
        :value="preparedBy"
        @valueChanged="setPreparedBy"
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
            setDepartment(null);
            setIssuedTo(null);
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
            setOurSignatory(null);
            setPreparedBy(null);
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
    employeeSelectBox,
    BusinessUnitSelectBox,
    DepartmentSelectBox,
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  data() {
    return {
      signatoryApi: dataApi.signatureSettings.Members,
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    businessUnitId() {
      return this.document.businessUnit?.id;
    },
    businessUnit() {
      return this.document.businessUnit;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    issuedTo() {
      return this.document.issuedTo;
    },
    preparedBy() {
      return this.document.preparedBy;
    },
    ourSignatory() {
      return this.document.ourSignatory;
    },
    department() {
      return this.document.department;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    preparedByOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [
            this.department ? ["departmentId", "=", this.department?.id] : [],
            "and",
            ["status", "=", Status.Active],
          ],
        }),
        readOnly: this.readOnly,
        value: this.document.preparedBy,
        onValueChanged: (e) => {
          this.setPreparedBy(e.value);
        },
      };
    },
    issuedToIdOptions() {
      return {
        readOnly: this.readOnly,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [
            ["businessUnitId", "=", this.businessUnitId],
            "and",
            ["status", "=", Status.Active],
          ],
        }),
        value: this.document.issuedTo,
        onValueChanged: (e) => {
          this.dispatchIssuedTo(e.value);
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
        value: this.document.validTill,
        onValueChanged: (e) => {
          this.setValidTill(e.value);
        },
      };
    },
  },
  methods: {
    setPreparedBy(data) {
      this.$store.commit(`documents/${this.documentId}/SET_PREPARED_BY`, data);
    },
    setOurSignatory(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_OUR_SIGNATORY`,
        data
      );
    },
    dispatchIssuedTo(data) {
      this.$store.dispatch(`documents/${this.documentId}/setIssuedTo`, data);
    },
    setIssuedTo(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ISSUED_TO`, data);
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
    setValidTill(data) {
      this.$store.commit(`documents/${this.documentId}/SET_VALID_TILL`, data);
    },
  },
};
</script>
