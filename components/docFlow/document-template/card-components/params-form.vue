<template>
  <div>
    <DxDataGrid
      :data-source="data"
      @rowUpdated="e => rowUpdated(e)"
      :remote-operations="false"
      :allow-column-reordering="false"
      :row-alternation-enabled="false"
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
        data-field="dataSource"
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
      data: this.$store.getters[`documents/${this.documentId}/parameters`]
    };
  },
  methods: {
    rowUpdated(e) {
      const payload = JSON.parse(JSON.stringify(this.data.slice()));
      this.$store.commit(
        `documents/${this.documentId}/SET_PARAMETERS`,
        payload
      );
    },
    customizeText(cellInfo) {
      if (cellInfo.value) return "> " + cellInfo.value.split(".").join(" > ");
      else return "";
    }
  },
  computed: {
    nameOptions() {
      return {
        readOnly: true
      };
    },
    parameters() {
      return this.$store.getters[`documents/${this.documentId}/document`]
        .parameters;
    }
  },
  watch: {
    parameters: function(newValue) {
      this.data = JSON.parse(JSON.stringify(newValue.slice()));
    }
  }
};
</script>

<style></style>
