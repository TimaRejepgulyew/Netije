<template>
  <div>
    <Header
      :headerTitle="headerTitle"
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
        :read-only="canUpdate"
        :show-colon-after-label="true"
        :show-validation-summary="false"
        :validation-group="documentValidatorName"
      >
        <DxTabbedItem :tab-panel-options="tabPanelOptions">
          <DxTab :col-count="12" :title="$t('document.tabs.main')">
            <DxGroupItem
              :col-span="6"
              :caption="$t('document.groups.captions.main')"
            >
              <DxSimpleItem :col-count="1" template="main-form"></DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem
              :col-span="6"
              :caption="$t('document.groups.captions.params')"
            >
              <DxSimpleItem
                :col-count="1"
                template="params-form"
              ></DxSimpleItem>
            </DxGroupItem>
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.relations')"
            :disabled="isDataChanged"
          >
            <!-- <DxSimpleItem :col-span="8" template="relation"></DxSimpleItem> -->
          </DxTab>
          <DxTab
            :col-count="8"
            :title="$t('document.tabs.history')"
            :disabled="isNew"
          >
            <DxSimpleItem :col-span="8" template="history"></DxSimpleItem>
          </DxTab>
        </DxTabbedItem>
        <template #history>
          <History
            :entityTypeGuid="entityTypeGuid"
            :id="documentId"
            slot="history"
          ></History>
        </template>
        <template #main-form>
          <main-form :documentId="documentId" :isCard="isCard"></main-form>
        </template>
        <template #params-form>
          <paramsForm :documentId="documentId" :isCard="isCard"></paramsForm>
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
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";
import { unload } from "~/infrastructure/services/documentService.js";
import dataApi from "~/static/dataApi";
import toolbar from "./card-components/toolbar.vue";
import Header from "~/components/page/page__header";
import History from "~/components/page/history.vue";
import docVersion from "~/components/document-module/main-doc-form/doc-version";
import mainForm from "./card-components/main-form.vue";
import paramsForm from "./card-components/params-form.vue";
export default {
  components: {
    toolbar,
    Header,
    History,
    docVersion,
    DxForm,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    mainForm,
    paramsForm
  },
  props: ["documentId", "isCard"],
  data() {
    return {
      versionOpenState: false,
      entityTypeGuid: 234,
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: false,
        swipeEnabled: false,
        loop: "true"
      },
      documentValidatorName: `OfficialDocument/${this.documentId}`
    };
  },
  destroyed() {
    unload(this, this.documentId);
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
          await this.$awn.asyncBlock;
          this.$store.dispatch(`documents/${this.documentId}/save`)();
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
    headerTitle() {
      return this.document.name || this.$t("document.header.documentTemplate");
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    isNew() {
      return this.$store.getters[`documents/${this.documentId}/isNew`];
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    isDataChanged() {
      return this.$store.getters[`documents/${this.documentId}/isDataChanged`];
    },
    isNew() {
      return this.$store.getters[`documents/${this.documentId}/isNew`];
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
.fade-enter,
.fade-leave-to {
  transform: translateX(40vw);
}
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s;
}
</style>
