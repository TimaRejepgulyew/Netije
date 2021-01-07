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
      :canSave="!readOnly"
    />
    <DxForm
      ref="form"
      :read-only="readOnly"
      :col-count="2"
      :form-data.sync="person"
      :show-colon-after-label="true"
      :show-validation-summary="false"
    >
      <DxSimpleItem :col-span="2" data-field="firstName">
        <DxLabel location="top" :text="$t('translations.fields.firstName')" />
        <DxRequiredRule
          :message="$t('translations.fields.firstNameRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem :col-span="2" data-field="lastName">
        <DxRequiredRule :message="$t('translations.fields.lastNameRequired')" />
        <DxLabel location="top" :text="$t('translations.fields.lastName')" />
      </DxSimpleItem>
      <DxSimpleItem :col-span="2" data-field="middleName">
        <DxLabel location="top" :text="$t('translations.fields.middleName')" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="2"
        :editor-options="dateOptions"
        editor-type="dxDateBox"
        data-field="dateOfBirth"
      >
        <DxLabel location="top" :text="$t('translations.fields.dateOfBirth')" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="1"
        :editor-options="categoryIdOptions"
        editor-type="dxSelectBox"
        data-field="categoryId"
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
          :col-span="1"
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
          :col-span="1"
          :editor-options="regionOptions"
          editor-type="dxSelectBox"
          data-field="regionId"
        >
          <DxLabel location="top" :text="$t('translations.fields.regionId')" />
        </DxSimpleItem>
        <DxSimpleItem :col-span="2" data-field="legalAddress">
          <DxLabel
            location="top"
            :text="$t('translations.fields.registrationAddress')"
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
      <DxGroupItem
        :col-span="2"
        :col-count="2"
        :caption="$t('parties.fields.bankDetail')"
      >
        <DxSimpleItem
          data-field="bankId"
          :editor-options="bankOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.bankId')" />
        </DxSimpleItem>
        <DxSimpleItem :col-span="1" data-field="account">
          <DxLabel location="top" :text="$t('translations.fields.account')" />
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
import Header from "~/components/page/page__header";
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
  created() {
    if (this.data) {
      this.person = this.data;
    }
  },
  data() {
    return {
      EntityType,
      person: {
        firstName: "",
        lastName: "",
        middleName: "",
        account: "",
        bankId: null,
        dateOfBirth: null,
        sex: null,
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
        status: this.$store.getters["status/status"](this)[0].id,
      },
      namePattern: /^[^0-9]+$/,
      codePattern: this.$store.getters["globalProperties/whitespacePattern"],
      bankOptions: this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.contragents.Bank,
        filter: ["status", "=", Status.Active],
      }),
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
        this.person.id &&
        !this.person.isCardReadOnly
      );
    },
    readOnly() {
      if (this.person.isSystem) {
        return !this.$store.getters["permissions/IsAdmin"];
      } else {
        return !this.$store.getters["permissions/allowUpdating"](
          this.EntityType.Counterparty
        );
      }
    },
    regionOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Region,
          filter: ["status", "=", Status.Active],
        }),
        onValueChanged: () => {
          this.person.localityId = null;
        },
      };
    },
    localityOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.sharedDirectory.Locality,
        filter: [
          ["status", "=", Status.Active],
          ["regionId", "=", this.person?.regionId],
        ],
      });
    },
    dateOptions() {
      return {
        useMaskBehavior: true,
        openOnFieldClick: true,
      };
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
          counterPartId: this.person.id,
        },
        {
          height: "auto",
          width: "60vw",
        }
      );
    },
    validateEntityExists(params) {
      var dataField = params.formItem.dataField;
      return this.$customValidator.PersonDataFieldValueNotExists(
        {
          [dataField]: params.value,
        },
        dataField
      );
    },
    submit() {
      return this.data ? this.putRequest() : this.postRequest();
    },
    postRequest() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.contragents.Person, this.person),
        ({ data }) => {
          this.person = data;
          this.$emit("valueChanged", data);
          this.$emit("created", data);
          this.$awn.success();
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
          `${dataApi.contragents.Person}/${this.data.id}`,
          this.person
        ),
        ({ data }) => {
          this.$emit("valueChanged", data);
          this.$awn.success();
        },
        () => {
          this.$awn.alert();
        }
      );
    },
  },
};
</script>
