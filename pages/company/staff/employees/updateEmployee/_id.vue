<template>
  <div id="form-demo">
    <div class="widget-container">
      <Header :headerTitle="headerTitle"></Header>
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
      <!-- <DxPopup
        :visible.sync="popupRoleVisible"
        :drag-enabled="false"
        :close-on-outside-click="true"
        :show-title="true"
        :width="500"
        :height="250"
        :title="$t('translations.fields.addingRoles')"
      >
        <div>
          <popup-user-role @popupDisabled="popupDisabled('popupRoleVisible')" />
        </div>
      </DxPopup>-->
      <form @submit="handleSubmit">
        <DxForm
          :col-count="12"
          :form-data.sync="store"
          :read-only="false"
          :show-colon-after-label="true"
          :show-validation-summary="true"
          validation-group="upgrateEmployee"
        >
          <DxGroupItem :col-span="4" :caption="$t('translations.fields.personalData')">
            <DxSimpleItem
              data-field="userName"
              :editor-options="{disabled:'true'}"
              data-type="string"
            >
              <DxLabel location="top" :text="$t('translations.fields.userName')" />
            </DxSimpleItem>
            <DxSimpleItem data-field="email">
              <DxLabel location="top" />
              <DxRequiredRule :message="$t('translations.fields.emailRequired')" />
              <DxEmailRule :message="$t('translations.fields.emailRule')" />
              <DxAsyncRule
                :validation-callback="validateEntityExists"
                :message="$t('translations.fields.emailAlreadyExists')"
              />
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
              data-field="note"
              :col-span="1"
              :editor-options="{height: 90,labelLocation:'right',}"
              editor-type="dxTextArea"
            >
              <DxLabel location="top" :text="$t('translations.fields.note')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxGroupItem :col-span="5" :caption="$t('translations.fields.APN')">
            <DxSimpleItem
              data-field="jobTitleId"
              :editor-options="jobTitleOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.jobTitleId')" />
            </DxSimpleItem>

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
          <DxGroupItem
            :col-span="3"
            :col-count="2"
            :caption="$t('translations.fields.moreSettings')"
          >
            <DxButtonItem :button-options="popupPasswordOpt" horizontal-alignment="right" />
            <!-- <DxButtonItem :button-options="popupRoleOpt" horizontal-alignment="right" /> -->
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
import Header from "~/components/page/page__header";
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
  DxPatternRule,
  DxEmailRule,
  DxAsyncRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import notify from "devextreme/ui/notify";

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
    DxPopup,
    popupUserRole,
    popupChangePassword
  },
  async created() {
    this.store = await this.getDataById(this.address);
    this.headerTitle =
      this.$t("translations.menu.upgratingEmployee") + this.store.name;
  },

  data() {
    return {
      headerTitle: "",
      address: dataApi.company.Employee + "/" + this.$route.params.id,
      store: {
        id: parseInt(this.$route.params.id),
        email: null,
        name: null,
        phone: null,
        jobTitleId: null,
        departmentId: null,
        note: null,
        userName: null,
        password: null,
        confirmPassword: null,
        status: 0
      },

      cancelButtonOptions: {
        onClick: this.backTo,
        width: 100,
        height: 50,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      statusOptions: {
        dataSource: this.$store.getters["status/status"],
        valueExpr: "id",
        displayExpr: "status",
        showClearButton: true
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
      popupPasswordVisible: false,
      popupRoleVisible: false,
      namePattern: /^[^0-9]+$/
    };
  },

  methods: {
    async getDataById(url) {
      const res = await this.$axios.get(url);
      return res.data;
    },
    popupDisabled(popup) {
      this[popup] = false;
    },
    passwordComparison() {
      return this.store.password;
    },
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.EmployeeDataFieldValueNotExists(
        {
          id: this.store.id,
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
      delete this.store.userName;
      this.$axios
        .put(this.address, this.store)
        .then(res => {
          this.backTo();
          this.notify(
            this.$t("translations.menu.upgradeEmployeeSucces"),
            "success"
          );
        })
        .catch(e => {
          this.notify(
            this.$t("translations.menu.upgradeEmployeeError"),
            "error"
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

