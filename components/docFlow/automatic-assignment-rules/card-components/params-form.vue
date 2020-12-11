<template>
  <div>
    <DxDataGrid
      :data-source="members"
      :remote-operations="false"
      :allow-column-reordering="true"
      :row-alternation-enabled="true"
      :showColumnLines="false"
      :showRowLines="false"
      @rowUpdated="rowUpdated"
    >
      <DxEditing
        :allow-adding="true"
        :allow-deleting="true"
        :allow-updating="true"
        :useIcons="true"
        mode="row"
      />
      <DxColumn
        :fixed="true"
        data-field="id"
        :caption="$t('docFlow.automaticAssignmentRules.fields.name')"
      >
        <DxLookup :data-source="recipientStore" value-expr="id" display-expr="name" />
      </DxColumn>
      <DxColumn
        data-field="rightType"
        :caption="$t('docFlow.automaticAssignmentRules.fields.value')"
      >
        <DxLookup :data-source="recipientStore" value-expr="id" display-expr="name" />
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
  DxButton,
  DxLookup
} from "devextreme-vue/data-grid";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxScrolling,
    DxRequiredRule,
    DxPatternRule,
    DxButton,
    DxLookup
  },
  data() {
    return {
      members: [],
      recipientStore: this.$dxStore({
        key: "id",
        loadUrl: dataApi.recipient.list
      })
    };
  },
  watch: {
    members(value) {
      this.updateMembers(value);
    }
  },
  methods: {
    updateMembers(members) {
      this.$emit("updateMembers", members);
    },
    rowUpdated(e) {
      this.updateMembers(this.members);
    }
  }
};
</script>

<style></style>
