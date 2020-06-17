<template>
  <DxDropDownButton
    class="text-left"
    :text="$t('buttons.createRelation')"
    :hint="$t('buttons.createRelation')"
    :use-select-mode="true"
    width="100%"
    icon="overflow"
    :showArrowIcon="false"
    :drop-down-options="{ width: 230 }"
    :items="lifeCycleItem"
    display-expr="name"
    @item-click="onItemClick"
  />
</template>

<script>
import { genereteLifeCycleItem } from "~/infrastructure/services/documentService.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  created() {
    console.log(this.lifeCycleItem);
  },
  data() {
    return {
      lifeCycleItem: genereteLifeCycleItem(
        this,
        this.$store.getters["currentDocument/document"].documentTypeGuid
      )
    };
  },
  methods: {
    onItemClick() {
      console.log("lifecycle click");
    }
  }
};
</script>
