<template>
  <div>
    <div>
      <Header :isbackButton="true" :isNew="true" :headerTitle="$t('contractCategories.title')"></Header>
      <toolbar @saveChanges="handleSubmit" :canSave="true" />
      <DxForm
        ref="form"
        :col-count="1"
        :form-data.sync="contractCategory"
        :read-only="false"
        :show-colon-after-label="true"
      >
        <DxGroupItem :col-count="1">
          <DxSimpleItem data-field="name">
            <DxLabel location="top" :text="$t('shared.name')" />
            <DxRequiredRule :message="$t('shared.nameRequired')" />
          </DxSimpleItem>

          <DxSimpleItem
            :editor-options="documentKindOptions"
            editor-type="dxTagBox"
            data-field="documentKinds"
          >
            <DxLabel location="top" :text="$t('contractCategories.documentKinds')" />
            <DxRequiredRule />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="status"
            :editor-options="statusOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.status')" />
          </DxSimpleItem>

          <DxSimpleItem data-field="note" :col-span="2" editor-type="dxTextArea">
            <DxLabel location="top" :text="$t('translations.fields.note')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxForm>
    </div>
  </div>
</template>
<script>
import Toolbar from "~/components/shared/base-toolbar.vue";
import "devextreme-vue/text-area";
import Status from "~/infrastructure/constants/status";
import Docflow from "~/infrastructure/constants/docflows";
import { DxTagBox } from "devextreme-vue/tag-box";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";

export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    Toolbar
  },
  data() {
    return {
      contractCategory: {
        status: Status.Active,
        name: "",
        note: "",
        documentKinds: []
      },
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(
          dataApi.docFlow.ContractCategories,
          this.contractCategory
        ),
        res => {
          this.$router.go(-1);
          this.$awn.success();
        },
        err => this.$awn.alert()
      );
    }
  },
  computed: {
    statusOptions() {
      return {
        valueExpr: "id",
        displayExpr: "status",
        dataSource: this.$store.getters["status/status"](this)
      };
    },
    documentKindOptions() {
      return {
        dataSource: {
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.DocumentKind
          }),
          filter: [
            ["status", "=", Status.Active],
            "and",
            ["documentFlow", "=", Docflow.Contracts]
          ]
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    }
  }
};
</script>
<style>
</style>

