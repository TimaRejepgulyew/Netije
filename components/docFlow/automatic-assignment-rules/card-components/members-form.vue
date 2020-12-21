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
        data-field="recipient"
        editCellTemplate="recipientSelectBox"
        :caption="$t('docFlow.automaticAssignmentRules.fields.member')"
        :customizeText="customizeText"
      />
      <template #recipientSelectBox="{ data: cellInfo }">
        <recipient-select-box
          :value="cellInfo.value"
          @valueChanged="value => onValueChanged(value, cellInfo)"
        />
      </template>

      <DxColumn
        data-field="rightType"
        :caption="$t('docFlow.automaticAssignmentRules.fields.rightType')"
      >
        <DxLookup :data-source="accessRightStore" value-expr="id" display-expr="name" />
      </DxColumn>
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxEditing,
  DxLookup
} from "devextreme-vue/data-grid";
import recipientSelectBox from "~/components/recipient/select-box/index.vue";
export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxEditing,
    DxLookup,
    recipientSelectBox
  },
  props: {
    currentMembers: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      accessRightStore: {
        store: [
          {
            id: 0,
            name: this.$t("attachmentAccessRight.btns.Read")
          },
          {
            id: 1,
            name: this.$t("attachmentAccessRight.btns.Update")
          },
          {
            id: 2,
            name: this.$t("attachmentAccessRight.btns.FullAccess")
          }
        ]
      }
    };
  },
  computed: {
    members() {
      return this.currentMembers;
    }
  },
  watch: {
    members(value) {
      this.updateMembers(value);
    }
  },
  methods: {
    onValueChanged(value, cellInfo) {
      cellInfo.setValue(value);
      cellInfo.component.updateDimensions();
    },
    updateMembers(members) {
      this.$emit("updateMembers", members);
    },
    rowUpdated(e) {
      this.updateMembers(this.members);
    },
    customizeText(e) {
      if (e.value) return e.value.name;
    }
  }
};
</script>

