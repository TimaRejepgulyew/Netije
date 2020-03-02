<template>
  <div id="form-demo">
    <div class="widget-container">
      <header class="grid__header">
        <h3 class="grid__title">{{$t('translations.menu.upgratingEmployee')}} {{this.employee.name}}</h3>
      </header>
      <DxPopup
        :visible.sync="popupPasswordVisible"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        :width="500"
        :height="250"
        :title="$t('translations.fields.passwordChange')"
      >
        <div>
          <popup-change-password @popupDisabled="popupDisabled('popupPasswordVisible')" />
        </div>
      </DxPopup>
      <DxPopup
        :visible.sync="popupRoleVisible"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        :width="500"
        :height="250"
        :title="$t('translations.fields.assingRole')"
      >
        <div>
          <popup-user-role @popupDisabled="popupDisabled('popupRoleVisible')" />
        </div>
      </DxPopup>
      <form action="your-action" @submit="handleSubmit">
        <DxForm
          :col-count="12"
          :form-data.sync="employee"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="upgreateEmployee"
        >
          <DxGroupItem :col-span="4" :caption="$t('translations.fields.personalData')">
            <DxSimpleItem
              data-field="userName"
              :editor-options="{disabled:'true'}"
              data-type="string"
            >
              <DxLabel :text="$t('translations.fields.userName')" />
            </DxSimpleItem>
            <DxSimpleItem data-field="email">
              <DxRequiredRule :message="$t('translations.fields.emailRequired')" />
              <DxEmailRule :message="$t('translations.fields.emailRule')" />
              <DxAsyncRule
                :validation-callback="validateEntityExists"
                :message="$t('translations.fields.haveRegistredEmail')"
              />
            </DxSimpleItem>
            <DxSimpleItem data-field="name">
              <DxLabel :text="$t('translations.fields.fullName')" />
              <DxRequiredRule :message="$t('translations.fields.fullNameRequired')" />
              <DxPatternRule
                :pattern="namePattern"
                :message="$t('translations.fields.fullNameNoDigits')"
              />
            </DxSimpleItem>
            <DxSimpleItem
              data-field="note"
              :col-span="1"
              :editor-options="{height: 90}"
              editor-type="dxTextArea"
            ></DxSimpleItem>
          </DxGroupItem>
          <DxGroupItem :col-span="5" :caption="$t('translations.fields.APN')">
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
          <DxGroupItem
            :col-span="3"
            :col-count="2"
            :caption="$t('translations.fields.moreSettings')"
          >
            <DxButtonItem :button-options="popupPasswordOpt" horizontal-alignment="right" />
            <DxButtonItem :button-options="popupRoleOpt" horizontal-alignment="right" />
          </DxGroupItem>
          <DxGroupItem :col-count="12" :col-span="12">
            <DxButtonItem
              :col-span="11"
              :button-options=" saveButtonOptions"
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
import popupChangePassword from "~/components/employee/popup-changePassword";
import popupUserRole from "~/components/employee/popup-change-userRole";

import "devextreme-vue/text-area";
import { DxPopup } from "devextreme-vue/popup";
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
    DxStringLengthRule,
    DxForm,
    DxAsyncRule,
    DxPopup,
    popupUserRole,
    popupChangePassword
  },
  async created() {
    const response = await this.$axios.get(
      dataApi.company.Employee + "/" + this.$route.params.id
    );
    this.employee = response.data;
  },
  data() {
    return {
      employee: {
        id: parseInt(this.$route.params.id),
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

      cancelButtonOptions: {
        onClick: this.backToEmployee,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      saveButtonOptions: {
        height: 50,
        text: this.$t("translations.links.save"),
        useSubmitBehavior: true,
        type: "success"
      },
      popupPasswordOpt: {
        onClick: () => {
          this.popupPasswordVisible = true;
        },
        height: 50,
        icon: "key",
        text: "Сменить пароль"
      },
      popupRoleOpt: {
        onClick: () => {
          this.popupRoleVisible = true;
        },
        height: 50,
        text: "Назначить роль",
        icon: "user"
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
      popupPasswordVisible: false,
      popupRoleVisible: false,
      namePattern: /^[^0-9]+$/,
      userNamePattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
    };
  },
  methods: {
    popupDisabled(popup) {
      this[popup] = false;
    },
    passwordComparison() {
      return this.employee.password;
    },
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.EmployeeDataFieldValueNotExists(
        {
          id: this.employee.id,
          [dataField]: params.value
        },
        dataField
      );
    },
    backToEmployee() {
      this.$router.push("/company/staff/employees");
    },
    handleSubmit(e) {
      delete this.employee.userName;
      this.$axios
        .put(dataApi.company.Employee + "/" + this.employee.id, this.employee)
        .then(res => {
          this.backToEmployee();
          notify(
            {
              message: this.$t("translations.menu.upgrateEmployeeSucces"),
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
<style  lang="scss" scoped>
form {
  margin: 10px;
}
.grid__header {
  background: #f0f3f5;
}
.grid__title {
  font-size: 30px;
  font-weight: normal;
  padding: 30px 20px;
}
</style>

