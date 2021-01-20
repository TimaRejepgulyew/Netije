<template>
  <div>
    <Header v-if="!isCard" :headerTitle="headerTitle" :isbackButton="!isCard" :isNew="isNew"></Header>
    <toolbar :isCard="isCard" @saveChanges="saveChanges" :canSave="allowReading" />
    <DxForm
      ref="form"
      :read-only="!allowReading"
      :form-data.sync="contact"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="contact"
    >
      <DxGroupItem :col-count="2">
        <DxSimpleItem data-field="name" :editor-options="nameOptions" :col-span="2">
          <DxLabel location="left" :text="$t('parties.fields.contactName')" />
          <DxRequiredRule :message="$t('shared.nameRequired')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="personId" template="personSelectBox" :col-span="2">
          <DxLabel location="left" :text="$t('counterPart.Person')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="companyId" template="companySelectBox" :col-span="2">
          <DxLabel location="left" :text="$t('parties.fields.company')" />
          <DxRequiredRule :message="$t('parties.validation.companyRequired')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="jobTitle" editor-type="dxTextBox" :col-span="2">
          <DxLabel location="left" :text="$t('translations.fields.jobTitleId')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="department" :col-span="2">
          <DxLabel location="left" :text="$t('translations.fields.department')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="phones" editor-type="dxTextBox">
          <DxLabel location="left" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="fax" editor-type="dxTextBox">
          <DxLabel location="left" :text="$t('parties.fields.fax')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="email">
          <DxLabel location="left" />
          <DxEmailRule :message="$t('translations.fields.emailRule')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="homepage" editor-type="dxTextBox">
          <DxLabel location="left" :text="$t('translations.fields.homepage')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="status" editor-type="dxSelectBox" :editor-options="statusOptions">
          <DxLabel location="left" :text="$t('translations.fields.status')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-span="2">
        <DxSimpleItem data-field="note" editor-type="dxTextArea" :editor-options="{ height: 90 }">
          <DxLabel location="top" :text="$t('translations.fields.note')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #companySelectBox>
        <parties-select-box
          valueExpr="id"
          :read-only="false"
          :notPerson="true"
          :isPerson="false"
          :value="contact.companyId"
          @valueChanged="(value) => companyChanged(value)"
        />
      </template>
      <template #personSelectBox>
        <parties-select-box
          valueExpr="id"
          :read-only="false"
          :isPerson="true"
          :value="contact.personId"
          @valueChanged="(value) => personChanged(value)"
          @selectionChanged="(value) => personSelectionChanged(value)"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
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
import DataSource from "devextreme/data/data_source";
import PartiesSelectBox from "~/components/parties/custom-select-box.vue";
import Toolbar from "~/components/shared/base-toolbar.vue";
import Header from "~/components/page/page__header.vue";

// CONSTANTS
import Status from "~/infrastructure/constants/status.js";
import EntityType from "~/infrastructure/constants/entityTypes.js";

import dataApi from "~/static/dataApi";
export default {
  components: {
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxSimpleItem,
    DxRangeRule,
    DxEmailRule,
    DxGroupItem,
    DxAsyncRule,
    DxLabel,
    DxForm,
    PartiesSelectBox,
    Toolbar,
    Header
  },
  props: {
    isCard: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      EntityType,
      contact: this.data,
      namePattern: /^[^0-9]+$/,
      codePattern: this.$store.getters["globalProperties/whitespacePattern"],
      personSelected: false
    };
  },
  computed: {
    isNew() {
      return this.data.id ? false : true;
    },
    headerTitle() {
      return this.isNew ? this.$t("menu.addingContact") : this.contact.name;
    },
    contactId() {
      return this.isNew ? null : this.contact.id;
    },
    nameOptions() {
      return {
        readOnly: this.personSelected
      };
    },
    allowReading() {
      return this.$store.getters["permissions/allowReading"](
        this.EntityType.Contact
      );
    },
    statusOptions() {
      return {
        value: this.$store.getters["status/status"](this)[0].id,
        dataSource: this.$store.getters["status/status"](this),
        valueExpr: "id",
        displayExpr: "status",
        showClearButton: true
      };
    },
    sexOptions() {
      return {
        dataSource: [
          { id: 0, name: this.$t("sex.male") },
          { id: 1, name: this.$t("sex.female") }
        ],
        displayExpr: "name",
        valueExpr: "id"
      };
    },
    localityOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.sharedDirectory.Locality,
        filter: [
          ["status", "=", Status.Active],
          ["regionId", "=", this.contact.regionId]
        ]
      });
    },
    regionOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.sharedDirectory.Region,
          filter: ["status", "=", Status.Active]
        }),
        onValueChanged: () => {
          this.contact.localityId = null;
        }
      };
    },
    headCompanyOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.contragents.Company,
        filter: ["status", "=", Status.Active]
      });
    },
    bankOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.contragents.Bank,
        filter: ["status", "=", Status.Active]
      });
    }
  },
  methods: {
    async personChanged(value) {
      this.contact.personId = await value;
      this.$refs["form"].instance.repaint();
    },
    personSelectionChanged(value) {
      this.contact.name = value ? value.name : null;
      this.personSelected = value ? true : false;
    },
    async companyChanged(value) {
      this.contact.companyId = await value;
      this.$refs["form"].instance.repaint();
    },
    setCounterPart(data) {
      this.$set(this.contact, "companyId", data.id);
    },
    saveChanges() {
      return this.isNew ? this.postRequest() : this.putRequest();
    },
    postRequest() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.contragents.Contact, this.contact),
        ({ data }) => {
          this.$emit("valueChanged", data);
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
          `${dataApi.contragents.Contact}/${this.contactId}`,
          this.contact
        ),
        ({ data }) => {
          this.$emit("valueChanged", data);
          this.$awn.success();
        },
        () => {
          this.$awn.alert();
        }
      );
    }
  }
};
</script>
