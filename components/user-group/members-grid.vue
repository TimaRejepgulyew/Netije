<template>
  <DxDataGrid :data-source="dataSource" height="300">
    <DxEditing
      mode="row"
      :use-icons="true"
      :allow-adding="true"
      :allow-updating="true"
      :allow-deleting="true"
    />
    <DxColumn
      data-field="participant"
      edit-cell-template="participant"
      :caption="$t('companyStructure.groups.members')"
      :customizeText="customizeText"
    >
      <DxRequiredRule />
    </DxColumn>
    <DxColumn
      data-field="participant.description"
      :allowUpdating="false"
      :caption="$t('companyStructure.groups.description')"
    ></DxColumn>
    <template #participant="cellInfo">
      <RecipientSelectBox
        :value="cellInfo.data.value"
        @valueChanged="value => onValueChanged(value, cellInfo.data)"
      />
    </template>
  </DxDataGrid>
</template>

<script>
import {
  DxDataGrid,
  DxEditing,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxLookup,
  DxSearchPanel,
  DxRequiredRule
} from "devextreme-vue/data-grid";
import RecipientSelectBox from "~/components/recipient/select-box/index.vue";
export default {
  components: {
    DxDataGrid,
    DxEditing,
    DxColumn,
    DxGrouping,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxLookup,
    DxSearchPanel,
    DxRequiredRule,
    RecipientSelectBox
  },
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  computed: {
    dataSource() {
      return this.value;
    }
  },
  methods: {
    onValueChanged(value, cell) {
      cell.setValue(value);
    },
    customizeText(e) {
      if (e.value) return e.value.name;
    }
  },
  updated() {
    this.$emit("membersChanged", this.dataSource);
  }
};
</script>
    