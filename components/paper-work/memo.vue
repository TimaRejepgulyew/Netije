<template>
  <DxForm
    :col-count="1"
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
        <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
          <DxLabel location="top" :text="$t('translations.fields.signatory')" />
        </DxSimpleItem>
        <DxSimpleItem template="prepared" data-field="preparedById">
          <DxRequiredRule :message="$t('translations.fields.preparedRequired')" />
          <DxLabel location="top" :text="$t('translations.fields.prepared')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="assigneeId" template="assignee">
          <DxLabel location="top" :text="$t('translations.fields.assigneeId')" />
        </DxSimpleItem>
        <DxSimpleItem template="addressee" data-field="addresseeId">
          <DxRequiredRule :message="$t('translations.fields.addresseeIdRequired')" />
          <DxLabel location="top" :text="$t('translations.fields.addresseeId')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <template #assignee>
      <employee-select-box
        :value="assigneeId"
        validatorGroup="OfficialDocument"
        @valueChanged="setAssigneeId"
      />
    </template>
    <template #ourSignatory>
      <employee-select-box :value="ourSignatoryId" @valueChanged="setOurSignatoryId" />
    </template>
    <template #prepared>
      <employee-select-box :value="preparedById" @valueChanged="setPreparedById" />
    </template>
    <template #addressee>
      <employee-select-box
        :value="addresseeId"
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
  DxRequiredRule
} from "devextreme-vue/form";
export default {
  components: {
    employeeSelectBox,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule
  },
  methods: {
    setPreparedById(data) {
      this.$store.commit("currentDocument/SET_PREPARED_BY_ID", data);
    },
    setOurSignatoryId(data) {
      this.$store.commit("currentDocument/SET_OUR_SIGNATORY_ID", data);
    },
    setAddresseeId(data) {
      this.$store.commit("currentDocument/SET_ADDRESSE_ID", data);
    },
    setAssigneeId(data) {
      this.$store.commit("currentDocument/SET_ASSIGNEE_ID", data);
    }
  },
  computed: {
    preparedById() {
      return this.$store.getters["currentDocument/document"].preparedById;
    },
    ourSignatoryId() {
      return this.$store.getters["currentDocument/document"].ourSignatoryId;
    },
    assigneeId() {
      return this.$store.getters["currentDocument/document"].assigneeId;
    },
    addresseeId() {
      return this.$store.getters["currentDocument/document"].addresseeId;
    },
    isRegistered() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    businessUnitId() {
      return this.$store.getters["currentDocument/document"].businessUnitId;
    },
    departmentId() {
      return this.$store.getters["currentDocument/document"].departmentId;
    },
    businessUnitOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.BusinessUnit,
          filter: ["status", "=", 0]
        }),
        value: this.businessUnitId,
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
        value: this.$store.getters["currentDocument/document"].addresseeId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_ADDRESSE_ID", e.value);
        }
      };
    }
  }
};
</script>
