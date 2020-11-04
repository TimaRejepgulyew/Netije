<template>
  <div>
    <Header :headerTitle="employee.name" :isbackButton="false"></Header>
    <DxForm :read-only="true" :form-data="employee" id="form" :col-count="2">
      <DxSimpleItem data-field="name" data-type="string">
        <DxLabel :text="$t('shared.name')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="headCompanyId">
        <DxLabel :text="$t('companyStructure.fields.headCompany')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="code">
        <DxLabel :text="$t('shared.code')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="tin">
        <DxLabel :text="$t('translations.fields.tin')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="regionId">
        <DxLabel :text="$t('translations.fields.regionId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="localityId">
        <DxLabel :text="$t('translations.fields.localityId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="phones">
        <DxLabel :text="$t('translations.fields.phones')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="legalName">
        <DxLabel :text="$t('translations.fields.legalName')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="legalAddress">
        <DxLabel :text="$t('translations.fields.legalAddress')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="postalAddress">
        <DxLabel :text="$t('translations.fields.postAddress')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="ceo">
        <DxLabel :text="$t('translations.fields.ceo')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="email">
        <DxLabel :text="$t('translations.fields.email')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="homepage">
        <DxLabel :text="$t('translations.fields.webSite')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="account">
        <DxLabel :text="$t('translations.fields.account')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="bankId">
        <DxLabel :text="$t('translations.fields.bankId')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="status">
        <DxLabel :text="$t('translations.fields.status')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="note" template="textAreaEditor">
        <DxLabel :text="$t('translations.fields.note')" />
      </DxSimpleItem>
      <template #textAreaEditor="cellInfo">
        <textArea
          :value="cellInfo.data.value"
          :on-value-changed="(value) => onValueChanged(value, cellInfo.data)"
        ></textArea>
      </template>
    </DxForm>
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxLabel } from "devextreme-vue/form";
import Header from "~/components/page/page__header";
import textArea from "~/components/page/textArea";
export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxLabel,
    textArea,
    Header,
  },
  data() {
    return {
      employee: {
        account: null,
        bankId: null,
        ceo: null,
        code: null,
        description: null,
        email: null,
        headCompanyId: null,
        homepage: null,
        isSystem: false,
        legalAddress: null,
        legalName: null,
        localityId: null,
        name: "null",
        note: null,
        phones: null,
        postalAddress: null,
        recipientType: null,
        regionId: null,
        status: null,
        tin: null,
      },
    };
  },
};
</script>