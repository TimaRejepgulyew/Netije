<template>
  <DxForm
    :col-count="1"
    :read-only="!canUpdate"
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
          :editor-options="deparmentOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="left" :text="$t('document.fields.departmentId')" />
          <DxRequiredRule :message="$t('document.validation.departmentIdRequired')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem>
        <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
          <DxLabel location="left" :text="$t('document.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem template="prepared" data-field="preparedById">
          <DxRequiredRule :message="$t('document.validation.preparedRequired')" />
          <DxLabel location="left" :text="$t('document.fields.preparedById')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="assigneeId" template="assignee">
          <DxLabel location="left" :text="$t('document.fields.assigneeId')" />
        </DxSimpleItem>
        <DxSimpleItem template="addressee" data-field="addresseeId">
          <DxRequiredRule :message="$t('document.validation.addresseeIdRequired')" />
          <DxLabel location="left" :text="$t('document.fields.addresseeId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <template #assignee>
      <employee-select-box
        value-expr="id"
        :read-only="!canUpdate"
        :value="assigneeId"
        @valueChanged="setAssigneeId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        value-expr="id"
        :read-only="!canUpdate"
        :value="ourSignatoryId"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #prepared>
      <employee-select-box
        value-expr="id"
        :validatorGroup="documentValidatorName"
        :read-only="!canUpdate"
        :value="preparedById"
        @valueChanged="setPreparedById"
      />
    </template>
    <template #addressee>
      <employee-select-box
        :value="addresseeId"
        value-expr="id"
        :read-only="!canUpdate"
        :validatorGroup="documentValidatorName"
        @valueChanged="setAddresseeId"
      />
    </template>
    <template #businessUnitSelectBox>
      <business-unit-select-box
        valueExpr="id"
        :read-only="isRegistered || !canUpdate"
        :validatorGroup="documentValidatorName"
        :value="businessUnitId"
        @valueChanged=" (data) => {
                          setBusinessUnitId(data)
                          setOurSignatoryId(null)
                          setPreparedById(null)
                          setDepartamentId(null)
                          setAddresseeId(null)
                          setAssigneeId(null)
                    } "
      />
    </template>
  </DxForm>
</template>
<script>
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
    BusinessUnitSelectBox
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
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
    addresseeId() {
      return this.document.addresseeId;
    },
    businessUnitId() {
      return this.document.businessUnitId;
    },
    departmentId() {
      return this.document.departmentId;
    },
    deparmentOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.departmentId,
        onValueChanged: (e) => {
          this.setDepartamentId(e.value)
          this.setAddresseeId(null)
        },
      };
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
    assigneeOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.assigneeId,
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
          filter: [["businessUnitId", "=", this.businessUnitId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.preparedById,
        onValueChanged: (e) => {
          this.setPreparedById(e.value)
        },
      };
    },
    addresseeOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [["departmentId", "=", this.departmentId],"and",["status", "=", Status.Active]],
        }),
        value: this.document.addresseeId,
        onValueChanged: (e) => {
          this.setAddresseeId(e.value)
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
    setAddresseeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE_ID`, data);
    },
    setAssigneeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ASSIGNEE_ID`, data);
    },
    setDepartamentId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT_ID`, data);
    },
    setBusinessUnitId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,data);
    },
  },
};
</script>
