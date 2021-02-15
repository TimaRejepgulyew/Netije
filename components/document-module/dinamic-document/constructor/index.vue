<template>
  <div>
    <!-- <Toolbar></Toolbar> -->
    <section>
      <DxForm
        :scrolling-enabled="true"
        class="mt-1"
        ref="form"
        :show-colon-after-label="true"
        :show-validation-summary="false"
      >
        <DxTabbedItem :tab-panel-options="tabPanelOptions">
          <DxTab :col-count="12" :title="$t('document.tabs.main')">
            <DxGroupItem
              :col-span="8"
              :col-count="1"
              :caption="$t('document.groups.captions.main')"
            >
              <DxSimpleItem template="dinamic-document"></DxSimpleItem>
            </DxGroupItem>
          </DxTab>
        </DxTabbedItem>
        <template #dinamic-document>
          <dinamic-document></dinamic-document>
        </template>
      </DxForm>
    </section>
  </div>
</template>

<script>
import dinamicDocument from "./components/dinamic-document.vue";
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
    dinamicDocument,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm,
  },
  data() {
    return {
      tabPanelOptions: {
        focusStateEnabled: false,
        animationEnabled: false,
        swipeEnabled: false,
        loop: "true",
      },
    };
  },
};
</script>

<style>
</style>