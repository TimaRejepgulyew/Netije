<template>
  <DxForm
    :col-count="1"
    :read-only="readOnly"
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
        <DxSimpleItem
          data-field="department"
          template="departmentSelectBox"
          editor-type="dxSelectBox"
        >
          <DxLabel location="left" :text="$t('document.fields.departmentId')" />
          <DxRequiredRule
            :message="$t('document.validation.departmentIdRequired')"
          />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem>
        <DxSimpleItem data-field="ourSignatory" template="ourSignatory">
          <DxLabel location="left" :text="$t('document.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem template="prepared" data-field="preparedBy">
          <DxRequiredRule
            :message="$t('document.validation.preparedRequired')"
          />
          <DxLabel location="left" :text="$t('document.fields.preparedById')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="assignee" template="assignee">
          <DxLabel location="left" :text="$t('document.fields.assigneeId')" />
        </DxSimpleItem>
        <DxSimpleItem template="addressee" data-field="addressee">
          <DxRequiredRule
            :message="$t('document.validation.addresseeIdRequired')"
          />
          <DxLabel location="left" :text="$t('document.fields.addresseeId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <template #assignee>
      <employee-select-box
        :read-only="readOnly"
        :value="assignee"
        @valueChanged="setAssignee"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        :read-only="readOnly"
        :value="ourSignatory"
        @valueChanged="setOurSignatory"
      />
    </template>
    <template #prepared>
      <employee-select-box
        :validatorGroup="documentValidatorName"
        :read-only="readOnly"
        :value="preparedBy"
        @valueChanged="setPreparedBy"
      />
    </template>
    <template #addressee>
      <employee-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        @valueChanged="setAddressee"
      />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        valueExpr="id"
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
        :value="businessUnit"
        @valueChanged="
          (data) => {
            setBusinessUnit(data);
            setDepartment(null);
            setAddressee(null);
          }
        "
      />
    </template>
    <template #departmentSelectBox>
      <department-select-box
        :read-only="readOnly"
        :validatorGroup="documentValidatorName"
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
    employeeSelectBox,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    BusinessUnitSelectBox,
    DepartmentSelectBox,
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    businessUnit() {
      return this.document.businessUnit;
    },
    businessUnitId() {
      return this.document.businessUnit?.id;
    },
    preparedBy() {
      return this.document.preparedBy;
    },
    ourSignatory() {
      return this.document.ourSignatory;
    },
    assignee() {
      return this.document.assignee;
    },
    addressee() {
      return this.document.addressee;
    },
    department() {
      return this.document.department;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
  },
  methods: {
    setPreparedBy(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_PREPARED_BY`,
        data
      );
    },
    setOurSignatory(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_OUR_SIGNATORY`,
        data
      );
    },
    setAddressee(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE`, data);
    },
    setAssignee(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ASSIGNEE`, data);
    },
    setDepartment(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_DEPARTMENT`,
        data
      );
    },
    setBusinessUnit(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_BUSINESS_UNIT`,
        data
      );
    },
  },
};
</script>
