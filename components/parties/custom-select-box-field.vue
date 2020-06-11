<template>
  <div class="d-flex">
    <DxTextBox :placeholder="$t('shared.select')" :value="fieldData && fieldData.name" />
    <parties-btn
      :notPerson="notPerson"
      @setCounterPart="setCounterPart"
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
    notPerson: {},
    fieldData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    setCounterPart(data) {
      this.$emit("setCounterPart", { selectedItem: data });
    }
  }
};
</script>