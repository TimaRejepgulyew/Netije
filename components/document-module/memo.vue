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
          :editor-options="businessUnitOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="left" :text="$t('translations.fields.businessUnitId')" />
          <DxRequiredRule :message="$t('translations.fields.businessUnitIdRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="departmentId"
          :editor-options="deparmentOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="left" :text="$t('translations.fields.departmentId')" />
          <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem>
        <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
          <DxLabel location="left" :text="$t('translations.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem template="prepared" data-field="preparedById">
          <DxRequiredRule :message="$t('translations.fields.preparedRequired')" />
          <DxLabel location="left" :text="$t('translations.fields.prepared')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="assigneeId" template="assignee">
          <DxLabel location="left" :text="$t('translations.fields.assigneeId')" />
        </DxSimpleItem>
        <DxSimpleItem template="addressee" data-field="addresseeId">
          <DxRequiredRule :message="$t('translations.fields.addresseeIdRequired')" />
          <DxLabel location="left" :text="$t('translations.fields.addresseeId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <template #assignee>
      <employee-select-box
        :read-only="!canUpdate"
        :value="assigneeId"
        @valueChanged="setAssigneeId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box
        :read-only="!canUpdate"
        :value="ourSignatoryId"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #prepared>
      <employee-select-box
        validatorGroup="OfficialDocument"
        :read-only="!canUpdate"
        :value="preparedById"
        @valueChanged="setPreparedById"
      />
    </template>
    <template #addressee>
      <employee-select-box
        :value="addresseeId"
        :read-only="!canUpdate"
        validatorGroup="OfficialDocument"
        @valueChanged="setAddresseeId"
      />
    </template>
  </DxForm>
</template>
<script>
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
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
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  methods: {
    setPreparedById(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_PREPARED_BY_ID`,
        data
      );
    },
    setOurSignatoryId(data) {
      this.$store.commit(
        `documents/${this.documentId}/SET_OUR_SIGNATORY_ID`,
        data
      );
    },
    setAddresseeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ADDRESSE_ID`, data);
    },
    setAssigneeId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ASSIGNEE_ID`, data);
    },
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
    businessUnitOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0],
        }),
        value: this.businessUnitId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,
            e.value
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_OUR_SIGNATORY_ID`,
            null
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_PREPARED_BY_ID`,
            null
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_DEPARTMENT_ID`,
            null
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_ADDRESSE_ID`,
            null
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_ASSIGNEE_ID`,
            null
          );
        },
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
            ["status", "=", 0],
          ],
        }),
        value: this.document.departmentId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_DEPARTMENT_ID`,
            e.value
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_ADDRESSE_ID`,
            e.value
          );
        },
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
            ["status", "=", 0],
          ],
        }),
        value: this.document.ourSignatoryId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_OUR_SIGNATORY_ID`,
            e.value
          );
        },
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
            ["status", "=", 0],
          ],
        }),
        value: this.document.assigneeId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_ASSIGNEE_ID`,
            e.value
          );
        },
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
            ["status", "=", 0],
          ],
        }),
        value: this.document.preparedById,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_PREPARED_BY_ID`,
            e.value
          );
        },
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
            ["status", "=", 0],
          ],
        }),
        value: this.document.addresseeId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_ADDRESSE_ID`,
            e.value
          );
        },
      };
    },
  },
};
</script>
