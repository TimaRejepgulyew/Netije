<template>
  <div>
    <DxDataGrid
      :data-source="data"
      @rowUpdating="(e) => rowUpdating(e)"
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
          :pattern="/(^\.|\S)$/"
          :message="$t('document.validation.patternRule')"
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
  DxPatternRule,
  DxButton,
} from "devextreme-vue/data-grid";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxPatternRule,
    DxButton,
  },
  props: ["documentId", "isCard"],
  data() {
    return {
      data: [
        ...this.$store.getters[`documents/${this.documentId}/document`].params,
      ],
    };
  },
  methods: {
    rowUpdating(e) {
      console.log(e);
      this.$store.commit(`documents/${this.documentId}/SET_PARAM`, {
        name: e.key.name,
        value: e.newData.value,
      });
    },
    customizeText(cellInfo) {
      return "> " + cellInfo.value.split(".").join(" > ");
    },
  },
  computed: {
    nameOptions() {
      return {
        readOnly: true,
      };
    },
    // params() {
    //   return this.$store.getters[`documents/${this.documentId}/document`]
    //     .params;
    // },
  },
};
</script>

<style>
</style>