<template>
  <div id="form-demo">
    <div class="widget-container">
      <form action="your-action" @submit="handleSubmit">
        <DxForm
          :col-count="2"
          :form-data.sync="employee"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="customerData"
        >
          <DxGroupItem :caption="$t('translations.fields.personalData')">
            <DxSimpleItem data-field="userName" data-type="string">
              <DxLabel :text="$t('translations.fields.userName')" />
              <DxAsyncRule
                :validation-callback="validateEntityExists"
                :message="$t('translations.fields.userNameRule')"
              />
              <DxRequiredRule :message="$t('translations.fields.fullNameRequired')" />
            </DxSimpleItem>
            <DxSimpleItem data-field="email">
              <DxRequiredRule :message="$t('translations.fields.emailRequired')" />
              <DxEmailRule :message="$t('translations.fields.emailRule')" />
              <DxAsyncRule
                :validation-callback="validateEntityExists"
                :message="$t('translations.fields.haveRegistredEmail')"
              />
            </DxSimpleItem>
            <DxSimpleItem :editor-options="passwordOptions" data-field="password">
              <DxLabel :text="$t('translations.fields.password')" />
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
              <DxLabel :text="$t('translations.fields.confirmPassword')" />
              <DxRequiredRule :message="$t('translations.fields.confirmPasswordRequired')" />
              <DxCompareRule
                :comparison-target="passwordComparison"
                :message="$t('translations.fields.confirmPasswordRule')"
              />
            </DxSimpleItem>
          </DxGroupItem>
          <DxGroupItem :caption="$t('translations.fields.APN')">
            <DxSimpleItem data-field="name">
              <DxLabel :text="$t('translations.fields.fullName')" />
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
              <DxLabel :text="$t('translations.fields.jobTitleId')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="departmentId"
              :editor-options="departmentOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel :text="$t('translations.fields.departmentId')" />
            </DxSimpleItem>

            <DxSimpleItem data-field="phone">
              <DxLabel :text="$t('translations.fields.phones')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxSimpleItem
            data-field="note"
            :col-span="1"
            :editor-options="{height: 90}"
            editor-type="dxTextArea"
          ></DxSimpleItem>
          <DxGroupItem :col-count="12" :col-span="2">
            <DxButtonItem
              :col-span="11"
              :button-options="addButtonOptions"
              horizontal-alignment="right"
            />
            <DxButtonItem
              :col-span="1"
              :button-options="cancelButtonOptions"
              horizontal-alignment="right"
            />
          </DxGroupItem>
        </DxForm>
      </form>
    </div>
  </div>
</template>
<script>
import "devextreme-vue/text-area";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
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
import notify from "devextreme/ui/notify";

export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxEmailRule,
    DxForm,
    DxAsyncRule,
    notify
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
      addButtonOptions: {
        width: 100,
        height: 50,
        text: this.$t("translations.links.add"),
        useSubmitBehavior: true,
        type: "success"
      },
      cancelButtonOptions: {
        onClick: this.backToEmployee,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      passwordOptions: {
        mode: "password"
      },
      jobTitleOptions: {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.JobTitle
          }),
          filter: ["status", "=", 0]
        }),
        valueExpr: "id",
        displayExpr: "name"
      },
      departmentOptions: {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.company.Department
          }),
          filter: ["status", "=", 0]
        }),
        valueExpr: "id",
        displayExpr: "name"
      },
      passwordPattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$ /g
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
    backToEmployee() {
      this.$router.push("/company/staff/employees");
    },
    handleSubmit(e) {
      this.$axios
        .post(dataApi.company.Employee, this.employee)
        .then(res => {
          this.backToEmployee();
          notify(
            {
              message: this.$t("translations.menu.addEmployeeSucces"),
              position: {
                my: "center top",
                at: "center top"
              }
            },
            "success",
            3000
          );
        })
        .catch(e => {
          notify(
            {
              message: this.$t("translations.menu.addEmployeeError"),
              position: {
                my: "center top",
                at: "center top"
              }
            },
            "error",
            3000
          );
        });

      e.preventDefault();
    }
  }
};
</script>
<style>
form {
  margin: 10px;
}
</style>

