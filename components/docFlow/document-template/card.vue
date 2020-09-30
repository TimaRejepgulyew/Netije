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
            <DxSimpleItem
              :col-span="6"
              :col-count="1"
              template="main-form"
            ></DxSimpleItem>
            <DxSimpleItem
              :col-span="6"
              :col-count="1"
              template="params-form"
            ></DxSimpleItem>
            <!-- <DxGroupItem
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
            </DxGroupItem> -->
            <!-- <DxGroupItem :col-span="4">
              <DxSimpleItem template="registrationBlock"></DxSimpleItem>
            </DxGroupItem> -->
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
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
import toolbar from "./card-components/toolbar.vue";
import Header from "~/components/page/page__header";
import History from "~/components/page/history.vue";
import docVersion from "~/components/document-module/main-doc-form/doc-version";
export default {
  components: {
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
  },
  props: ["documentId", "isCard"],
  data() {
    return {
      versionOpenState: false,
      entityTypeGuid: 234,
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: true,
        swipeEnabled: true,
        loop: "true",
      },
      documentValidatorName: `documentTemplate/${this.documentId}`,
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
            // this.$store.dispatch(`documents/${this.documentId}/save`)
          );
        }
        return true;
      } else {
        return false;
      }
    },
    openVersion() {
      this.versionOpenState = !this.versionOpenState;
    },
  },
};
</script>

<style>
</style>