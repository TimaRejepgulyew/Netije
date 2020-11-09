<template>
  <div>
    <DxDataGrid
      :data-source="data"
      @rowUpdated="e => rowUpdated(e)"
      :remote-operations="false"
      :allow-column-reordering="true"
      :row-alternation-enabled="true"
      :showColumnLines="false"
      :showRowLines="false"
    >
      <DxEditing
        :allow-adding="false"
        :allow-updating="true"
        :useIcons="true"
        mode="row"
      />
      <DxColumn
        :allowEditing="false"
        :fixed="true"
        data-field="name"
        :caption="$t('document.fields.name')"
      />
      <DxColumn
        :customizeText="customizeText"
        data-field="value"
        :caption="$t('document.fields.value')"
      >
        <DxPatternRule
          :pattern="/^[^\.:\s+]\S+[^\.:\s+]$/"
          :message="$t('document.validation.paramsValueRule')"
        />
        <DxRequiredRule
          :message="$t('document.validation.paramsValueRequired')"
        />
      </DxColumn>
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxRequiredRule,
  DxPatternRule,
  DxButton
} from "devextreme-vue/data-grid";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxRequiredRule,
    DxPatternRule,
    DxButton
  },
  props: ["documentId", "isCard"],

  data() {
    return {
      data: this.$store.getters[`documents/${this.documentId}/params`]
    };
  },
  methods: {
    rowUpdated(e) {
      const payload = JSON.parse(JSON.stringify(this.data.slice()));
      this.$store.commit(`documents/${this.documentId}/SET_PARAM`, payload);
    },
    customizeText(cellInfo) {
      return "> " + cellInfo.value.split(".").join(" > ");
    }
  },
  computed: {
    nameOptions() {
      return {
        readOnly: true
      };
    }
  }
};
</script>

<style></style>
