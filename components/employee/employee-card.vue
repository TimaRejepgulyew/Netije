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
      :read-only="!$store.getters['permissions/allowUpdating'](entityType)"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="updateEmployee"
    >
      <DxGroupItem
        :col-span="5"
        :caption="$t('translations.fields.personalData')"
        :col-count="5"
      > 
        <DxGroupItem
          :col-span="1"
        >
          <DxSimpleItem
            template="imageUploader"
          >
            <DxLabel location="top" text="Фото" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :col-span="4">
          <DxSimpleItem
        
            data-field="userName"
            :editor-options="{ disabled: true }"
            data-type="string"
          >
            <DxLabel
              location="top"
              :text="$t('translations.fields.userName')"
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
        <DxSimpleItem
          data-field="departmentId"
          :editor-options="departmentOptions"
          editor-type="dxSelectBox"
        >
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
          validatorGroup="updateEmployee"
          @valueChanged="
            data => {
              setBusinessUnitId(data);
              setDepartmentId(null);
            }
          "
        />
      </template>
      <template #imageUploader>
        <image-uploader
          :path="data.personalPhoto"
          @valueChanged="(data) => {
            setPhoto(data)
                      } " 
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
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
  DxButtonItem
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
    ImageUploader
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
        showClearButton: true
      },
      jobTitleOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.JobTitle,
        filter: ["status", "=", 0]
      }),
      passwordOptions: {
        mode: "password"
      },
      changePasswordPupupVisible: false,
      namePattern: /^[^0-9]+$/
    };
  },
  computed: {
    businessUnitId() {
      return this.employee.businessUnitId;
    },
    departmentOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
          filter: [
            ["status", "=", 0],
            ["businessUnitId", "=", this.employee.businessUnitId]
          ]
        }),
        value: this.employee.departmentId
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
        text: this.$t("buttons.changePassword")
      };
    }
  },
  methods: {
    setDepartmentId(data) {
      this.employee.departmentId = data;
    },
    setBusinessUnitId(data) {
      this.employee.businessUnitId = data;
    },
    setPhoto(data){
      console.log(data);
      this.employee.personalPhoto = data
      console.log(this.employee);
      // console.log(file);
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
          [dataField]: params.value
        },
        dataField
      );
    },
    generateFormData(data){
      const file = new FormData()
      file.append("id",data.id)
      file.append("email",data.email)
      file.append("name",data.name)
      file.append("phone",data.phone)
      file.append("jobTitleId",data.jobTitleId)
      file.append("departmentId",data.departmentId)
      file.append("status",data.status)
      file.append("note",data.note)
      file.append("personalPhoto",data.personalPhoto)
      return file
    },
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      const file =  this.generateFormData(this.employee)
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.put(
          dataApi.company.Employee + "/" + this.employee.id,
          file
        ),
        e => {
          this.$emit("valueChanged", this.employee);
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  }
};
</script>
