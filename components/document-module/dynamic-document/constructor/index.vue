<template>
  <div>
    <Toolbar @close="close" :fieldIndex="focusedFieldIndex" :documentType="documentType"></Toolbar>
    <section class="wrapper--relative">
      <DxForm
        :scrolling-enabled="true"
        class="mt-1"
        ref="form"
        :show-colon-after-label="true"
        :show-validation-summary="false"
        :validation-group="documentValidatorName"
      >
        <DxTabbedItem :tab-panel-options="tabPanelOptions">
          <DxTab :col-count="6">
            <DxGroupItem :col-span="4" :col-count="8">
              <DxSimpleItem
                :isRequired="true"
                :col-span="8"
                editorType="dxTextBox"
                :editorOptions="documentTypeOptions"
              >
                <DxLabel :text="$t('dynamicDocuments.fields.documentType')" />
              </DxSimpleItem>
              <DxSimpleItem
                :isRequired="true"
                :col-span="8"
                editorType="dxSelectBox"
                :editorOptions="documentFlowOptions"
              >
                <DxLabel :text="$t('dynamicDocuments.fields.docFlow')" />
              </DxSimpleItem>
              <DxGroupItem
                :col-span="8"
                :col-count="8"
                :caption="$t('dynamicDocuments.captions.dynamic')"
              >
                <DxSimpleItem :col-span="8" template="dynamic-document"></DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
          </DxTab>
        </DxTabbedItem>
        <template #dynamic-document>
          <dynamic-document :documentType="documentType" @onFocusField="setFocusIndex"></dynamic-document>
        </template>
      </DxForm>
      <transition name="fade">
        <CustomDrawer
          @close="() => setFocusIndex(null)"
          v-if="focusedFieldIndex !== null"
          class="item--drawer"
        >
          <Update-field slot="content" :documentType="documentType" :fieldIndex="focusedFieldIndex"></Update-field>
        </CustomDrawer>
      </transition>
    </section>
  </div>
</template>

<script>
import CustomDrawer from "./components/custom-drawer";
import Toolbar from "./components/toolbar.vue";
import UpdateField from "./components/update-field.vue";
import dynamicDocument from "./components/dynamic-document.vue";

import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";

import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";

export default {
  components: {
    CustomDrawer,
    Toolbar,
    dynamicDocument,
    UpdateField,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm
  },
  props: {
    documentType: {
      default: "constructor"
    }
  },
  provide: function() {
    return {
      trySaveDocumentType: this.trySave,
      documentValidatorName: null
    };
  },
  data() {
    return {
      focusedFieldIndex: null,
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: false,
        swipeEnabled: false,
        loop: "true"
      }
    };
  },
  computed: {
    documentValidatorName() {
      return `DynamicDocument/${this.documentType}`;
    },
    isNew() {
      return this.$store.getters[
        `dynamicDocumentComponents/${this.documentType}/isNew`
      ];
    },
    documentFlowOptions() {
      return {
        showClearButton: true,
        valueExpr: "id",
        displayExpr: "name",
        dataSource: this.$store.getters["docflow/docflow"](this),
        disabled: !this.isNew,
        value: this.$store.getters[
          `dynamicDocumentComponents/${this.documentType}/docFlow`
        ],
        onValueChanged: e => {
          this.$store.commit(
            `dynamicDocumentComponents/${this.documentType}/ChangeDocFlow`,
            e.value
          );
        }
      };
    },
    documentTypeOptions() {
      return {
        disabled: !this.isNew,
        showClearButton: true,
        value: this.$store.getters[
          `dynamicDocumentComponents/${this.documentType}/docType`
        ],
        onValueChanged: e => {
          this.$store.commit(
            `dynamicDocumentComponents/${this.documentType}/ChangeDocType`,
            e.value
          );
        }
      };
    }
  },
  methods: {
    trySave() {
      if (this.$refs["form"].instance.validate().isValid) {
        this.$awn.asyncBlock(
          DynamicTypeControler.saveType(this, this.documentType),
          e => {
            this.$awn.success();
          },
          e => {
            this.$awn.alert();
          }
        );
      }
    },
    close() {
      this.$router.go(-1);
    },
    setFocusIndex(index) {
      this.focusedFieldIndex = index;
    }
  },
  created() {
    DynamicTypeControler.generateStore(this, this.documentType);
  },
  beforeDestroy() {
    DynamicTypeControler.removeStore(this, this.documentType);
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.wrapper--relative {
  position: relative;
  min-height: 84vh;
  overflow: hidden;
  .item--drawer {
    box-sizing: border-box;
    border: 1px solid $base-border-color;
    border-radius: 5px;
    position: fixed;
    min-height: 94vh;
    width: 555px;
    bottom: 0;
    right: 0;
  }
  .fade-enter,
  .fade-leave-to {
    transform: translateX(40vw);
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: transform 0.5s;
  }
}
</style>