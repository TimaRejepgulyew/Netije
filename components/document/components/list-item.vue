<template>
  <div class="custom-item d-flex align-center">
    <documentTypeGuidIcon :type="itemData && itemData.documentTypeGuid" />
    <div>
      <div>{{ itemData && itemData.name }}</div>
    </div>
  </div>
</template>
<script>
import documentTypeGuidIcon from "~/components/document/components/document-type-guid-icon.vue";
import { DxTextBox } from "devextreme-vue";
import userIcon from "~/components/Layout/userIcon.vue";
export default {
  components: {
    DxTextBox,
    userIcon,
    documentTypeGuidIcon
  },
  props: {
    itemData: {
      default: () => {}
    }
  }
};
</script>
<style lang="scss">
.small {
  font-size: 20px;
}
.custom-item {
  padding: 7px;
}
.grey {
  color: gray;
  font-size: 14px;
}
.dx-state-focused,
.dx-state-active {
  .grey {
    color: #fff;
    font-size: 14px;
  }
}
</style>
