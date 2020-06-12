<template>
  <div class="d-flex">
    <DxTextBox :placeholder="$t('shared.select')" :value="fieldData && fieldData.name" />
    <parties-btn
      v-if="$store.getters['permissions/allowReading'](EntityType.Counterparty)"
      :notPerson="notPerson"
      @valueChanged="valueChanged"
      :type="fieldData ? fieldData.type:null"
      :counterpartId="fieldData ? fieldData.id:null"
    />
  </div>
</template>
<script>
import EntityType from "~/infrastructure/constants/entityTypes";
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
  data() {
    return {
      EntityType
    };
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
    }
  }
};
</script>