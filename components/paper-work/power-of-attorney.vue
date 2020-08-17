<template>
  <DxForm
    :read-only="!canUpdate"
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
        <DxSimpleItem
          data-field="validTill"
          :editor-options="validTillOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="left" :text="$t('translations.fields.validTill')" />
          <DxRequiredRule :message="$t('translations.fields.validTillRequired')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="issuedToId" template="issuedToId">
          <DxLabel location="left" :text="$t('translations.fields.issuedToId')" />
          <DxRequiredRule :message="$t('translations.fields.issuedToIdRequired')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem>
        <DxSimpleItem data-field="ourSignatoryId" template="ourSignatory">
          <DxLabel location="left" :text="$t('translations.fields.signatory')" />
          <DxRequiredRule :message="$t('translations.fields.ourSignatoryRequired')" />
        </DxSimpleItem>
        <DxSimpleItem template="prepared" data-field="preparedById">
          <DxLabel location="left" :text="$t('translations.fields.prepared')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
    <template #ourSignatory>
      <employee-select-box
        valueExpr="id"
        validatorGroup="OfficialDocument"
        :storeApi="signatoryApi"
        :value="ourSignatoryId"
        @valueChanged="setOurSignatoryId"
      />
    </template>
    <template #issuedToId>
      <employee-select-box
        valueExpr="id"
        :read-only="!canUpdate || isRegistered"
        validatorGroup="OfficialDocument"
        :value="issuedToId"
        @valueChanged="setIssuedToId"
      />
    </template>
    <template #prepared>
      <employee-select-box valueExpr="id" :value="preparedById" @valueChanged="setPreparedById" />
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
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    employeeSelectBox,
  },
  props: ["documentId"],
  data() {
    return {
      signatoryApi: dataApi.signatureSettings.Members,
    };
  },
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
    setIssuedToId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_ISSUED_TO_ID`, data);
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
            `documents/${this.documentId}/SET_ISSUED_TO_ID`,
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
            `documents/${this.documentId}/SET_OUR_SIGNATORY_ID`,
            null
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_PREPARED_BY_ID`,
            null
          );
          this.$store.commit(
            `documents/${this.documentId}/SET_DEPARTMENT_ID`,
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
    preparedByOptions() {
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
        value: this.document.preparedById,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_PREPARED_BY_ID`,
            e.value
          );
        },
      };
    },
    issuedToIdOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Employee,
          filter: [
            ["businessUnitId", "=", this.businessUnitId],
            "and",
            ["status", "=", 0],
          ],
        }),
        value: this.document.issuedToId,
        onValueChanged: (e) => {
          this.$store.dispatch(
            `documents/${this.documentId}/setIssuedToId`,
            e.value
          );
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
          this.$store.commit(
            `documents/${this.documentId}/SET_VALID_TILL`,
            e.value
          );
        },
      };
    },
  },
};
</script>