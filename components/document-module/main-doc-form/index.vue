<template>
  <div>
    <Header
      :headerTitle="generateHeaderTitle"
      :isbackButton="!isCard"
      :isNew="isNew"
    ></Header>
    <toolbar
      :documentId="documentId"
      :isCard="isCard"
      @onClose="onClose"
      @openVersion="openVersion"
      @onRemove="onRemove"
    ></toolbar>
    <div class="wrapper--relative">
      <DxForm
        :scrolling-enabled="true"
        class="mt-1"
        ref="form"
        :read-only="!canUpdate"
        :show-colon-after-label="true"
        :show-validation-summary="false"
        :validation-group="documentValidatorName"
      >
        <DxTabbedItem :tab-panel-options="tabPanelOptions">
          <DxTab :col-count="12" :title="$t('document.tabs.main')">
            <DxGroupItem
              :col-span="8"
              :col-count="1"
              :caption="$t('document.groups.captions.main')"
            >
              <DxSimpleItem data-field="name" :editor-options="nameOptions">
                <DxLabel location="left" :text="$t('document.fields.name')" />
                <DxRequiredRule
                  :message="$t('document.validation.nameRequired')"
                />
              </DxSimpleItem>
              <DxSimpleItem
                data-field="documentKindId"
                :editor-options="documentKindOptions"
                editor-type="dxSelectBox"
              >
                <DxLabel
                  location="left"
                  :text="$t('document.fields.documentKindId')"
                />
                <DxRequiredRule
                  :message="$t('document.validation.documentKindIdRequired')"
                />
              </DxSimpleItem>

              <DxSimpleItem
                data-field="subject"
                :editor-options="subjectOptions"
                editor-type="dxTextArea"
              >
                <DxLabel
                  location="left"
                  :text="$t('document.fields.subject')"
                />
                <DxRequiredRule
                  :message="$t('document.validation.subjectRequired')"
                />
              </DxSimpleItem>
              <DxSimpleItem template="formByTypeGuid"></DxSimpleItem>
              <DxSimpleItem
                data-field="note"
                :editor-options="noteOptions"
                editor-type="dxTextArea"
              >
                <DxLabel location="left" :text="$t('document.fields.note')" />
              </DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem :col-span="4">
              <DxSimpleItem template="registrationBlock"></DxSimpleItem>
              <DxGroupItem :caption="$t('document.groups.captions.lifeCycle')">
                <DxSimpleItem template="lifeCycle"></DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.relations')"
            :disabled="isDataChanged"
          >
            <DxSimpleItem :col-span="8" template="relation"></DxSimpleItem>
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.history')"
            :disabled="isNew"
          >
            <DxSimpleItem :col-span="8" template="history"></DxSimpleItem>
          </DxTab>
           <DxTab
            :col-count="8"
            :title="$t('document.tabs.documentTasks')"
            :disabled="isNew"
          >
            <DxSimpleItem :col-span="8" template="documentTasks"></DxSimpleItem>
          </DxTab>
        </DxTabbedItem>
        <template #history>
          <History
            :entityTypeGuid="entityTypeGuid"
            :id="documentId"
            slot="history"
          ></History>
        </template>
        <template #relation>
          <Relation :documentId="documentId" :isCard="isCard"></Relation>
        </template>
        <template #documentTasks>
          <document-tasks :documentId="documentId" :isCard="isCard" />
        </template>
        <template #lifeCycle>
          <life-cycle :documentId="documentId" :isCard="isCard" />
        </template>
        <template #registrationBlock>
          <doc-registration
            :documentId="documentId"
            :isCard="isCard"
          ></doc-registration>
        </template>
        <template #formByTypeGuid>
          <component
            :documentId="documentId"
            :isCard="isCard"
            :is="formByTypeGuid"
          ></component>
        </template>
      </DxForm>
      <transition name="fade">
        <docVersion
          :documentId="documentId"
          :isCard="isCard"
          class="item--drawer"
          v-if="versionOpenState"
        ></docVersion>
      </transition>
    </div>
  </div>
</template>
<script>
import documentTasks from "~/components/document-module/main-doc-form/document-tasks.vue";
import { unload } from "~/infrastructure/services/documentService.js";
import DocumentType from "~/infrastructure/models/DocumentType.js";
import Header from "~/components/page/page__header";
import lifeCycle from "~/components/document-module/main-doc-form/life-cycle.vue";
import Relation from "~/components/document-module/main-doc-form/relation";
import History from "~/components/page/history.vue";
import docVersion from "~/components/document-module/main-doc-form/doc-version";
import docRegistration from "~/components/document-module/main-doc-form/doc-registration";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import EntityTypes from "~/infrastructure/constants/entityTypes.js";
import Toolbar from "~/components/document-module/main-doc-form/toolbar/index";
import * as documentTypeComponent from "~/components/document-module/document-type-components/index.js";
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
import dataApi from "~/static/dataApi";
export default {
  components: {
    ...documentTypeComponent,
    DxTabbedItem,
    DxTab,
    Relation,
    History,
    docVersion,
    docRegistration,
    Toolbar,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm,
    lifeCycle,
    Header,
    documentTasks
  },
  destroyed() {
    unload(this, this.documentId);
  },
  props: ["isCard", "documentId"],
  head() {
    return {
      title: this.$store.getters[`documents/${this.documentId}/document`].name
    };
  },
  provide: function() {
    return {
      trySaveDocument: this.trySave,
      documentValidatorName: this.documentValidatorName
    };
  },
  created() {
    if (this.isNew) {
      this.$store.commit(`documents/${this.documentId}/DATA_CHANGED`, true);
    }
    this.$store.commit(
      `documents/${this.documentId}/SKIP_ROUTE_HANDLING`,
      false
    );
  },
  data() {
    return {
      versionOpenState: false,
      entityTypeGuid: mapToEntityType(
        this.$store.getters[`documents/${this.documentId}/document`]
          .documentTypeGuid
      ),
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: true,
        swipeEnabled: true,
        loop: "true"
      },
      documentValidatorName: `OfficialDocument/${this.documentId}`
    };
  },
  methods: {
    onRemove() {
      this.$emit("onRemove", this.documentId);
      this.$emit("onClose", this.documentId);
    },
    onClose() {
      this.$emit("onClose", this.documentId);
    },
    async trySave() {
      if (this.$refs["form"].instance.validate().isValid) {
        if (this.isDataChanged) {
          await this.$awn.asyncBlock(
            this.$store.dispatch(`documents/${this.documentId}/save`)
          );
        }
        return true;
      } else {
        return false;
      }
    },
    openVersion() {
      this.versionOpenState = !this.versionOpenState;
    }
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    isNew() {
      return this.$store.getters[`documents/${this.documentId}/isNew`];
    },
    generateHeaderTitle() {
      if (this.isNew) {
        return new DocumentType(this).getById(this.document.documentTypeGuid)
          .text;
      }
      return this.document.name;
    },
    documentKindOptions() {
      return {
        readOnly: this.isRegistered,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentKind,
          filter: [
            ["documentTypeGuid", "=", this.document.documentTypeGuid],
            "and",
            ["status", "=", 0]
          ]
        }),
        value: this.document.documentKindId,
        onValueChanged: e => {
          this.$store.dispatch(
            `documents/${this.documentId}/reevaluateDocumentName`
          );
        },
        onSelectionChanged: e => {
          this.$store.dispatch(
            `documents/${this.documentId}/setDocumentKind`,
            e.selectedItem
          );
        }
      };
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    isDataChanged() {
      return this.$store.getters[`documents/${this.documentId}/isDataChanged`];
    },
    isNew() {
      return this.$store.getters[`documents/${this.documentId}/isNew`];
    },
    formByTypeGuid() {
      switch (this.document.documentTypeGuid) {
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
        value: this.document.name,
        disabled:
          this.document.documentKind?.generateDocumentName || this.isRegistered,
        onValueChanged: e => {
          this.$store.commit(`documents/${this.documentId}/SET_NAME`, e.value);
        }
      };
    },
    subjectOptions() {
      return {
        readOnly: this.isRegistered,
        value: this.document.subject,
        onValueChanged: e => {
          this.$store.dispatch(
            `documents/${this.documentId}/setSubject`,
            e.value
          );
        }
      };
    },
    noteOptions() {
      return {
        readOnly: !this.canUpdate,
        value: this.document.note,
        height: 70,
        autoResizeEnabled: true,
        onValueChanged: e => {
          this.$store.commit(`documents/${this.documentId}/SET_NOTE`, e.value);
        }
      };
    }
  }
};
</script>
<style lang="scss">
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
.toolbar--sticky {
  position: sticky;
  top: 0;
}
</style>
