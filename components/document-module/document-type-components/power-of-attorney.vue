<template>
  <DxForm
    :read-only="!canUpdate"
    :col-count="1"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem :col-count="2">
      <DxGroupItem>
        <DxSimpleItem
          data-field="businessUnitId"
          template="businessUnitSelectBox"
        >
          <DxLabel location="left" :text="$t('document.fields.businessUnitId')" />
          <DxRequiredRule
            :message="$t('document.validation.businessUnitIdRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem
        data-field="departmentId"
        template="departmentSelectBox"
        >
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
          <DxRequiredRule :message="$t('document.validation.validTillRequired')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="issuedToId" template="issuedToId">
          <DxLabel location="left" :text="$t('document.fields.issuedToId')" />
          <DxRequiredRule :message="$t('document.validation.issuedToIdRequired')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem>
        <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
          <DxLabel location="left" :text="$t('document.fields.signatory')" />
          <DxRequiredRule :message="$t('document.validation.ourSignatoryRequired')" />
        </DxSimpleItem>
        <DxSimpleItem template="prepared" data-field="preparedById">
          <DxLabel location="left" :text="$t('document.fields.preparedById')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <template #ourSignatory>
      <employee-select-box
        valueExpr="id"
        :validatorGroup="documentValidatorName"
        :storeApi="signatoryApi"
        :value="ourSignatoryId"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #issuedToId>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate || isRegistered"
        :validatorGroup="documentValidatorName"
        :value="issuedToId"
        @valueChanged="setIssuedToId"
      />
    </template>
    <template #prepared>
      <employee-select-box valueExpr="id" :value="preparedById" @valueChanged="setPreparedById" />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        valueExpr="id"
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :value="businessUnitId"
        @valueChanged=" (data) => {
                          setBusinessUnitId(data)
                          setOurSignatoryId(null)
                          setPreparedById(null)
                          setDepartmentId(null)
                          setIssuedToId(null)
                    } "
      />
    </template>
    <template #departmentSelectBox>
      <department-select-box
        valueExpr="id"
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :value="departmentId"
        :businessUnitId="businessUnitId"
        @valueChanged="(data) => {
                        setDepartmentId(data)
                        setOurSignatoryId(null)
                        setPreparedById(null)
                    } "
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
    DepartmentSelectBox
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
      return this.document.businessUnitId;
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    issuedToId() {
      return this.document.issuedToId;
    },
    preparedById() {
      return this.document.preparedById;
    },
    ourSignatoryId() {
      return this.document.ourSignatoryId;
    },
    businessUnitId() {
      return this.document.businessUnitId;
    },
    departmentId() {
      return this.document.departmentId;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    ourSignatoryOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.ourSignatoryId,
        onValueChanged: (e) => {
          this.setOurSignatoryId(e.value)
        },
      };
    },
    preparedByOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [["departmentId", "=", this.departmentId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.preparedById,
        onValueChanged: (e) => {
          this.setPreparedById(e.value)
        },
      };
    },
    issuedToIdOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.issuedToId,
        onValueChanged: (e) => {
          this.dispatchIssuedToId(e.value)
        },
      };
    },
    validTillOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.validTill,
        onValueChanged: (e) => {
          this.setValidTill(e.value)
        },
      };
    },
  },
  methods: {
    setPreparedById(data) {
      this.$store.commit(`documents/${this.documentId}/SET_PREPARED_BY_ID`, data);
    },
    setOurSignatoryId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_OUR_SIGNATORY_ID`, data);
    },
    dispatchIssuedToId(data) {
      this.$store.dispatch(`documents/${this.documentId}/setIssuedToId`, data);
    },
    setIssuedToId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ISSUED_TO_ID`, data);
    },
    setBusinessUnitId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,data);
    },
    setDepartmentId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT_ID`,data);
    },
    setValidTill(data) {
      this.$store.commit(`documents/${this.documentId}/SET_VALID_TILL`, data);
    },
  },
};
</script>