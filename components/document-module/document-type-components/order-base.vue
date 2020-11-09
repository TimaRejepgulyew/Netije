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
      </DxGroupItem>

      <DxGroupItem>
        <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
          <DxLabel location="left" :text="$t('document.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem template="prepared" data-field="preparedById">
          <DxRequiredRule
            :message="$t('document.validation.preparedRequired')"
          />
          <DxLabel location="left" :text="$t('document.fields.preparedById')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="assigneeId" template="assignee">
          <DxLabel location="left" :text="$t('document.fields.assigneeId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <template #assignee>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate"
        :value="assigneeId"
        @valueChanged="setAssigneeId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate"
        :storeApi="signatoryApi"
        :value="ourSignatoryId"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #prepared>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate"
        :validatorGroup="documentValidatorName"
        :value="preparedById"
        @valueChanged="setPreparedById"
      />
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
                          setAssigneeId(null)
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
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    businessUnitId() {
      return this.document.businessUnitId;
    },
    preparedById() {
      return this.document.preparedById;
    },
    ourSignatoryId() {
      return this.document.ourSignatoryId;
    },
    assigneeId() {
      return this.document.assigneeId;
    },
    businessUnitId() {
      return this.document.businessUnitId;
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    departmentId() {
      return this.document.departmentId;
    },
    ourSignatoryOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: document.ourSignatoryId,
        onValueChanged: (e) => {
          this.setOurSignatoryId(e.value)
        },
      };
    },
    assigneeOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: document.assigneeId,
        onValueChanged: (e) => {
          this.setAssigneeId(e.value)
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
        value: document.preparedById,
        onValueChanged: (e) => {
          this.setPreparedById(e.value)
        },
      };
    },
  },
  methods: {
    setBusinessUnitId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,data);
    },
    setOurSignatoryId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_OUR_SIGNATORY_ID`, data);
    },
    setPreparedById(data) {
      this.$store.commit(`documents/${this.documentId}/SET_PREPARED_BY_ID`, data);
    },
    setDepartmentId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT_ID`, data);
    },
    setAssigneeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ASSIGNEE_ID`, data);
    },
  },
};
</script>
