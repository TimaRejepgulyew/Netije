<template>
  <div>
    <toolbar
      :isCard="isCard"
      @saveChanges="submit"
      :canSave="$store.getters['permissions/allowReading'](EntityType.Contact)"
    />
    <DxForm
      ref="form"
      :read-only="
        !$store.getters['permissions/allowReading'](EntityType.Contact)
      "
      :form-data.sync="contact"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="contact"
    >
      <DxGroupItem :col-count="2">
        <DxSimpleItem data-field="name">
          <DxLabel location="top" :text="$t('parties.fields.contactName')" />
          <DxRequiredRule :message="$t('shared.nameRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          editor-type="dxSelectBox"
          :editor-options="correspondentOptions"
          data-field="companyId"
        >
          <DxLabel location="top" :text="$t('parties.fields.company')" />
          <DxRequiredRule :message="$t('parties.validation.companyRequired')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="department">
          <DxLabel location="top" :text="$t('translations.fields.department')" />
        </DxSimpleItem>
        <DxSimpleItem editor-type="dxTextBox" data-field="jobTitle">
          <DxLabel location="top" :text="$t('translations.fields.jobTitleId')" />
        </DxSimpleItem>
        <DxSimpleItem editor-type="dxTextBox" data-field="homepage">
          <DxLabel location="top" :text="$t('translations.fields.homepage')" />
        </DxSimpleItem>
        <DxSimpleItem editor-type="dxTextBox" data-field="fax">
          <DxLabel location="top" :text="$t('parties.fields.fax')" />
        </DxSimpleItem>
        <DxSimpleItem editor-type="dxTextBox" data-field="phones">
          <DxLabel location="top" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="email">
          <DxLabel location="top" />
          <DxEmailRule :message="$t('translations.fields.emailRule')" />
        </DxSimpleItem>
        <DxSimpleItem template="personSelectBox" data-field="personId">
          <DxLabel location="top" :text="$t('counterPart.Person')" />
        </DxSimpleItem>
        <DxSimpleItem :editor-options="statusOptions" editor-type="dxSelectBox" data-field="status">
          <DxLabel location="top" :text="$t('translations.fields.status')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :col-span="2">
        <DxSimpleItem data-field="note" :editor-options="{ height: 90 }" editor-type="dxTextArea">
          <DxLabel location="top" :text="$t('translations.fields.note')" />
        </DxSimpleItem>
      </DxGroupItem>
      <template #counterPart>
        <custom-select-box
          validatorGroup="contact"
          @setСounterPart="setCorrenspondent"
          messageRequired="parties.validation.companyRequired"
          :counterPart="contact.companyId"
          :notPerson="true"
        />
      </template>
      <template #personSelectBox>
        <person-select-box
          valueExpr="id"
          :read-only="false"
          :isPerson="true"
          :value="contact.personId"
          @valueChanged="value => personChanged(value)"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
import PersonSelectBox from "~/components/parties/custom-select-box.vue";
import customSelectBox from "~/components/parties/custom-select-box.vue";
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
import EntityType from "~/infrastructure/constants/entityTypes";
import dataApi from "~/static/dataApi";
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
    customSelectBox,
    PersonSelectBox
  },
  props: ["isCard", "data"],
  async created() {
    if (this.contactId) {
      const { data } = await this.$axios.get(
        `${dataApi.contragents.Contact}/${this.contactId}`
      );
      this.contact = data;
    }
  },
  data() {
    return {
      EntityType,
      contact: this.data,
      correspondentOptions: {
        dataSource: new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.contragents.CounterPart
          }),
          paginate: true,
          pageSize: 10
        }),
        valueExpr: "id",
        displayExpr: "name",
        value: this.correspondentId,
        readOnly: true
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
    counterpartId() {
      return this.data.id;
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
    localityOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.sharedDirectory.Locality,
        filter: [
          ["status", "=", Status.Active],
          ["regionId", "=", this.contact.regionId]
        ]
      });
    }
  },
  methods: {
    async personChanged(value) {
      this.contact.personId = await value;
      var res = this.$refs["form"].instance.repaint();
    },
    setCorrenspondent(data) {
      this.$set(this.contact, "companyId", data.id);
    },
    submit() {
      console.log(this.counterpartId);
      return this.counterpartId ? this.putRequest() : this.postRequest();
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
          `${dataApi.contragents.Contact}/${this.counterpartId}`,
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
