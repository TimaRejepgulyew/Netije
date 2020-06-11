<template>
  <div>
    <Header :headerTitle="employee.name"></Header>
    <toolbar
      :isCard="isCard"
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
        <change-password-popup @hidePopup="hidePopup('changePasswordPupupVisible')" />
      </div>
    </DxPopup>
    <DxForm
      ref="form"
      :col-count="12"
      :form-data.sync="employee"
      :read-only="!$store.getters['permissions/allowUpdating'](entityType)"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="updateEmployee"
    >
      <DxGroupItem :col-span="4" :caption="$t('translations.fields.personalData')">
        <DxSimpleItem data-field="userName" :editor-options="{disabled:'true'}" data-type="string">
          <DxLabel location="top" :text="$t('translations.fields.userName')" />
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
      </DxGroupItem>
      <DxGroupItem :col-span="5" :caption="$t('translations.fields.departmentId')">
        <DxSimpleItem
          data-field="departmentId"
          :editor-options="departmentOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.departmentId')" />
        </DxSimpleItem>

        <DxSimpleItem data-field="phone">
          <DxLabel location="top" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="status"
          :editor-options=" statusOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.status')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-span="3" :col-count="2" :caption="$t('translations.fields.moreSettings')">
        <DxButtonItem :button-options="popupPasswordOpt" horizontal-alignment="right" />
      </DxGroupItem>
      <DxGroupItem :col-count="12" :col-span="12">
        <DxSimpleItem
          data-field="note"
          :col-span="12"
          :editor-options="{height: 90}"
          editor-type="dxTextArea"
        >
          <DxLabel location="top" :text="$t('translations.fields.note')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxForm>
  </div>
</template>
<script>
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
    Toolbar
  },
  props: ["employeeId", "isCard"],
  async created() {
    var res = await this.$axios.get(
      dataApi.company.Employee + "/" + this.employeeId
    );
    this.employee = res.data;
  },
  data() {
    return {
      employee: {},
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
      departmentOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.company.Department,
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
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.put(
          dataApi.company.Employee + "/" + this.employeeId,
          this.employee
        ),
        e => {
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  }
};
</script>
