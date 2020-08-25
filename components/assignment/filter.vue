<template>
  <div class="sideBar">
    <div class="btn--close right">
      <label class="filter__header">{{$t("shared.filter")}}</label>
      <DxButton icon="close" styling-mode="text" :on-click="showFilter" />
    </div>
    <div class="filter__content">
      <div class="option--group">
        <div class="option__title">{{$t("shared.status")}}</div>
        <DxRadioGroup
          name="status"
          :onValueChanged="(e)=>{this.filterChaged(e,'status')}"
          valueExpr="id"
          displayExpr="name"
          :value="status"
          :items="statusTypeRadioItems"
        />
      </div>
      <div class="option--group">
        <div class="option__title">{{$t("shared.type")}}</div>
        <DxRadioGroup
          :value="assignmentType"
          valueExpr="id"
          displayExpr="name"
          :onValueChanged="(e)=>{this.filterChaged(e,'assignmentType')}"
          :items="assignmentTypeRadioItems"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { DxCheckBox, DxRadioGroup } from "devextreme-vue";
import filterTypeItems from "~/infrastructure/constants/filterTypeItems";

import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxRadioGroup,
    DxCheckBox,
    DxButton,
  },
  created() {
    this.filterChaged();
  },
  data() {
    return {
      statusTypeRadioItems: filterTypeItems.statusType(this),
      assignmentTypeRadioItems: filterTypeItems.assignmentType(this),
      status: +localStorage.getItem("statusFilter") || null,
      assignmentType: +localStorage.getItem("assignmentTypeFilter") || null,
    };
  },
  methods: {
    buildFilter(items) {
      let filter = [];
      for (let item in items) {
        if (items[item] !== null) {
          if (filter.length > 0) {
            filter.push("and");
          }
          filter.push([item, "=", items[item]]);
        }
      }
      return filter;
    },
    changeFilterProperty(e, name) {
      if (e) {
        this[name] = e.value;
        localStorage.setItem(name + "Filter", e.value);
      }
    },
    emitFilter(filter) {
      this.$emit("changeFilter", {
        filter,
      });
    },
    filterChaged(e, name) {
      this.changeFilterProperty(e, name);
      const filter = this.buildFilter({
        status: this.status,
        assignmentType: this.assignmentType,
      });
      this.emitFilter(filter);
    },
    showFilter() {
      this.$emit("showFilter");
    },
  },
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.sideBar {
  border: 1px solid darken($base-bg, 5);
  height: 100%;
  min-height: auto;
  padding: 20px;
  background: $base-bg;
  position: absolute;
  right: 0;
  top: 0;
  max-width: 300px;
  width: 100%;
  z-index: 2;
  -webkit-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  -moz-box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  box-shadow: 0px 0.1vw 1vw 0px rgba(104, 104, 104, 0.5);
  .filter__header {
    font-size: 24px;
  }
  .filter__content {
    padding: 20px 0;
    .option--group {
      padding: 10px 0;
      .option__title {
        padding: 10px 0;
      }
      .option {
        padding: 10px 10px;
      }
    }
  }
}
</style>