<template>
  <div>
    <Toolbar
      :fieldIndex="focusedFieldIndex"
      :documentType="documentType"
    ></Toolbar>
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
            <DxGroupItem :col-span="6" :col-count="8">
              <DxSimpleItem
                :isRequired="true"
                :col-span="8"
                editorType="dxTextBox"
                :editorOptions="documentTypeOptions"
              >
                <DxLabel :text="$t('dinamicDocuments.fields.documentType')" />
              </DxSimpleItem>
              <DxSimpleItem
                :isRequired="true"
                :col-span="8"
                editorType="dxSelectBox"
                :editorOptions="documentFlowOptions"
              >
                <DxLabel :text="$t('dinamicDocuments.fields.docFlow')" />
              </DxSimpleItem>
              <DxGroupItem
                :col-span="8"
                :col-count="8"
                :caption="$t('dinamicDocuments.captions.dinamic')"
              >
                <DxSimpleItem
                  :col-span="8"
                  template="dinamic-document"
                ></DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
          </DxTab>
        </DxTabbedItem>
        <template #dinamic-document>
          <Dinamic-document
            :documentType="documentType"
            @onFocusField="setFocusIndex"
          ></Dinamic-document>
        </template>
      </DxForm>
      <transition name="fade">
        <CustomDrawer
          @close="() => setFocusIndex(null)"
          v-if="focusedFieldIndex !== null"
          class="item--drawer"
        >
          <Update-field
            slot="content"
            :documentType="documentType"
            :fieldIndex="focusedFieldIndex"
          ></Update-field>
        </CustomDrawer>
      </transition>
    </section>
  </div>
</template>

<script>
import CustomDrawer from "./components/custom-drawer";
import Toolbar from "./components/toolbar.vue";
import UpdateField from "./components/update-field.vue";
import DinamicDocument from "./components/dinamic-document.vue";

import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";

export default {
  components: {
    CustomDrawer,
    Toolbar,
    DinamicDocument,
    UpdateField,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm,
  },
  // props: {
  //   documentType: {
  //     default: "contructor",
  //   },
  // },
  provide: function () {
    return {
      trySaveDocumentType: this.trySave,
      documentValidatorName: this.documentValidatorName,
    };
  },
  data() {
    return {
      focusedFieldIndex: null,
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: false,
        swipeEnabled: false,
        loop: "true",
      },
    };
  },
  computed: {
    documentType() {
      return "contructor";
    },
    documentValidatorName() {
      return `DinamicDocument/${this.documentType}`;
    },
    isNew() {
      return this.$store.getters[
        `dinamicDocumentComponents/${this.documentType}/state`
      ]?.isNew;
    },
    documentFlowOptions() {
      return {
        showClearButton: true,
        valueExpr: "id",
        displayExpr: "name",
        onValueChanged: () => {
          /// setDocFlow
        },
        dataSource: this.$store.getters["docflow/docflow"](this),
        value: this.$store.getters[
          `dinamicDocumentComponents/${this.documentType}/components`
        ]?.docFlow,
      };
    },
    documentTypeOptions() {
      return {
        disabled: this.isNew,
        showClearButton: true,
        onValueChanged: () => {
          /// setDocumentType
        },
        value: this.$store.getters[
          `dinamicDocumentComponents/${this.documentType}/components`
        ],
      };
    },
  },
  methods: {
    async trySave() {
      if (this.$refs["form"].instance.validate().isValid) {
        if (this.isDataChanged) {
          await this.$awn.asyncBlock(
            this.$store.dispatch(`documents/${this.documentType}/save`)
          );
        }
        return true;
      } else {
        return false;
      }
    },
    setFocusIndex(index) {
      this.focusedFieldIndex = index;
    },
  },
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