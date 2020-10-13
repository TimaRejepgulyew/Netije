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
        caption="name"
      />
      <DxColumn
        :customizeText="customizeText"
        data-field="value"
        caption="value"
      />
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxScrolling,
  DxButton,
} from "devextreme-vue/data-grid";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxButton,
  },
  props: ["documentId", "isCard"],
  data() {
    return {
      data: [{ name: "wdawdaw", value: "tes.test" }],
    };
  },
  methods: {
    rowUpdating(e) {
      e.cancel = true;
      console.log(e);
      e.cancel = false;
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