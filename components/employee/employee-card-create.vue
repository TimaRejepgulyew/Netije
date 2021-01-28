<template>
  <div>
    <Header
      :headerTitle="this.$t('menu.addingEmployee')"
      :isbackButton="!isCard"
      :isNew="true"
    ></Header>
    <toolbar @saveChanges="handleSubmit" :canSave="true" />
    <DxForm
      ref="form"
      :col-count="2"
      :form-data.sync="employee"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="createEmployee"
    >
      <DxGroupItem :caption="$t('translations.fields.personalData')">
        <DxGroupItem :col-count="5">
          <DxSimpleItem template="imageUploader" :col-span="1">
            <DxLabel location="top" text="Фото" />
          </DxSimpleItem>
          <DxGroupItem :col-span="4">
            <DxSimpleItem data-field="userName" data-type="string">
              <DxLabel
                location="top"
                :text="$t('translations.fields.userName')"
              />
              <DxRequiredRule
                :message="$t('translations.fields.userNameRequired')"
              />
            </DxSimpleItem>
            <DxSimpleItem data-field="firstName">
              <DxLabel
                location="top"
                :text="$t('translations.fields.firstName')"
              />
              <DxRequiredRule
                :message="$t('translations.fields.fullNameRequired')"
              />
            </DxSimpleItem>
            <DxSimpleItem data-field="lastName">
              <DxLabel
                location="top"
                :text="$t('translations.fields.lastName')"
              />
              <DxRequiredRule
                :message="$t('translations.fields.fullNameRequired')"
              />
            </DxSimpleItem>
            <DxSimpleItem data-field="middleName">
              <DxLabel
                location="top"
                :text="$t('translations.fields.middleName')"
              />
            </DxSimpleItem>
            <DxSimpleItem data-field="email">
              <DxLabel location="top" />
              <DxEmailRule :message="$t('translations.fields.emailRule')" />
              <DxAsyncRule
                :ignore-empty-value="true"
                :reevaluate="false"
                :validation-callback="validateEntityExists"
                :message="$t('translations.fields.emailAlreadyExists')"
              />
            </DxSimpleItem>
          </DxGroupItem>
        </DxGroupItem>
        <DxSimpleItem :editor-options="passwordOptions" data-field="password">
          <DxLabel location="top" :text="$t('translations.fields.password')" />
          <DxRequiredRule
            :message="$t('translations.fields.passwordRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem
          :editor-options="passwordOptions"
          editor-type="dxTextBox"
          data-field="confirmPassword"
        >
          <DxLabel
            location="top"
            :text="$t('translations.fields.confirmPassword')"
          />
          <DxRequiredRule
            :message="$t('translations.fields.confirmPasswordRequired')"
          />
          <DxCompareRule
            :comparison-target="passwordComparison"
            :message="$t('translations.fields.confirmPasswordRule')"
          />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :caption="$t('translations.fields.APN')">
        <DxSimpleItem
          data-field="jobTitleId"
          :editor-options="jobTitleOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel
            location="top"
            :text="$t('translations.fields.jobTitleId')"
          />
          <DxRequiredRule
            :message="$t('translations.fields.jobTitleIdRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="businessUnit"
          template="businessUnitSelectBox"
        >
          <DxLabel
            location="top"
            :text="$t('document.fields.businessUnitId')"
          />
          <DxRequiredRule
            :message="$t('document.validation.businessUnitIdRequired')"
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="department" template="departmentSelectBox">
          <DxLabel
            location="top"
            :text="$t('translations.fields.departmentId')"
          />
          <DxRequiredRule
            :message="$t('translations.fields.departmentIdRequired')"
          />
        </DxSimpleItem>

        <DxSimpleItem data-field="phone">
          <DxLabel location="top" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-span="2">
        <DxSimpleItem
          data-field="note"
          :editor-options="{ height: 90 }"
          editor-type="dxTextArea"
        >
          <DxLabel location="top" :text="$t('translations.fields.note')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #businessUnitSelectBox>
        <business-unit-select-box
          :value="businessUnit"
          :read-only="readOnly"
          validatorGroup="createEmployee"
          @valueChanged="
            (data) => {
              setBusinessUnit(data);
              setDepartment(null);
            }
          "
        />
      </template>
      <template #departmentSelectBox>
        <department-select-box
          :read-only="readOnly"
          :value="department"
          validatorGroup="createEmployee"
          :businessUnitId="businessUnitId"
          @valueChanged="
            (data) => {
              setDepartment(data);
            }
          "
        />
      </template>
      <template #imageUploader>
        <image-uploader
          @valueChanged="
            (data) => {
              setPhoto(data);
            }
          "
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import ImageUploader from "~/components/employee/custom-image-uploader";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
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
  DxAsyncRule,
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
    Toolbar,
    BusinessUnitSelectBox,
    DepartmentSelectBox,
    ImageUploader,
  },
  props: ["isCard"],
  data() {
    return {
      employee: {
        email: null,
        firstName: null,
        lastName: null,
        middleName: null,
        phone: null,
        jobTitleId: null,
        businessUnit: null,
        department: null,
        note: null,
        userName: null,
        password: null,
        confirmPassword: null,
        personalPhoto: null,
      },
      passwordOptions: {
        mode: "password",
      },
      jobTitleOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.JobTitle,
        filter: ["status", "=", Status.Active],
      }),
    };
  },
  computed: {
    businessUnitId() {
      return this.employee.businessUnit?.id;
    },
    businessUnit() {
      return this.employee.businessUnit;
    },
    department() {
      return this.employee.department;
    },
    departmentOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [
            ["status", "=", 0],
            ["businessUnitId", "=", this.employee.businessUnitId],
          ],
        }),
        value: this.employee.departmentId,
      };
    },
  },
  methods: {
    setDepartment(data) {
      this.employee.department = data;
    },
    setPhoto(data) {
      this.employee.personalPhoto = data;
    },
    setBusinessUnit(data) {
      this.employee.businessUnit = data;
    },
    passwordComparison() {
      return this.employee.password;
    },
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.EmployeeDataFieldValueNotExists(
        {
          [dataField]: params.value,
        },
        dataField
      );
    },
    generateFormData(data) {
      function appenFormData(key, value) {
        if (value !== null) {
          file.append(key, value);
        }
      }
      const file = new FormData();
      appenFormData("userName", data.userName);
      appenFormData("email", data.email);
      appenFormData("firstName", data.firstName);
      appenFormData("lastName", data.lastName);
      appenFormData("middleName", data.middleName);
      appenFormData("phone", data.phone);
      appenFormData("jobTitleId", data.jobTitleId);
      appenFormData("departmentId", data.department.id);
      appenFormData("password", data.password);
      appenFormData("confirmPassword", data.confirmPassword);
      appenFormData("note", data.note);
      appenFormData(
        "personalPhoto",
        typeof data.personalPhoto === "string" ? null : data.personalPhoto
      );
      return file;
    },
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      let file = this.generateFormData(this.employee);
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.company.Employee, file),
        (e) => {
          if (!this.isCard) {
            this.$router.go(-1);
          } else {
            this.$parent.$parent.openCard();
          }
          this.$awn.success();
        },
        (e) => this.$awn.alert()
      );
    },
  },
};
</script>
