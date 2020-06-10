<template>
  <div>
    <toolbar :isCard="isCard" @saveChanges="submit" :canSave="true" />
    <DxForm
      ref="form"
      :form-data.sync="contact"
      :show-colon-after-label="true"
      :show-validation-summary="true"
      validation-group="contact"
    >
      <DxGroupItem :col-count="2">
        <DxSimpleItem data-field="name">
          <DxLabel location="top" :text="$t('translations.fields.contactName')" />
          <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="correspondent">
          <DxLabel location="top" :text="$t('translations.fields.company')" />
          <DxRequiredRule :message="$t('translations.fields.companyRequired')" />
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
          <DxLabel location="top" :text="$t('translations.fields.fax')" />
        </DxSimpleItem>
        <DxSimpleItem editor-type="dxTextBox" data-field="phones">
          <DxLabel location="top" :text="$t('translations.fields.phones')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="email">
          <DxLabel location="top" />
          <DxEmailRule :message="$t('translations.fields.emailRule')" />
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
      <template #counterPart>
        <custom-select-box
          validatorGroup="contact"
          @setСounterPart="setCorrenspondent"
          messageRequired="translations.fields.companyRequired"
          :counterPart="contact.companyId"
          :notPerson="true"
        />
      </template>
    </DxForm>
  </div>
</template>
<script>
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
    customSelectBox
  },
  props: ["isCard", "contactId", "correspondent"],
  async created() {
    console.log(this.correspondent);
    if (this.contactId) {
      const { data } = await this.$axios.get(
        `${dataApi.contragents.Contact}/${this.contactId}`
      );
      this.contact = data;
    }
  },
  data() {
    return {
      contact: {
        name: "",
        correspondent: this.correspondent.name,
        companyId: this.correspondent.id,
        department: "",
        jobTitle: "",
        phone: "",
        fax: "",
        email: "",
        note: "",
        homepage: "",
        id: null,
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
    setCorrenspondent(data) {
      this.$set(this.contact, "companyId", data.id);
    },
    submit() {
      return this.counterpartId ? this.putRequest() : this.postRequest();
    },
    postRequest() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.contragents.Contact, this.contact),
        ({ data }) => {
          this.$emit("setContact", data);
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
          `${dataApi.contragents.Contact}/${this.counterpartId}`,
          this.contact
        ),
        ({ data }) => {
          this.$emit("setContact", data);
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

