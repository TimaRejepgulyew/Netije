<template>
  <div>
    <div class="dx-field">
      <div class="dx-field-label">{{ $t("paperWork.reports.beginDate") }}</div>
      <div class="dx-field-value">
        <DxDateBox :value="beginingDate" type="date" />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">{{ $t("paperWork.reports.endDate") }}</div>
      <div class="dx-field-value">
        <DxDateBox :value="endDate" type="date" />
      </div>
    </div>
    <div class="dx-field">
      <div class="dx-field-label">{{ $t("paperWork.reports.journal") }}</div>
      <div class="dx-field-value"></div>
    </div>
    <div class="dx-field">
      <div class="dx-field-value">
        <DxButton
          :width="120"
          horizontal-alignment="right"
          text="Получить"
          type="normal"
          styling-mode="contained"
          @click="onClick($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DxDateBox from "devextreme-vue/date-box";
import DxButton from "devextreme-vue/button";

export default {
  components: {
    DxDateBox,
    DxButton,
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      beginingDate: null,
      endDate: null,
      license: null,
    };
  },
  methods: {},
  async created() {
    console.log(this.options);
    this.$emit("showTitle", this.$t(this.options.popupTitle));
    this.$emit("loadStatus");
  },
};
</script>

<style lang="scss">
</style>
