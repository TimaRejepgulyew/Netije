<template>
  <div>
    <Header
      :showTitle="!isCard"
      :isbackButton="!isCard"
      :headerTitle="$t('translations.headers.counterPart')"
    ></Header>
    <toolbar
      :isCard="isCard"
      :canExchange="canExchange"
      @openExchangeOptions="openExchangeOptions"
      @saveChanges="submit"
      :canSave="
        $store.getters['permissions/allowUpdating'](EntityType.Counterparty)
      "
    />
    <DxForm
      ref="form"
      :read-only="
        !$store.getters['permissions/allowUpdating'](EntityType.Counterparty)
      "
      :col-count="2"
      :form-data.sync="company"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxSimpleItem :col-span="2" data-field="name">
        <DxLabel location="top" :text="$t('shared.name')" />
        <DxRequiredRule :message="$t('shared.nameRequired')" />
      </DxSimpleItem>
      <DxSimpleItem :col-span="2" data-field="legalName">
        <DxLabel location="top" :text="$t('translations.fields.legalName')" />
      </DxSimpleItem>

      <DxSimpleItem
        :editor-options="categoryIdOptions"
        editor-type="dxSelectBox"
        data-field="categoryId"
        :col-span="1"
      >
        <DxLabel location="top" :text="$t('translations.fields.category')" />
      </DxSimpleItem>

      <DxSimpleItem
        :col-span="1"
        data-field="nonresident"
        editor-type="dxCheckBox"
      >
        <DxLabel
          location="left"
          :text="$t('translations.fields.nonresident')"
        />
      </DxSimpleItem>
      <DxSimpleItem :col-span="2" data-field="tin">
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
      <DxSimpleItem :col-span="1" data-field="bic">
        <DxAsyncRule
          :ignore-empty-value="true"
          :reevaluate="false"
          :message="$t('parties.valdation.bicAlreadyExists')"
          :validation-callback="validateEntityExists"
        ></DxAsyncRule>
        <DxLabel location="top" :text="$t('parties.fields.bic')" />
      </DxSimpleItem>
      <DxSimpleItem :col-span="1" data-field="correspondentAccount">
        <DxLabel
          location="top"
          :text="$t('translations.fields.correspondentAccount')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="1"
        :editor-options="statusOptions"
        editor-type="dxSelectBox"
        data-field="status"
      >
        <DxLabel location="top" :text="$t('translations.fields.status')" />
      </DxSimpleItem>
      <DxSimpleItem :col-span="1" data-field="code">
        <DxPatternRule
          :ignore-empty-value="false"
          :pattern="codePattern"
          :message="$t('validation.valueMustNotContainsSpaces')"
        />
        <DxLabel location="top" :text="$t('shared.code')" />
      </DxSimpleItem>

      <DxGroupItem
        :col-count="2"
        :col-span="2"
        :caption="$t('parties.fields.contactInformation')"
      >
        <DxSimpleItem
          :editor-options="localityOptions"
          editor-type="dxSelectBox"
          data-field="localityId"
        >
          <DxLabel
            location="top"
            :text="$t('translations.fields.localityId')"
          />
        </DxSimpleItem>
        <DxSimpleItem
          :editor-options="regionOptions"
          editor-type="dxSelectBox"
          data-field="regionId"
        >
          <DxLabel location="top" :text="$t('translations.fields.regionId')" />
        </DxSimpleItem>

        <DxSimpleItem :col-span="2" data-field="legalAddress">
          <DxLabel
            location="top"
            :text="$t('translations.fields.legalAddress')"
          />
        </DxSimpleItem>
        <DxSimpleItem :col-span="2" data-field="postAddress">
          <DxLabel
            location="top"
            :text="$t('translations.fields.postAddress')"
          />
        </DxSimpleItem>
        <DxSimpleItem :col-span="2" editor-type="dxTextBox" data-field="phones">
          <DxLabel location="top" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>

        <DxSimpleItem :col-span="1" data-field="email">
          <DxLabel location="top" />
          <DxEmailRule :message="$t('translations.fields.emailRule')" />
        </DxSimpleItem>
        <DxSimpleItem :col-span="1" data-field="webSite">
          <DxLabel location="top" :text="$t('translations.fields.webSite')" />
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
    </DxForm>
  </div>
</template>
<script>
import Header from "~/components/page/page__header";
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
import EntityType from "~/infrastructure/constants/entityTypes";
export default {
  components: {
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
    Header,
  },
  props: ["isCard", "data"],
  data() {
    return {
      EntityType,
      company: {
        legalName: "",
        bic: null,
        correspondentAccount: "",
        code: "",
        regionId: null,
        localityId: null,
        legalAddress: "",
        postAddress: "",
        phones: "",
        email: "",
        webSite: "",
        tin: null,
        note: "",
        nonresident: true,
        name: "",
        id: null,
        status: this.$store.getters["status/status"](this)[0].id,
      },
      namePattern: /^[^0-9]+$/,
      codePattern: this.$store.getters["globalProperties/whitespacePattern"],
      statusOptions: {
        value: this.$store.getters["status/status"](this)[0].id,
        dataSource: this.$store.getters["status/status"](this),
        valueExpr: "id",
        displayExpr: "status",
        showClearButton: true,
      },
    };
  },
  computed: {
    canExchange() {
      return (
        this.$store.getters["permissions/IsAdmin"] &&
        this.company.id &&
        !this.company.isCardReadOnly
      );
    },
    regionOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Region,
          filter: ["status", "=", Status.Active],
        }),
        onValueChanged: () => {
          this.company.localityId = null;
        },
      };
    },
    localityOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.sharedDirectory.Locality,
        filter: [
          ["status", "=", Status.Active],
          ["regionId", "=", this.company.regionId],
        ],
      });
    },
    categoryIdOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.contragents.Category,
        }),
      };
    },
  },
  methods: {
    openExchangeOptions() {
      this.$popup.exchangeOptions(
        this,
        {
          counterPartId: this.company.id,
        },
        {
          height: "auto",
          width: "60vw",
        }
      );
    },
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.BankDataFieldValueNotExists(
        {
          [dataField]: params.value,
        },
        dataField
      );
    },
    submit() {
      return this.data?.id ? this.putRequest() : this.postRequest();
    },
    postRequest() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.contragents.Bank, this.company),
        ({ data }) => {
          this.$emit("valueChanged", data);
          this.$emit("created", data);
          this.$awn.success();
          this.$emit("close");
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
          `${dataApi.contragents.Bank}/${this.data.id}`,
          this.company
        ),
        ({ data }) => {
          this.$emit("valueChanged", data);
          this.$awn.success();
          this.$emit("close");
        },
        () => {
          this.$awn.alert();
        }
      );
    },
  },
  created() {
    if (this.data) {
      this.company = this.data;
    }
  },
};
</script>
