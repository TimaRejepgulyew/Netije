<template>
  <div class="d-flex">
    <DxTextBox :placeholder="$t('shared.select')" :value="fieldData && fieldData.name" />
    <parties-btn
      :type="fieldData ? fieldData.type:null"
      :counterpartId="fieldData ? fieldData.id:null"
    />
  </div>
</template>
<script>
import partiesBtn from "~/components/parties/custom-select-box-btn.vue";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    partiesBtn
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>