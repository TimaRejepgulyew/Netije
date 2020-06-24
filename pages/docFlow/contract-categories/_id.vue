<template>
  <div>
    <div>
      <Header :headerTitle="contractCategoryName"></Header>
      <toolbar
        @saveChanges="handleSubmit"
        :canSave="$store.getters['permissions/allowUpdating'](this.entityType)"
      />
      <DxForm
        ref="form"
        :col-count="1"
        :form-data.sync="contractCategory"
        :read-only="false"
        :show-colon-after-label="true"
      >
        <DxGroupItem :col-count="1">
          <DxSimpleItem data-field="name">
            <DxLabel location="top" :text="$t('translations.fields.name')" />
            <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
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
import EntityType from "~/infrastructure/constants/entityTypes";
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
  DxRequiredRule,
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
  async asyncData({ app, params }) {
    var res = await app.$axios.get(
      dataApi.docFlow.ContractCategories + "/" + params.id
    );
    return {
      contractCategory: res.data
    };
  },
  data() {
    return {
      entityType: EntityType.DocumentGroupBase,
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      const object = { ...this.contractCategory };
      this.$awn.asyncBlock(
        this.$axios.put(
          `${dataApi.docFlow.ContractCategories}/${object.id}`,
          object
        ),
        res => this.$awn.success(),
        err => this.$awn.alert()
      );
    }
  },
  computed: {
    contractCategoryName() {
      return this.contractCategory.name;
    },
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
