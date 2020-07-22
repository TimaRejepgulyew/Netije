<template>
  <div>
    <Header  :headerTitle="generateHeaderTitle" :isbackButton="!isCard" :isNew="isNew"></Header>
    <toolbar @openVersion="openVersion"></toolbar>
    <div class="wrapper--relative">
      <DxForm
        :scrolling-enabled="true"
        class="mt-1"
        ref="form"
        :read-only="!canUpdate"
        :show-colon-after-label="true"
        :show-validation-summary="false"
        validation-group="OfficialDocument"
      >
        <DxTabbedItem :tab-panel-options="tabPanelOptions">
          <DxTab :col-count="12" :title="$t('document.tabs.main')">
            <DxGroupItem :col-span="8" :col-count="1" :caption="$t('document.groups.captions.main')">
              <DxSimpleItem data-field="name" :editor-options="nameOptions">
                <DxLabel location="left" :text="$t('document.fields.name')" />
                <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="documentKindId"
                :editor-options="documentKindOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel location="left" :text="$t('translations.fields.documentKindId')" />
                <DxRequiredRule :message="$t('translations.fields.documentKindIdRequired')" />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="subject"
                :editor-options="subjectOptions"
                editor-type="dxTextArea"
              >
                <DxLabel location="left" :text="$t('translations.fields.subject')" />
                <DxRequiredRule :message="$t('translations.fields.subjectRequired')" />
              </DxSimpleItem>
              <DxSimpleItem template="formByTypeGuid"></DxSimpleItem>
              <DxSimpleItem
                data-field="note"
                :editor-options="noteOptions"
                editor-type="dxTextArea"
              >
                <DxLabel location="left" :text="$t('translations.fields.note')" />
              </DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem :col-span="4">
              <DxSimpleItem template="registrationBlock"></DxSimpleItem>
              <DxGroupItem :caption="$t('document.groups.captions.lifeCycle')">
                <DxSimpleItem template="lifeCycle"></DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
          </DxTab>
          <DxTab :col-count="8" :title="$t('document.tabs.relations')" :disabled="isDataChanged">
            <DxSimpleItem :col-span="8" template="relation"></DxSimpleItem>
          </DxTab>
          <DxTab :col-count="8" :title="$t('document.tabs.history')" :disabled="isNew">
            <DxSimpleItem :col-span="8" template="history"></DxSimpleItem>
          </DxTab>
        </DxTabbedItem>
        <template #history>
          <History
            :entityTypeGuid="entityTypeGuid"
            :id="$store.getters['currentDocument/document'].id"
            slot="history"
          ></History>
        </template>
        <template #relation>
          <Relation></Relation>
        </template>
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
      <transition name="fade">
        <docVersion class="item--drawer" v-if="versionOpenState"></docVersion>
      </transition>
    </div>
  </div>
</template>
<script>
import { generateNameByDocTypeGuid } from "~/infrastructure/constants/documentType.js";
import Header from "~/components/page/page__header";
import lifeCycle from "~/components/paper-work/main-doc-form/life-cycle.vue";
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
import incomingInvoice from "~/components/paper-work/incoming-invoice.vue";
import supAgreement from "~/components/paper-work/sup-agreement.vue";
import contractStatement from "~/components/paper-work/contract-statement.vue";
import incomingTaxInvoice from "~/components/paper-work/incoming-tax-invoice.vue";
import outgoingTaxInvoice from "~/components/paper-work/outgoing-tax-invoice.vue";
import universalTransferDocument from "~/components/paper-work/universal-transfer-document.vue";
import waybill from "~/components/paper-work/waybill.vue";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import Toolbar from "~/components/paper-work/main-doc-form/toolbar";
import { mapToEntityType } from "~/infrastructure/constants/documentType.js";
import "devextreme-vue/text-area";
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";
import { DxDrawer } from "devextreme-vue";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxTabbedItem,
    DxTab,
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
    contract,
    incomingInvoice,
    supAgreement,
    contractStatement,
    incomingTaxInvoice,
    outgoingTaxInvoice,
    universalTransferDocument,
    waybill,
    Header,
    generateNameByDocTypeGuid
  },
  props: ["isCard"],
  head() {
    return {
      title: this.$store.getters["currentDocument/document"].name
    };
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
      versionOpenState: false,
      entityTypeGuid: mapToEntityType(
        this.$store.getters["currentDocument/document"].documentTypeGuid
      ),
      tabPanelOptions: { focusStateEnabled: false }
    };
  },
  methods: {
    openVersion() {
      this.versionOpenState = !this.versionOpenState;
    }
  },
  computed: {
    generateHeaderTitle() {
      if (this.$store.getters["currentDocument/isNew"]) {
        const key = this.$store.getters["currentDocument/document"]
          .documentTypeGuid;
        return generateNameByDocTypeGuid(key, this);
      }
      return this.$store.getters["currentDocument/document"].name;
    },
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
    canUpdate() {
      return this.$store.getters["currentDocument/canUpdate"];
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
        case DocumentTypeGuid.IncomingInvoice:
          return "incoming-invoice";
        case DocumentTypeGuid.SupAgreement:
          return "sup-agreement";
        case DocumentTypeGuid.ContractStatement:
          return "contract-statement";
        case DocumentTypeGuid.IncomingTaxInvoice:
          return "incoming-taxInvoice";
        case DocumentTypeGuid.OutgoingTaxInvoice:
          return "outgoing-tax-invoice";
        case DocumentTypeGuid.UniversalTransferDocument:
          return "universal-transfer-document";
        case DocumentTypeGuid.Waybill:
          return "waybill";
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
        readOnly: !this.canUpdate,
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
<style lang="scss" >
.wrapper--relative {
  position: relative;
  height: 100%;
  .item--drawer {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.dx-form-group-with-caption .dx-form-group.dx-form-group-with-caption {
  padding-left: 0px;
}
.mt-1 {
  margin-top: 10px;
}
.bg-white {
  width: 20%;
  background: white;
}
.fade-enter,
.fade-leave-to {
  transform: translateX(40vw);
}
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}
.right {
  display: flex;
  justify-content: space-between;
  .filter__header {
    justify-self: flex-start;
  }
}
</style>