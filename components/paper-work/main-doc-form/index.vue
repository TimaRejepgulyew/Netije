<template>
  <div class="wrapper-document">
    <Header headerTitle="headerTitle"></Header>
    <toolbar @openVersion="openVersion"></toolbar>
    <DxDrawer
      :animation-enabled="false"
      ref="version"
      opened-state-mode="overlap"
      position="right"
      reveal-mode="slide"
      :opened.sync="versionOpenState"
      template="attachmentBlock"
    >
      <template #attachmentBlock>
        <docVersion></docVersion>
      </template>

      <DxTabPanel :focus-state-enabled="false" class="tab-bar">
        <DxItem :title="$t('menu.mainInfo')" template="document-form" />
        <DxForm
          class="pd-2"
          slot="document-form"
          ref="form"
          :col-count="8"
          :show-colon-after-label="true"
          :show-validation-summary="false"
          validation-group="OfficialDocument"
        >
          <DxGroupItem :col-span="6" :col-count="1" :caption="$t('translations.fields.main')">
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
            <DxSimpleItem template="formByTypeGuid"></DxSimpleItem>
            <DxSimpleItem data-field="note" :editor-options="noteOptions" editor-type="dxTextArea">
              <DxLabel location="top" :text="$t('translations.fields.note')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxGroupItem :col-span="2">
            <DxSimpleItem template="registrationBlock"></DxSimpleItem>
            <DxGroupItem :caption="$t('document.lifeCycle')">
              <DxSimpleItem template="lifeCycle"></DxSimpleItem>
            </DxGroupItem>
          </DxGroupItem>
          <template #lifeCycle>
            <life-cycle />
          </template>
          <template #registrationBlock>
            <doc-registration></doc-registration>
          </template>
          <template #formByTypeGuid>
            <component :is="formByTypeGuid"></component>
          </template>
        </DxForm>
        <DxItem :title="$t('menu.relation')" :disabled="isDataChanged" template="relations" />
        <Relation slot="relations"></Relation>
        <DxItem :title="$t('menu.history')" :disabled="isNew" template="history" />
        <History
          :entityTypeGuid="entityTypeGuid"
          :id="$store.getters['currentDocument/document'].id"
          slot="history"
        ></History>
      </DxTabPanel>
    </DxDrawer>
  </div>
</template>
<script>
import lifeCycle from "~/components/paper-work/main-doc-form/life-cycle.vue";
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
import Relation from "~/components/paper-work/main-doc-form/relation";
import History from "~/components/page/history.vue";
import docVersion from "~/components/paper-work/main-doc-form/doc-version";
import docRegistration from "~/components/paper-work/main-doc-form/doc-registration";
import powerOfAttorney from "~/components/paper-work/power-of-attorney.vue";
import memo from "~/components/paper-work/memo.vue";
import addendum from "~/components/paper-work/addendum.vue";
import simpleDocument from "~/components/paper-work/simple-document.vue";
import orderBase from "~/components/paper-work/order-base.vue";
import outgoingLetter from "~/components/paper-work/outgoing-letter.vue";
import IncomingLetter from "~/components/paper-work/incoming-letter.vue";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import contract from "~/components/paper-work/contract.vue";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import Toolbar from "~/components/paper-work/main-doc-form/toolbar";
import { confirm } from "devextreme/ui/dialog";
import "devextreme-vue/text-area";
import Header from "~/components/page/page__header";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";
import { DxDrawer } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxDrawer,
    DxTabPanel,
    DxItem,
    Relation,
    History,
    docVersion,
    docRegistration,
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
    IncomingLetter,
    lifeCycle,
    contract
  },

  head() {
    return {
      title: this.$store.getters["currentDocument/document"].name
    };
  },
  mounted() {
    this.versionOpenState = false;
  },
  created() {
    if (this.$store.getters["currentDocument/isNew"]) {
      this.$store.commit("currentDocument/DATA_CHANGED", true);
    }
    this.$store.commit("currentDocument/SKIP_ROUTE_HANDLING", false);
    this.$store.commit("currentDocument/SKIP_DESTROY", false);
  },
  beforeDestroy() {
    this.$store.dispatch("currentDocument/destroyDocument");
  },
  data() {
    return {
      documentType: this.$store.getters["currentDocument/document"]
        .documentTypeGuid,
      versionOpenState: true,
      entityTypeGuid: EntityTypes.ElectronicDocument
    };
  },
  methods: {
    openVersion() {
      this.versionOpenState = !this.versionOpenState;
    }
  },
  computed: {
    documentKindOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentKind,
          filter: [
            ["documentTypeGuid", "=", this.documentType],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.$store.getters["currentDocument/document"].documentKindId,
        onValueChanged: e => {
          this.$store.dispatch("currentDocument/reevaluateDocumentName");
        },
        onSelectionChanged: e => {
          this.$store.dispatch(
            "currentDocument/setDocumentKind",
            e.selectedItem
          );
        }
      };
    },
    isRegistered() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    isDataChanged() {
      return this.$store.getters["currentDocument/isDataChanged"];
    },
    isNew() {
      return this.$store.getters["currentDocument/isNew"];
    },
    formByTypeGuid() {
      switch (this.documentType) {
        case DocumentTypeGuid.IncomingLetter:
          return "incoming-letter";
        case DocumentTypeGuid.OutgoingLetter:
          return "outgoing-letter";
        case DocumentTypeGuid.Order:
        case DocumentTypeGuid.CompanyDirective:
          return "order-base";
        case DocumentTypeGuid.SimpleDocument:
          return "simple-document";
        case DocumentTypeGuid.Addendum:
          return "addendum";
        case DocumentTypeGuid.Memo:
          return "memo";
        case DocumentTypeGuid.PowerOfAttorney:
          return "power-of-attorney";
        case DocumentTypeGuid.Contract:
          return "contract";
      }
    },
    nameOptions() {
      return {
        value: this.$store.getters["currentDocument/document"].name,
        disabled:
          this.$store.getters["currentDocument/document"].documentKind
            ?.generateDocumentName || this.isRegistered,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_NAME", e.value);
        }
      };
    },
    subjectOptions() {
      return {
        readOnly: this.isRegistered,
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
<style >
.wrapper-document {
  min-height: 100vh;
}
.tab-bar {
  margin-top: 10px;
  height: 100%;
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
.dx-form-group-with-caption .dx-form-group.dx-form-group-with-caption {
  padding-left: 0px;
}
.pd-2 {
  padding: 10px;
}
.bg-white {
  width: 20%;
  background: white;
}
</style>