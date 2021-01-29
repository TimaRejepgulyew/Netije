<template>
  <div>
    <DxList
      ref="groupList"
      :focusStateEnabled="false"
      :activeStateEnabled="false"
      :data-source="dataSource"
      display-expr="name"
      selectionMode="single"
      @item-click="selectGroup"
    />
  </div>
</template>


<script>
import DxList from "devextreme-vue/list";
import recipientType from "~/infrastructure/constants/resipientType.js";

export default {
  components: {
    DxList
  },
  data() {
    return {
      dataSource: [
        {
          name: this.$t("recipientTagBox.employees"),
          value: [recipientType.Employee]
        },
        {
          name: this.$t("recipientTagBox.organization"),
          value: [recipientType.BusinessUnit, recipientType.Department]
        },
        {
          name: this.$t("recipientTagBox.group"),
          value: [recipientType.Role, recipientType.RegistrationGroup]
        },
        {
          name: this.$t("recipientTagBox.customGroup"),
          value: "userGroup"
        }
      ]
    };
  },
  methods: {
    selectGroup(e) {
      this.$emit("groupType", e.itemData.value);
    }
  },
  mounted() {
    this.$refs["groupList"].instance.selectItem(0);
    this.$emit("groupType", this.dataSource[0].value);
  }
};
</script>