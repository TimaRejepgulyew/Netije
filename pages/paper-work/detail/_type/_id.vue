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
        <component :is="formByTypeGuid"></component>
      </template>
    </DxForm>
  </div>
</template>
<script>
import powerOfAttorney from "~/components/paper-work/power-of-attorney.vue";
import memo from "~/components/paper-work/memo.vue";
import addendum from "~/components/paper-work/addendum.vue";
import simpleDocument from "~/components/paper-work/simple-document.vue";
import orderBase from "~/components/paper-work/order-base.vue";
import outgoingLetter from "~/components/paper-work/outgoing-letter.vue";
import incommingLetter from "~/components/paper-work/incomming-letter.vue";
import DocumentTypeGuid from "~/infrastructure/constants/documentFilterType.js";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import Toolbar from "~/components/paper-work/main-doc-form/toolbar-creating";
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
    powerOfAttorney,
    memo,
    addendum,
    simpleDocument,
    orderBase,
    outgoingLetter,
    Toolbar,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm,
    incommingLetter
  },
  async asyncData({ app, params }) {
    console.log(+params.id);
    await app.store.dispatch("currentDocument/getDocumentById", +params.id);
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
        value: this.$store.getters["currentDocument/document"].documentKindId,
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
        this.$store.dispatch("currentDocument/createDocument"),
        res => {
          this.$awn.success();
          if (close) this.$router.go(-1);
          else
            this.$router.push(
              `/paper-work/detail/${+this.$route.params.type}/${
                this.$store.getters["currentDocument/document"].id
              }`
            );
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
        case DocumentTypeGuid.IncomingLetter:
          this.$store.commit(
            "currentDocument/CURRENT_URL",
            dataApi.paperWork.IncommingLetterPut
          );
          return "incomming-letter";
        case DocumentTypeGuid.OutgoingLetter:
          this.$store.commit(
            "currentDocument/CURRENT_URL",
            dataApi.paperWork.OutgoingLetterPut
          );
          return "outgoing-letter";
        case DocumentTypeGuid.Order:
          this.$store.commit(
            "currentDocument/CURRENT_URL",
            dataApi.paperWork.OrderPut
          );
          return "order-base";
        case DocumentTypeGuid.CompanyDirective:
          this.$store.commit(
            "currentDocument/CURRENT_URL",
            dataApi.paperWork.CompanyDirectivePut
          );
          return "order-base";
        case DocumentTypeGuid.SimpleDocument:
          this.$store.commit(
            "currentDocument/CURRENT_URL",
            dataApi.paperWork.SimpleDocumentPut
          );
          return "simple-document";
        case DocumentTypeGuid.Addendum:
          this.$store.commit(
            "currentDocument/CURRENT_URL",
            dataApi.paperWork.AddendumPut
          );
          return "addendum";
        case DocumentTypeGuid.Memo:
          this.$store.commit(
            "currentDocument/CURRENT_URL",
            dataApi.paperWork.MemoPut
          );
          return "memo";
        case DocumentTypeGuid.PowerOfAttorney:
          this.$store.commit(
            "currentDocument/CURRENT_URL",
            dataApi.paperWork.PowerOfAttorneyPut
          );
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