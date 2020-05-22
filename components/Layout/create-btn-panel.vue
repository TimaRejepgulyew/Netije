<template>
  <div class="navBar">
    <DxPopup
      :visible.sync="isCreateListPopupOpen"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      :height="'auto'"
      position="top"
      :title="$t('buttons.create')"
    >
      <div>
        <create-list v-if="isCreateListPopupOpen" @hidePopup="hidePopup" />
      </div>
    </DxPopup>
    <DxButton :text="$t('buttons.create')" icon="plus" :onClick="showCreateList"></DxButton>
  </div>
</template>

<script>
import dataApi from "~/static/dataApi";
import { confirm } from "devextreme/ui/dialog";
import { DxPopup } from "devextreme-vue/popup";
import CreateList from "~/components/Layout/create-list.vue";
import Docflow from "~/infrastructure/constants/docflows";
import EntityType from "~/infrastructure/constants/entityTypes";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup,
    CreateList
  },

  data() {
    return {
      isCreateListPopupOpen: false
    };
  },
  methods: {
    hidePopup() {
      this.isCreateListPopupOpen = false;
    },
    showCreateList() {
      this.isCreateListPopupOpen = true;
    }
  },
  computed: {}
};
</script>