<template>
  <div>
    <toolbar :isCard="isCard" @saveChanges="submit" :canSave="true" />
    <DxForm
      ref="form"
      :col-count="2"
      :form-data.sync="company"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxGroupItem :caption="$t('translations.fields.personalData')">
        <DxSimpleItem data-field="firstName">
          <DxLabel location="top" :text="$t('translations.fields.firstName')" />
          <DxRequiredRule :message="$t('translations.fields.firstNameRequired')" />
          <DxPatternRule
            :pattern="namePattern"
            :message="$t('translations.fields.fullNameNoDigits')"
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="lastName">
          <DxLabel location="top" :text="$t('translations.fields.lastName')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="tin">
          <DxPatternRule
            :ignore-empty-value="false"
            :pattern="codePattern"
            :message="$t('translations.fields.tinRule')"
          />
          <DxAsyncRule
            :reevaluate="false"
            :ignore-empty-value="true"
            :message="$t('translations.fields.tinAlreadyExists')"
            :validation-callback="validateEntityExists"
          ></DxAsyncRule>
          <DxSimpleItem data-field="middleName">
            <DxLabel location="top" :text="$t('translations.fields.middleName')" />
          </DxSimpleItem>
          <DxLabel location="top" :text="$t('translations.fields.tin')" />
        </DxSimpleItem>
        <DxSimpleItem editor-type="dxTextBox" data-field="phones">
          <DxLabel location="top" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="bankId" :editor-options="bankOptions" editor-type="dxSelectBox">
          <DxLabel location="top" :text="$t('translations.fields.bankId')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="sex" :editor-options="sexOptions" editor-type="dxSelectBox">
          <DxLabel location="top" :text="$t('translations.fields.sex')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="email">
          <DxLabel location="top" />

          <DxEmailRule :message="$t('translations.fields.emailRule')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="code">
          <DxPatternRule
            :ignore-empty-value="false"
            :pattern="codePattern"
            :message="$t('validation.valueMustNotContainsSpaces')"
          />
          <DxLabel location="top" :text="$t('translations.fields.code')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :caption="$t('translations.fields.APN')">
        <DxSimpleItem
          :editor-options="regionOptions"
          editor-type="dxSelectBox"
          data-field="regionId"
        >
          <DxLabel location="top" :text="$t('translations.fields.regionId')" />
        </DxSimpleItem>
        <DxSimpleItem
          :editor-options="localityOptions"
          editor-type="dxSelectBox"
          data-field="localityId"
        >
          <DxLabel location="top" :text="$t('translations.fields.localityId')" />
        </DxSimpleItem>
        <DxSimpleItem
          :editor-options="localityOptions"
          editor-type="dxDateBox"
          data-field="dateOfBirth"
        >
          <DxLabel location="top" :text="$t('translations.fields.dateOfBirth')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="postAddress">
          <DxLabel location="top" :text="$t('translations.fields.postAddress')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="legalAddress">
          <DxLabel location="top" :text="$t('translations.fields.legalAddress')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="nonresident" editor-type="dxCheckBox">
          <DxLabel location="top" :text="$t('translations.fields.nonresident')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="webSite">
          <DxLabel location="top" :text="$t('translations.fields.webSite')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="account">
          <DxLabel location="top" :text="$t('translations.fields.account')" />
        </DxSimpleItem>
        <DxSimpleItem :editor-options="statusOptions" editor-type="dxSelectBox" data-field="status">
          <DxLabel location="top" :text="$t('translations.fields.status')" />
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
  props: ["isCard", "counterpartId"],
  async created() {
    if (this.counterpartId) {
      const { data } = await this.$axios.get(
        `${dataApi.contragents.Person}/${this.counterpartId}`
      );
      this.company = data;
    }
  },
  data() {
    return {
      company: {
        firstName: "",
        lastName: "",
        middleName: "",
        account: "",
        bankId: null,
        dateOfBirth: "",
        sex: null,
        code: "",
        regionId: null,
        localityId: null,
        legalAddress: "",
        postAddress: "",
        phones: "",
        email: "",
        webSite: "",
        tin: "",
        note: "",
        nonresident: true,
        name: "",
        status: this.$store.getters["status/status"](this)[0].id
      },
      sexOptions: {
        dataSource: [
          { id: 0, name: this.$t("sex.male") },
          { id: 1, name: this.$t("sex.female") }
        ],
        displayExpr: "name",
        valueExpr: "id"
      },
      namePattern: /^[^0-9]+$/,
      codePattern: this.$store.getters["globalProperties/whitespacePattern"],
      headCompanyOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.contragents.Company,
        filter: ["status", "=", Status.Active]
      }),
      bankOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.contragents.Bank,
        filter: ["status", "=", Status.Active]
      }),

      statusOptions: {
        value: this.$store.getters["status/status"](this)[0].id,
        dataSource: this.$store.getters["status/status"](this),
        valueExpr: "id",
        displayExpr: "status",
        showClearButton: true
      }
    };
  },
  computed: {
    regionOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Region,
          filter: ["status", "=", Status.Active]
        }),
        onValueChanged: () => {
          this.company.localityId = null;
        }
      };
    },
    localityOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.sharedDirectory.Locality,
        filter: [
          ["status", "=", Status.Active],
          ["regionId", "=", this.company.regionId]
        ]
      });
    }
  },
  methods: {
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.PersonDataFieldValueNotExists(
        {
          [dataField]: params.value
        },
        dataField
      );
    },
    submit() {
      return this.counterpartId ? this.putRequest() : this.postRequest();
    },
    postRequest() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.contragents.Person, this.company),
        ({ data }) => {
          this.$emit("setCounterPart", data);
          this.$awn.success();
          this.$parent.$parent.closeCard();
        },
        () => {
          this.$awn.alert();
        }
      );
    },
    putRequest() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.put(
          `${dataApi.contragents.Person}/${this.counterpartId}`,
          this.company
        ),
        ({ data }) => {
          this.$emit("setCounterPart", data);
          this.$awn.success();
          this.$parent.$parent.closeCard();
        },
        () => {
          this.$awn.alert();
        }
      );
    }
  }
};
</script>

