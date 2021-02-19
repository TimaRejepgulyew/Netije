<template>
  <div v-if="builder">
    <Toolbar :fieldIndex="focusedFieldIndex" :storeId="storeId"></Toolbar>
    <section class="wrapper--relative">
      <DxForm
        :scrolling-enabled="true"
        class="mt-1"
        ref="form"
        :show-colon-after-label="true"
        :show-validation-summary="false"
      >
        <DxTabbedItem :tab-panel-options="tabPanelOptions">
          <DxTab :col-count="6">
            <DxGroupItem :col-span="4" :col-count="8">
              <DxGroupItem
                :col-span="8"
                :col-count="8"
                :caption="$t('dinamicDocuments.captions.static')"
              >
                <DxSimpleItem :col-span="8" template="static-field"></DxSimpleItem>
              </DxGroupItem>
              <DxGroupItem
                :col-span="8"
                :col-count="8"
                :caption="$t('dinamicDocuments.captions.dinamic')"
              >
                <DxSimpleItem :col-span="8" template="dinamic-document"></DxSimpleItem>
              </DxGroupItem>
            </DxGroupItem>
            <DxGroupItem :col-span="2" :col-count="1">
              <DxSimpleItem template="registrationBlock"></DxSimpleItem>
              <DxSimpleItem template="lifeCycle"></DxSimpleItem>
            </DxGroupItem>
          </DxTab>
        </DxTabbedItem>
        <template #registrationBlock>
          <Registrationblock :readOnly="true"></Registrationblock>
        </template>
        <template #lifeCycle>
          <LifeCycleBlock :readOnly="true"></LifeCycleBlock>
        </template>
        <template #dinamic-document>
          <Dinamic-document :items="builder.elements" @onFocusField="setFocusIndex"></Dinamic-document>
        </template>
        <template #static-field>
          <StaticField :readOnly="true"></StaticField>
        </template>
      </DxForm>
      <transition name="fade">
        <CustomDrawer
          @close="() => setFocusIndex(null)"
          v-if="focusedFieldIndex !== null"
          class="item--drawer"
        >
          <Update-field slot="content" :storeId="storeId" :filedIndex="focusedFieldIndex"></Update-field>
        </CustomDrawer>
      </transition>
    </section>
  </div>
</template>

<script>
import CustomDrawer from "./components/custom-drawer";
import Toolbar from "./components/toolbar.vue";
import StaticField from "../../components/static-field-document.vue";
import UpdateField from "./components/update-field.vue";
import DinamicDocument from "./components/dinamic-document.vue";
import Registrationblock from "../../main-doc-form/doc-registration";
import LifeCycleBlock from "./components/life-cycle-block";
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";

import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";
export default {
  components: {
    CustomDrawer,
    Registrationblock,
    LifeCycleBlock,
    Toolbar,
    StaticField,
    DinamicDocument,
    UpdateField,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm
  },
  data() {
    return {
      focusedFieldIndex: null,
      storeId: "constructor",
      builder: null,
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: false,
        swipeEnabled: false,
        loop: "true"
      }
    };
  },
  methods: {
    setFocusIndex(id) {
      console.log("id", id);
      this.focusedFieldIndex = id;
    },

    removeElement() {
      DinamicTypeControler.removeElement(
        this,
        this.builder.id,
        this.focusedFieldIndex
      );
    }
  },
  created() {
    this.builder = new DinamicTypeControler(this);
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