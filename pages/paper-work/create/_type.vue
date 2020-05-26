<template>
  <div>
    <Header headerTitle="headerTitle"></Header>
    <toolbar @saveChanges="handleSubmit"></toolbar>
    <DxForm
      ref="form"
      :col-count="1"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      validation-group="OfficialDocument"
    >
      <DxGroupItem :col-count="1" :caption="$t('translations.fields.main')">
        <DxSimpleItem data-field="name" :editor-options="nameOptions">
          <DxLabel location="top" :text="$t('translations.fields.nameRequired')" />
          <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="documentKindId"
          :editor-options="documentKindOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.documentKindId')" />
          <DxRequiredRule :message="$t('translations.fields.documentKindIdRequired')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="subject"
          :editor-options="subjectOptions"
          editor-type="dxTextArea"
        >
          <DxLabel location="top" :text="$t('translations.fields.subject')" />
          <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem template="formByTypeGuid"></DxGroupItem>
      <DxSimpleItem
        :col-span="2"
        data-field="note"
        :editor-options="noteOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="top" :text="$t('translations.fields.note')" />
      </DxSimpleItem>
      <template #formByTypeGuid>
        <component :is="formByTypeGuid" />
      </template>
    </DxForm>
  </div>
</template>
<script>
import DocumentTypeGuid from "~/infrastructure/constants/documentFilterType.js";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import Toolbar from "~/components/paper-work/main-doc-form/toolbar";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    Toolbar,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm
  },
  async asyncData({ app, params }) {
    await app.store.dispatch("currentDocument/initNewDocument", +params.type);
  },
  data() {
    return {
      entityTypeGuid: EntityTypes.ElectroonicDocument,
      currentUrl: null,
      documentKindOptions: {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentKind,
          filter: [
            ["documentTypeId", "=", this.$route.params.type],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"].documentKind.id,
        onSelectionChanged: e => {
          this.$store.dispatch(
            "currentDocument/setDocumentKind",
            e.selectedItem
          );
        }
      }
    };
  },
  methods: {
    handleSubmit(close) {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      this.$awn.asyncBlock(
        this.$axios.post(
          this.currentUrl, // TODO url
          this.$store.getters["current-document/document"]
        ),
        res => {
          this.$awn.success();
          if (close) this.$router.go(-1);
          else
            this.$router.replace({
              name: this.$route.name,
              params: { id: res.data }
            });
        },
        e => {
          this.$awn.alert();
        }
      );
    }
  },
  computed: {
    formByTypeGuid() {
      switch (+this.$route.params.type) {
        case DocumentTypeGuid.IncommingLetter:
          this.currentUrl = dataApi.paperWork.IncommingLetterPost;
          return "incomming-letter";
        case DocumentTypeGuid.OutgoingLetter:
          this.currentUrl = dataApi.paperWork.OutgoingLetterPost;
          return "outgoing-letter";
        case DocumentTypeGuid.Order:
          this.currentUrl = dataApi.paperWork.OrderPost;
          return "Order";
        case DocumentTypeGuid.CompanyDirective:
          this.currentUrl = dataApi.paperWork.CompanyDirectivePost;
          return "company-directive";
        case DocumentTypeGuid.SimpleDocument:
          this.currentUrl = dataApi.paperWork.SimpleDocumentPost;
          return "simple-document";
        case DocumentTypeGuid.Addendum:
          this.currentUrl = dataApi.paperWork.AddendumPost;
          return "addendum";
        case DocumentTypeGuid.Memo:
          this.currentUrl = dataApi.paperWork.MemoPost;
          return "memo";
        case DocumentTypeGuid.PowerOfAttorney:
          this.currentUrl = dataApi.paperWork.PowerOfAttorneyPost;
          return "power-of-attorney";
      }
    },

    nameOptions() {
      return {
        value: this.$store.getters["currentDocument/document"].name,
        disabled: this.$store.getters["currentDocument/document"].documentKind
          .generateDocumentName,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_NAME", e.value);
        }
      };
    },
    subjectOptions() {
      return {
        value: this.$store.getters["currentDocument/document"].subject,
        onValueChanged: e => {
          this.$store.dispatch("currentDocument/setSubject", e.value);
        }
      };
    },
    noteOptions() {
      return {
        value: this.$store.getters["currentDocument/document"].note,
        height: 70,
        autoResizeEnabled: true,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_NOTE", e.value);
        }
      };
    }
  }
};
</script>
<style scoped>
.tab-bar {
  margin-top: 10px;
}
.item {
  flex-grow: 1;
  padding: 0 15px;
  width: 20%;
}
.f-grow-3 {
  flex-basis: 35%;
  flex-grow: 5;
}
</style>
