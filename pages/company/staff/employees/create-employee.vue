<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
      <form @submit="handleSubmit">
        <DxForm
          :col-count="2"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="customerData"
        >
          <DxGroupItem :caption="$t('translations.fields.personalData')">
            <DxSimpleItem data-field="userName" data-type="string">
              <DxLabel location="top" :text="$t('translations.fields.userName')" />
              <DxRequiredRule :message="$t('translations.fields.userNameRequired')" />
              <DxAsyncRule
                :validation-callback="validateEntityExists"
                :message="$t('translations.fields.userNameRule')"
              />
            </DxSimpleItem>
            <DxSimpleItem data-field="email">
              <DxLabel location="top"  />
              <DxRequiredRule :message="$t('translations.fields.emailRequired')" />
              <DxEmailRule :message="$t('translations.fields.emailRule')" />
              <DxAsyncRule
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

            <DxSimpleItem
              data-field="note"
              :col-span="1"
              :editor-options="{height: 90,labelLocation:'right',}"
              editor-type="dxTextArea"
            >
              <DxLabel location="top" :text="$t('translations.fields.note')" />
            </DxSimpleItem>
          </DxGroupItem>
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
import Header from "~/components/page/page__header";
export default {
  components: {
    Header,
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
      headerTitle: this.$t("translations.menu.addingEmployee"),
      store: {
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
        onClick: this.backTo,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      passwordOptions: {
        mode: "password"
      },
      jobTitleOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.JobTitle,
        filter: ["status", "=", 0]
      }),
      departmentOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Department,
        filter: ["status", "=", 0]
      }),
      namePattern: /^[^0-9]+$/,
      passwordPattern: "^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$"
    };
  },
  methods: {
    passwordComparison() {
      return this.store.password;
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
    backTo() {
      this.$router.go(-1);
    },
    notify(msgTxt, msgType) {
      notify(
        {
          message: msgTxt,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        msgType,
        3000
      );
    },
    handleSubmit(e) {
      this.$axios
        .post(dataApi.company.Employee, this.store)
        .then(res => {
          this.backTo();
          this.notify(
            this.$t("translations.menu.addEmployeeSucces"),
            "success"
          );
        })
        .catch(e => {
          this.notify(this.$t("translations.menu.addEmployeeError"), "error");
        });

      e.preventDefault();
    }
  }
};
</script>
<style>

</style>

