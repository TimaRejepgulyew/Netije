<template>
  <div>
    <DxPopup
      :visible.sync="popup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :position="{ my: 'top', at: 'top' }"
      :show-title="true"
      width="60%"
      :height="'auto'"
      :title="$t('shared.accessRight')"
    >
      <div>
        <access-right-list v-if="popup" :entity-type="entityType" :entity-id="entityId" />
      </div>
    </DxPopup>
    <DxButton :icon="icon" :on-click="showPopup" :hint="$t('shared.access')" />
  </div>
</template>

<script>
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
import accessRightList from "~/components/page/access-right-list.vue";
import icon from "~/static/icons/access-right.svg";
export default {
  components: {
    DxButton,
    DxPopup,
    accessRightList
  },
  props: ["entityType", "entityId"],
  data() {
    return {
      icon,
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