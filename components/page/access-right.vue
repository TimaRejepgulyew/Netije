<template>
  <div>
    <DxPopup
      :visible.sync="popup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :position="{ my: 'top', at: 'top' }"
      :show-title="true"
      :width="800"
      :height="'auto'"
      :title="$t('translations.fields.accessRightDocument')"
    >
      <div>
        <access-right-list v-if="popup" :url="url" />
      </div>
    </DxPopup>
    <DxButton icon="key" :on-click="showPopup" :text="$t('shared.access')" />
  </div>
</template>

<script>
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
import accessRightList from "~/components/page/access-right-list.vue";
export default {
  components: {
    DxButton,
    DxPopup,
    accessRightList
  },
  props: ["url"],
  data() {
    return {
      popup: false
    };
  },
  methods: {
    showPopup() {
      this.popup = true;
    }
  }
};
</script>

<style>
</style>