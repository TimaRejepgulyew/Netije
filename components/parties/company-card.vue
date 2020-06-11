<template>
  <div>
    <toolbar
      :isCard="isCard"
      @saveChanges="submit"
      :canSave="$store.getters['permissions/allowReading'](EntityType.Counterparty)"
    />
    <DxForm
      ref="form"
      :read-only="!$store.getters['permissions/allowReading'](EntityType.Counterparty)"
      :col-count="2"
      :form-data.sync="company"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxGroupItem :caption="$t('translations.fields.personalData')">
        <DxSimpleItem data-field="name">
          <DxLabel location="top" :text="$t('translations.fields.name')" />
          <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
          <DxPatternRule
            :pattern="namePattern"
            :message="$t('translations.fields.fullNameNoDigits')"
          />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="headCompanyId"
          :editor-options="headCompanyOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.headCompanyId')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="legalName">
          <DxLabel location="top" :text="$t('translations.fields.legalName')" />
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
          <DxLabel location="top" :text="$t('translations.fields.tin')" />
        </DxSimpleItem>
        <DxSimpleItem editor-type="dxTextBox" data-field="phones">
          <DxLabel location="top" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="bankId" :editor-options="bankOptions" editor-type="dxSelectBox">
          <DxLabel location="top" :text="$t('translations.fields.bankId')" />
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
        <DxSimpleItem data-field="postAddress">
          <DxLabel location="top" :text="$t('translations.fields.postAddress')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="legalAddress">
          <DxLabel location="top" :text="$t('translations.fields.legalAddress')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="nonresident" editor-type="dxCheckBox">
          <DxLabel location="top" :text="$t('translations.fields.nonresident')" />
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
import EntityType from "~/infrastructure/constants/entityTypes";
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
        `${dataApi.contragents.Company}/${this.counterpartId}`
      );
      this.company = data;
    }
  },
  data() {
    return {
      EntityType,
      company: {
        headCompanyId: null,
        legalName: "",
        tin: "",
        name: "",
        code: "",
        regionId: null,
        localityId: null,
        legalAddress: "",
        postAddress: "",
        phones: "",
        email: "",
        webSite: "",
        note: "",
        nonresident: true,
        account: "",
        bankId: null,
        type: "",
        id: null,
        status: this.$store.getters["status/status"](this)[0].id
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
      return this.$customValidator.CompanyDataFieldValueNotExists(
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
        this.$axios.post(dataApi.contragents.Company, this.company),
        ({ data }) => {
          this.$emit("valueChanged", data);
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
          `${dataApi.contragents.Company}/${this.counterpartId}`,
          this.company
        ),
        ({ data }) => {
          this.$emit("valueChanged", data);
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

