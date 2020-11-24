<template>
  <div>
    <Header
      :isbackButton="!isCard"
      :isNew="false"
      :headerTitle="employee.name"
    ></Header>
    <toolbar
      @saveChanges="handleSubmit"
      :canSave="$store.getters['permissions/allowUpdating'](entityType)"
    />
    <DxPopup
      :visible.sync="changePasswordPupupVisible"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      height="auto"
      :title="$t('translations.fields.passwordChange')"
    >
      <div>
        <change-password-popup
          @hidePopup="hidePopup('changePasswordPupupVisible')"
        />
      </div>
    </DxPopup>
    <DxForm
      ref="form"
      :col-count="12"
      :scrolling-enabled="true"
      :form-data.sync="employee"
      :read-only="readOnly"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="updateEmployee"
    >
      <DxGroupItem
        :col-span="5"
        :caption="$t('translations.fields.personalData')"
        :col-count="5"
      >
        <DxGroupItem :col-span="1">
          <DxSimpleItem template="imageUploader">
            <DxLabel location="top" text="Фото" />
          </DxSimpleItem>
        </DxGroupItem>
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
          <DxSimpleItem data-field="name">
            <DxLabel
              location="top"
              :text="$t('translations.fields.fullName')"
            />
            <DxRequiredRule
              :message="$t('translations.fields.fullNameRequired')"
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
      <DxGroupItem
        :col-span="4"
        :caption="$t('translations.fields.departmentId')"
      >
        <DxSimpleItem
          data-field="jobTitleId"
          :editor-options="jobTitleOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel
            location="top"
            :text="$t('translations.fields.jobTitleId')"
          />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="businessUnitId"
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
        <DxSimpleItem data-field="departmentId" template="departmentSelectBox">
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
      <DxGroupItem
        :col-span="3"
        :col-count="1"
        :caption="$t('translations.fields.moreSettings')"
      >
        <DxSimpleItem
          :col-span="3"
          data-field="status"
          :editor-options="statusOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.status')" />
        </DxSimpleItem>
        <DxButtonItem
          :col-span="3"
          :button-options="popupPasswordOpt"
          horizontal-alignment="left"
        />
      </DxGroupItem>
      <DxGroupItem :col-count="12" :col-span="12">
        <DxSimpleItem
          data-field="note"
          :col-span="12"
          :editor-options="{ height: 90 }"
          editor-type="dxTextArea"
        >
          <DxLabel location="top" :text="$t('translations.fields.note')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #businessUnitSelectBox>
        <business-unit-select-box
          valueExpr="id"
          :value="businessUnitId"
          :read-only="readOnly"
          validatorGroup="updateEmployee"
          @valueChanged="
            (data) => {
              setBusinessUnitId(data);
              setDepartmentId(null);
            }
          "
        />
      </template>
      <template #imageUploader>
        <image-uploader
          :read-only="readOnly"
          :path="data.personalPhoto"
          @valueChanged="
            (data) => {
              setPhoto(data);
            }
          "
        />
      </template>
      <template #departmentSelectBox>
        <department-select-box
          valueExpr="id"
          :read-only="readOnly"
          :value="departmentId"
          :businessUnitId="businessUnitId"
          @valueChanged="
            (data) => {
              setDepartmentId(data);
            }
          "
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
import ImageUploader from "~/components/employee/custom-image-uploader";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import Toolbar from "~/components/shared/base-toolbar.vue";
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import ChangePasswordPopup from "~/components/employee/change-password-popup";
import Header from "~/components/page/page__header";
import "devextreme-vue/text-area";
import { DxPopup } from "devextreme-vue/popup";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxPatternRule,
  DxEmailRule,
  DxAsyncRule,
  DxButtonItem,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";

export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxButtonItem,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxEmailRule,
    DxForm,
    DxAsyncRule,
    DxPopup,
    ChangePasswordPopup,
    Toolbar,
    BusinessUnitSelectBox,
    ImageUploader,
    DepartmentSelectBox,
  },
  props: ["data", "isCard"],
  data() {
    return {
      employee: this.data,
      entityType: EntityType.Employee,
      statusOptions: {
        dataSource: this.$store.getters["status/status"](this),
        valueExpr: "id",
        displayExpr: "status",
        showClearButton: true,
      },
      jobTitleOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.JobTitle,
        filter: ["status", "=", 0],
      }),
      passwordOptions: {
        mode: "password",
      },
      changePasswordPupupVisible: false,
      namePattern: /^[^0-9]+$/,
    };
  },
  computed: {
    businessUnitId() {
      return this.employee.businessUnitId;
    },
    departmentId() {
      return this.employee.departmentId;
    },
    readOnly() {
      return !this.$store.getters["permissions/allowUpdating"](this.entityType);
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
    popupPasswordOpt() {
      return {
        disabled: !this.$store.getters["permissions/allowUpdating"](
          this.entityType
        ),
        onClick: () => {
          this.changePasswordPupupVisible = true;
        },
        height: 40,
        icon: "key",
        text: this.$t("buttons.changePassword"),
      };
    },
  },
  methods: {
    setDepartmentId(data) {
      this.employee.departmentId = data;
    },
    setBusinessUnitId(data) {
      this.employee.businessUnitId = data;
    },
    setPhoto(data) {
      this.employee.personalPhoto = data;
    },
    goBack() {
      if (!this.isCard) this.$router.go(-1);
      else this.$emit("closePopup");
    },
    hidePopup(popup) {
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
          [dataField]: params.value,
        },
        dataField
      );
    },
    generateFormData(data) {
      const file = new FormData();
      function appenFormData(key, value) {
        if (value !== null) {
          file.append(key, value);
        }
      }
      appenFormData("id", data.id);
      appenFormData("userName", data.userName);
      appenFormData("email", data.email);
      appenFormData("name", data.name);
      appenFormData("phone", data.phone);
      appenFormData("jobTitleId", data.jobTitleId);
      appenFormData("departmentId", data.departmentId);
      appenFormData("status", data.status);
      appenFormData("note", data.note);
      appenFormData(
        "personalPhoto",
        typeof data.personalPhoto === "string" ? null : data.personalPhoto
      );
      return file;
    },
    handleSubmit() {
      // var res = this.$refs["form"].instance.validate();
      // const file = this.generateFormData(this.employee);
      // if (!res.isValid) return;
      // this.$awn.asyncBlock(
      //   this.$axios.put(
      //     dataApi.company.Employee + "/" + this.employee.id,
      //     file
      //   ),
      //   (e) => {
      //     this.$emit("valueChanged", this.employee);
      //     this.$awn.success();
      //   },
      //   (e) => this.$awn.alert()
      // );
    },
  },
};
</script>
