<template>
  <div>
    <Header :headerTitle="this.$t('menu.addingEmployee')"></Header>
    <toolbar @saveChanges="handleSubmit" :canSave="true" />
    <DxForm
      ref="form"
      :col-count="2"
      :form-data.sync="employee"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxGroupItem :caption="$t('translations.fields.personalData')">
        <DxSimpleItem data-field="userName" data-type="string">
          <DxLabel location="top" :text="$t('translations.fields.userName')" />
          <DxRequiredRule :message="$t('translations.fields.userNameRequired')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="name">
          <DxLabel location="top" :text="$t('translations.fields.fullName')" />
          <DxRequiredRule :message="$t('translations.fields.fullNameRequired')" />
          <DxPatternRule
            :pattern="namePattern"
            :message="$t('translations.fields.fullNameNoDigits')"
          />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="jobTitleId"
          :editor-options="jobTitleOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.jobTitleId')" />
          <DxRequiredRule :message="$t('translations.fields.jobTitleIdRequired')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="email">
          <DxLabel location="top" />
          <DxRequiredRule :message="$t('translations.fields.emailRequired')" />
          <DxEmailRule :message="$t('translations.fields.emailRule')" />
          <DxAsyncRule
            :reevaluate="false"
            :validation-callback="validateEntityExists"
            :message="$t('translations.fields.emailAlreadyExists')"
          />
        </DxSimpleItem>
        <DxSimpleItem :editor-options="passwordOptions" data-field="password">
          <DxLabel location="top" :text="$t('translations.fields.password')" />
          <DxPatternRule
            :pattern="passwordPattern"
            :message="$t('translations.fields.passwordRule')"
          />
          <DxRequiredRule :message="$t('translations.fields.passwordRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          :editor-options="passwordOptions"
          editor-type="dxTextBox"
          data-field="confirmPassword"
        >
          <DxLabel location="top" :text="$t('translations.fields.confirmPassword')" />
          <DxRequiredRule :message="$t('translations.fields.confirmPasswordRequired')" />
          <DxCompareRule
            :comparison-target="passwordComparison"
            :message="$t('translations.fields.confirmPasswordRule')"
          />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :caption="$t('translations.fields.APN')">
        <DxSimpleItem
          data-field="departmentId"
          :editor-options="departmentOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.departmentId')" />
          <DxRequiredRule :message="$t('translations.fields.departmentIdRequired')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="phone">
          <DxLabel location="top" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-span="2">
        <DxSimpleItem data-field="note" :editor-options="{height: 90}" editor-type="dxTextArea">
          <DxLabel location="top" :text="$t('translations.fields.note')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxForm>
  </div>
</template>
<script>
import Toolbar from "~/components/shared/base-toolbar.vue";
import Status from "~/infrastructure/constants/status";
import "devextreme-vue/text-area";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
  DxEmailRule,
  DxAsyncRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxEmailRule,
    DxForm,
    DxAsyncRule,
    Toolbar
  },
  data() {
    return {
      employee: {
        email: null,
        name: null,
        phone: null,
        jobTitleId: null,
        departmentId: null,
        note: null,
        userName: null,
        password: null,
        confirmPassword: null
      },
      passwordOptions: {
        mode: "password"
      },
      jobTitleOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.JobTitle,
        filter: ["status", "=", Status.Active]
      }),
      departmentOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Department,
        filter: ["status", "=", Status.Active]
      }),
      namePattern: /^[^0-9]+$/,
      passwordPattern: "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$"
    };
  },
  methods: {
    passwordComparison() {
      return this.employee.password;
    },
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.EmployeeDataFieldValueNotExists(
        {
          [dataField]: params.value
        },
        dataField
      );
    },
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.company.Employee, this.employee),
        e => {
          this.$router.go(-1);
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  }
};
</script>

